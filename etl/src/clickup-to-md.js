#!/usr/bin/env node

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
    console.log(`Fetching task data for item ${customItemId}...`);

    try {
      const taskResponse = await this.api.get(
        `/team/${this.teamId}/task?custom_items=${customItemId}&custom_items=${customItemId}`
      );

      const task = taskResponse.data.tasks?.[0];
      if (!task) {
        throw new Error("No task found for the given custom item ID");
      }

      console.log(`Fetching space data...`);
      const spaceResponse = await this.api.get(`/team/${this.teamId}/space`);

      return {
        projects: taskResponse.data.tasks,
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
      console.log(`Processing: ${project.name}`);
      const slug = this.slugify(project.name);
      const outputFile = path.join(this.outputPath, `${slug}.md`);

      // Try to read existing file
      let existingContent = null;
      let existingFrontmatter = {};

      try {
        existingContent = await fs.readFile(outputFile, "utf8");
        // Parse existing frontmatter if file exists
        const match = existingContent.match(
          /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
        );
        if (match) {
          existingFrontmatter = YAML.parse(match[1]);
        }
      } catch (err) {
        if (err.code === "ENOENT") {
          // File doesn't exist, create directory if needed
          await fs.mkdir(this.outputPath, { recursive: true });
          console.log(`Creating new file: ${slug}.md`);
        } else {
          throw err;
        }
      }

      // Prepare new frontmatter
      const frontmatter = {
        ...existingFrontmatter,
        title: project.name,
        alternateName: this.getCustomFieldValue(project, "Acronym"),
        slug: slug,
        foundingDate: this.convertDate(
          this.getCustomFieldValue(project, "Project start date")
        ),
        dissolutionDate: this.convertDate(
          this.getCustomFieldValue(project, "Project end date")
        ),
        status: spaces.find((space) => space.id === project.space.id)?.name,
        funders: this.getFunders(project),
        departments: this.getDepartments(project),
        members: this.getMembers(project),
        themes: this.getThemes(project),
        sla: this.getSLADates(project),
        urls: this.getUrls(project),
      };

      // Create markdown content
      const content = [
        "---",
        YAML.stringify(frontmatter).trim(),
        "---",
        "",
        existingContent ? existingContent.split("---")[2].trim() : "",
      ].join("\n");

      // Write file
      await fs.writeFile(outputFile, content);
    }
  }

  /**
   * Get funders from custom fields
   */
  getFunders(data) {
    const funderField = data.custom_fields.find(
      (field) => field.name === "Funder(s)"
    );

    if (!funderField || !funderField.value) return [];

    return funderField.value.map((funder) => {
      const found = funderField.type_config.options.find(
        (opt) => opt.id === funder
      );

      return {
        name: found.label,
        slug: this.slugify(found.label),
      };
    });
  }

  /**
   * Get departments from custom fields
   */
  getDepartments(data) {
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

    return departments.filter((dept) => dept.name !== "External");
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
          ? "Research Software UI/UX Designer"
          : "Research Software Engineer";

      if (field && field.value) {
        field.value.forEach((member) => {
          members.push({
            name: member.username,
            slug: this.slugify(member.username),
            role: roleName,
          });
        });
      }
    }

    const plField = data.custom_fields.find((field) => field.name === "PL");

    if (plField && plField.value) {
      plField.value.split(",").forEach((pl) => {
        members.push({
          name: pl.trim(),
          slug: this.slugify(pl.trim()),
          role: "Principal investigator",
        });
      });
    }

    const researchersField = data.custom_fields.find(
      (field) => field.name === "Researchers"
    );

    if (researchersField && researchersField.value) {
      researchersField.value.split(",").forEach((researcher) => {
        members.push({
          name: researcher.trim(),
          slug: this.slugify(researcher.trim()),
          role: "Researcher",
        });
      });
    }

    return members;
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
  getThemes(data) {
    const themeField = data.custom_fields.find(
      (field) => field.name === "Theme"
    );

    if (!themeField || !themeField.value) return [];

    return themeField.type_config.options
      .filter((opt) => themeField.value.includes(opt.id))
      .map((opt) => ({
        name: opt.label,
        slug: this.slugify(opt.label),
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
    const urlField = data.custom_fields.find((field) => field.name === "url");

    if (!urlField || !urlField.value) return [];

    return [
      {
        type: "Project URL",
        url: urlField.value,
      },
    ];
  }
  convertDate(timestamp) {
    return new Date(parseInt(timestamp)).toISOString().split("T")[0];
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
