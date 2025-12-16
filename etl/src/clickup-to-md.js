#!/usr/bin/env node

const prettier = require("prettier");
const fs = require("fs/promises");
const axios = require("axios");
const path = require("path");
const YAML = require("yaml");

require("dotenv").config({ path: path.resolve(__dirname, "../../.envs/.etl") });

class ClickUpToMarkdown {
  constructor(outputPath) {
    this.outputPath = outputPath;
    this.apiUrl = process.env.CLICKUP_API_URL;
    this.apiKey = process.env.CLICKUP_API_KEY;
    this.teamId = process.env.CLICKUP_TEAM_ID;

    if (!this.apiKey) {
      throw new Error("CLICKUP_API_KEY environment variable is required");
    }
    if (!this.teamId) {
      throw new Error("CLICKUP_TEAM_ID environment variable is required");
    }

    this.api = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: this.apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }

  /**
   * Fetch task data from ClickUp API
   * @param {string} customItemId - Custom item ID from ClickUp
   */
  async fetchClickUpData(customItemId) {
    try {
      const tasks = [];

      console.log(`Fetching task data for item ${customItemId}...`);

      let page = 0;
      let isLastPage = false;
      while (!isLastPage) {
        const taskResponse = await this.api.get(
          `/team/${this.teamId}/task?custom_items=${customItemId}&custom_items=${customItemId}&page=${page}`
        );

        tasks.push(...taskResponse.data.tasks);

        if (
          taskResponse.data.last_page ||
          taskResponse.data.tasks.length === 0
        ) {
          isLastPage = true;
          break;
        }

        page++;
      }

      console.log(`Fetching space data...`);
      const spaceResponse = await this.api.get(`/team/${this.teamId}/space`);

      return {
        projects: tasks,
        spaces: spaceResponse.data.spaces,
      };
    } catch (error) {
      if (error.response) {
        throw new Error(
          `ClickUp API error: ${error.response.status} ${error.response.statusText}`
        );
      }
      throw error;
    }
  }

