#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const YAML = require("yaml");

class ClickUpToMarkdown {
  constructor(outputPath) {
    this.outputPath = outputPath;
  }

  /**
   * Convert ClickUp data to markdown or update existing
   * @param {Object} clickupData - Data from ClickUp API
   */
  async convert(clickupData) {
    for (const task of clickupData.tasks) {
      console.log(`Processing ClickUp task: ${task.name}`);
      // Generate slug from name
      const slug = this.slugify(task.name);
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
        identifier: task.id,
        title: task.name,
        alternateName: this.getCustomFieldValue(task, "Acronym"),
        applicationStatus: this.getApplicationStatus(task),
        departments: this.getDepartments(task),
        members: this.getMembers(task),
        themes: this.getThemes(task),
        activityCode: this.getCustomFieldValue(task, "Activity code"),
        progress: this.getProgress(task),
        sla: this.getSLADates(task),
        urls: this.getUrls(task),
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
   * Get application status from custom fields
   */
  getApplicationStatus(data) {
    const statusField = data.custom_fields.find(
      (field) => field.name === "Application status"
    );

    if (!statusField || !statusField.value) return null;

    // Get status option by index
    const option = statusField.type_config.options[statusField.value];
    return option ? option.name : null;
  }

  /**
   * Get departments from custom fields
   */
  getDepartments(data) {
    const deptField = data.custom_fields.find(
      (field) => field.name === "Department(s)"
    );

    if (!deptField || !deptField.value) return [];

    return deptField.type_config.options
      .filter((opt) => deptField.value.includes(opt.id))
      .map((opt) => ({
        name: opt.label,
        // You might want to generate or lookup proper slugs
        slug: this.slugify(opt.label),
      }));
  }

  /**
   * Get members from various custom fields
   */
  getMembers(data) {
    const members = [];

    // Process Analyst field
    const analystField = data.custom_fields.find(
      (field) => field.name === "Analyst"
    );

    if (analystField && analystField.value) {
      analystField.value.forEach((analyst) => {
        members.push({
          name: analyst.username,
          slug: this.slugify(analyst.username),
          role: "Research Software Analyst",
        });
      });
    }

    // Add other role-based fields here as needed

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
   * Get progress from Progress field
   */
  getProgress(data) {
    const progressField = data.custom_fields.find(
      (field) => field.name === "Progress"
    );

    return progressField?.value?.percent_complete || 0;
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
}

// CLI execution
if (require.main === module) {
  const inputFile = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputFile || !outputPath) {
    console.error("Usage: clickup-to-md.js <input_json> <output_path>");
    process.exit(1);
  }

  // Resolve paths relative to project root
  const projectRoot = path.resolve(__dirname, "../..");
  const resolvedInputPath = path.resolve(projectRoot, inputFile);
  const resolvedOutputPath = path.resolve(projectRoot, outputPath);

  fs.readFile(resolvedInputPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((clickupData) => {
      const converter = new ClickUpToMarkdown(resolvedOutputPath);
      return converter.convert(clickupData);
    })
    .then(() => console.log("Conversion complete"))
    .catch((err) => {
      console.error("Error:", err);
      process.exit(1);
    });
}

module.exports = ClickUpToMarkdown;