  /**
   * Convert ClickUp data to markdown or update existing
   * @param {Object} data - Combined task and space data from ClickUp API
   */
  async convert(data) {
    const projects = data.projects;
    const spaces = data.spaces;

    for (const project of projects) {
      let name =
        this.getCustomFieldValue(project, "Project name") || project.name;

      const acronymMatch = name.match(/\(([^)]+)\)$/);
      if (acronymMatch) {
        name = name.replace(acronymMatch[0], "").trim();
      }

      console.log(`Processing: ${name}`);
      let slug = this.getCustomFieldValue(project, "Slug");

      if (!slug) {
        console.warn(` - No slug found for ${name}, generating from name`);
        slug = this.slugify(name);
      }

      const projectStartDate = this.getCustomFieldValue(
        project,
        "Project start date"
      );

      if (!projectStartDate) {
        console.error(` - No project start date found for ${name}, skipping`);
        continue;
      }

      const foundingDate = this.convertDate(projectStartDate);
      const datePrefix = foundingDate ? `${foundingDate}-` : "1970-01-01-";

      const outputFile = path.join(this.outputPath, `${datePrefix}${slug}.md`);

      let existingContent = null;
      let existingFrontmatter = {};

      try {
        existingContent = await fs.readFile(outputFile, "utf8");

        const match = existingContent.match(
          /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
        );
        if (match) {
          existingFrontmatter = YAML.parse(match[1]);
        }
      } catch (err) {
        if (err.code === "ENOENT") {
          await fs.mkdir(this.outputPath, { recursive: true });
          console.log(`Creating new file: ${slug}.md`);
        } else {
          throw err;
        }
      }

      const spaceStatus = spaces
        .find((space) => space.id === project.space.id)
        ?.name?.trim();

      const sla = this.getSLADates(project);

      const creativeWorkStatus = sla.start
        ? "Maintained"
        : spaceStatus.toLowerCase() === "post-project"
        ? spaceStatus
        : "Active";

      const descriptionLen =
        existingContent?.split("---")[2]?.trim().length || 0;
      const draft = descriptionLen < 20;

      const frontmatter = {
        ...existingFrontmatter,
        draft,
        title: name,
        name: name,
        tags: ["projects"],
        alternateName: this.getCustomFieldValue(project, "Acronym"),
        slug: slug,
        foundingDate,
        dissolutionDate: this.convertDate(
          this.getCustomFieldValue(project, "Project end date")
        ),
        creativeWorkStatus,
        keywords: this.getKeywords(project),
        funders: await this.getAndConvertFunders(project),
        departments: await this.getAndConvertDepartments(project),
        members: this.getMembers(project),
        sla,
      };

      const urls = this.getUrls(project);
      if (urls.length > 0) {
        frontmatter.urls = [...(frontmatter?.urls || []), ...urls].reduce(
          (acc, curr) => {
            if (!acc.find((url) => url.url === curr.url)) {
              acc.push(curr);
            }
            return acc;
          },
          []
        );
      }

      const content = [
        "---",
        YAML.stringify(frontmatter).trim(),
        "---",
        "",
        existingContent ? existingContent.split("---")[2].trim() : "",
      ].join("\n");

      const formattedContent = await this.formatMarkdown(content);
      await fs.writeFile(outputFile, formattedContent);
    }
  }

  /**
   * Get funders from custom fields
   */
  async getAndConvertFunders(data) {
    const funderField = data.custom_fields.find(
      (field) => field.name === "Funder(s)"
    );

    if (!funderField || !funderField.value) return [];

    const funders = funderField.value.map((funder) => {
      const found = funderField.type_config.options.find(
        (opt) => opt.id === funder
      );

      return {
        name: found.label,
        slug: this.slugify(found.label),
      };
    });

    for (const funder of funders) {
      const funderOutputFile = path.join(
        this.outputPath,
        `../about/organisations/${funder.slug}.md`
      );

      try {
        await fs.access(funderOutputFile);
        continue;
      } catch (_) {
        console.log(`Creating new funder file: ${funder.slug}.md`);
      }

      const funderContent = [
        "---",
        `title: ${funder.name}`,
        "alternateName: null",
        "tags: [organisations]",
        `slug: ${funder.slug}`,
        "foundingDate: null",
        "dissolutionDate: null",
        "parentOrganisation: null",
        "subOrganisations: []",
        "urls: []",
        "---",
      ].join("\n");

      const formattedFunderContent = await this.formatMarkdown(funderContent);
      await fs.writeFile(funderOutputFile, formattedFunderContent);
    }

    return funders;
  }

  /**
   * Get departments from custom fields
   */
  async getAndConvertDepartments(data) {
    let departments = [];

    const deptsField = data.custom_fields.find(
      (field) => field.name === "Department(s)"
    );

    if (deptsField) {
      deptsField.value.forEach((dept) => {
        const found = deptsField.type_config.options.find(
          (opt) => opt.id === dept
        );

        if (found) {
          departments.push({
            name: found.label,
            slug: this.slugify(found.label),
          });
        }
      });
    }

    const partnersField = data.custom_fields.find(
      (field) => field.name === "Partner organisation(s)"
    );

    if (partnersField) {
      partnersField.value.forEach((partner) => {
        const found = partnersField.type_config.options.find(
          (opt) => opt.id === partner
        );

        if (found) {
          departments.push({
            name: found.label,
            slug: this.slugify(found.label),
          });
        }
      });
    }

    departments = departments.filter((dept) => dept.name !== "External");

    for (const department of departments) {
      const departmentOutputFile = path.join(
        this.outputPath,
        `../about/organisations/${department.slug}.md`
      );

      try {
        await fs.access(departmentOutputFile);
        continue;
      } catch (_) {
        console.log(`Creating new department file: ${department.slug}.md`);
      }

      const departmentContent = [
        "---",
        `title: ${department.name}`,
        "alternateName: null",
        "tags: [departments]",
        `slug: ${department.slug}`,
        "foundingDate: null",
        "dissolutionDate: null",
        "parentOrganisation: null",
        "subOrganisations: []",
        "urls: []",
        "---",
      ].join("\n");

      const formattedDepartmentContent = await this.formatMarkdown(
        departmentContent
      );
      await fs.writeFile(departmentOutputFile, formattedDepartmentContent);
    }

    return departments;
  }

  /**
   * Get members from various custom fields
   */
  getMembers(data) {
    const members = [];

    for (const role of ["Analyst", "Design", "Dev"]) {
      const field = data.custom_fields.find((field) => field.name === role);
      const roleName =
        role === "Analyst"
          ? "Research Software Analyst"
          : role === "Design"
          ? "Research Software Designer"
          : "Research Software Engineer";

      if (field && field.value) {
        field.value
          .filter((member) => member)
          .forEach((member) => {
            members.push({
              name: member.username.trim(),
              slug: this.slugify(member.username.trim()),
              roleName,
            });
          });
      }
    }

    const kdlStaffField = data.custom_fields.find(
      (field) => field.name === "KDL staff"
    );

    if (kdlStaffField && kdlStaffField.value) {
      kdlStaffField.value
        .split(",")
        .filter((staff) => staff.trim())
        .forEach((staff) => {
          const [name, role] = staff.split("[");

          const roleName = role.trim().replace("]", "");
          const member = {
            name: name.trim(),
            slug: this.slugify(name.trim()),
            roleName,
          };

          members.push(member);
        });
    }

    const plField = data.custom_fields.find((field) => field.name === "PL");

    if (plField && plField.value) {
      plField.value.split("]").forEach((pl) => {
        const [name, inOrganisation] = pl.split("[");

        const member = {
          name: name.replace(",", "").trim(),
          slug: this.slugify(name.replace(",", "").trim()),
          roleName: "Principal investigator",
        };

        const organisationName = inOrganisation?.trim();
        if (organisationName) {
          member.inOrganisation = {
            name: organisationName,
            slug: this.slugify(organisationName),
          };
        }

        member.name && members.push(member);
      });
    }

    const clField = data.custom_fields.find((field) => field.name === "CL");

    if (clField && clField.value) {
      clField.value.split("]").forEach((cl) => {
        const [name, inOrganisation] = cl.split("[");

        const member = {
          name: name.replace(",", "").trim(),
          slug: this.slugify(name.replace(",", "").trim()),
          roleName: "Co-Investigator",
        };

        const organisationName = inOrganisation?.trim();
        if (organisationName) {
          member.inOrganisation = {
            name: organisationName,
            slug: this.slugify(organisationName),
          };
        }

        member.name && members.push(member);
      });
    }

    const researchersField = data.custom_fields.find(
      (field) => field.name === "Researchers"
    );

    if (researchersField && researchersField.value) {
      researchersField.value
        .split(",")
        .filter((researcher) => researcher.trim())
        .forEach((researcher) => {
          const [name, inOrganisation] = researcher.split("[");

          const member = {
            name: name.trim(),
            slug: this.slugify(name.trim()),
            roleName: "Researcher",
          };

          const organisationName = inOrganisation?.trim().replace("]", "");
          if (organisationName) {
            member.inOrganisation = {
              name: organisationName,
              slug: this.slugify(organisationName),
            };
          }

          members.push(member);
        });
    }

    return members.filter((member, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) => t.slug === member.slug && t.roleName === member.roleName
        )
      );
    });
  }

  /**
   * Convert string to slug
   */
  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * Get themes from custom fields
   */
  getKeywords(data) {
    const themeField = data.custom_fields.find(
      (field) => field.name === "Theme"
    );

    if (!themeField || !themeField.value) return [];

    return themeField.type_config.options
      .filter((opt) => themeField.value.includes(opt.id))
      .map((opt) => ({
        name: opt.label,
        slug:
          opt.label === "Machine Learning and AI"
            ? "machine-learning-ai"
            : this.slugify(opt.label),
      }));
  }

  /**
   * Get simple custom field value by name
   */
  getCustomFieldValue(data, fieldName) {
    const field = data.custom_fields.find((field) => field.name === fieldName);

    return field?.value || null;
  }

  /**
   * Get SLA dates
   */
  getSLADates(data) {
    const startDate = this.getCustomFieldValue(data, "SLA start date");
    const endDate = this.getCustomFieldValue(data, "SLA end date");

    return {
      start: startDate
        ? new Date(parseInt(startDate)).toISOString().split("T")[0]
        : null,
      end: endDate
        ? new Date(parseInt(endDate)).toISOString().split("T")[0]
        : null,
    };
  }

  /**
   * Get URLs from url custom field
   */
  getUrls(data) {
    const urlFields = data.custom_fields
      .filter((field) => field.name.toLowerCase().includes(" url"))
      .filter((field) => field.value);

    if (!urlFields) return [];

    return urlFields.map((field) => ({
      name: field.name.trim(),
      url: field.value.trim(),
    }));
  }

  convertDate(timestamp) {
    return new Date(parseInt(timestamp)).toISOString().split("T")[0];
  }

  /**
   * Format markdown content using Prettier
   * @param {string} content - Raw markdown content
   * @returns {string} Formatted markdown content
   */
  async formatMarkdown(content) {
    try {
      // Get Prettier config from project root
      const projectRoot = path.resolve(__dirname, "../..");
      const config = await prettier.resolveConfig(projectRoot);

      const formatted = prettier.format(content, {
        ...config,
        parser: "markdown",
      });
      return formatted;
    } catch (error) {
      console.warn("Failed to format markdown with Prettier:", error.message);
      // Return original content if formatting fails
      return content;
    }
  }
}

// CLI execution
if (require.main === module) {
  const customItemId = process.argv[2];
  const outputPath = process.argv[3];

  if (!customItemId || !outputPath) {
    console.error("Usage: clickup-to-md.js <custom_item_id> <output_path>");
    process.exit(1);
  }

  const projectRoot = path.resolve(__dirname, "../..");
  const resolvedOutputPath = path.resolve(projectRoot, outputPath);

  const converter = new ClickUpToMarkdown(resolvedOutputPath);
  converter
    .fetchClickUpData(customItemId)
    .then((data) => converter.convert(data))
    .then(() => console.log("Conversion complete"))
    .catch((err) => {
      console.error("Error:", err);
      process.exit(1);
    });
}

module.exports = ClickUpToMarkdown;
