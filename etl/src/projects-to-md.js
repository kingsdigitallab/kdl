#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const YAML = require("yaml");

/**
 * Converts projects JSON data into markdown files
 */
class ProjectsToMarkdown {
  constructor(outputPath) {
    this.outputPath = outputPath;
  }

  /**
   * Main conversion method
   * @param {Array} projects - Array of project objects from _projects.json
   */
  async convert(projects) {
    await fs.mkdir(this.outputPath, { recursive: true });

    console.log(`Converting ${projects.length} projects...`);
    for (const project of projects) {
      console.log(`Converting: ${project.name}`);
      await this.convertProject(project);
    }
    console.log("Conversion complete");
  }

  /**
   * Convert a single project to markdown
   * @param {Object} project - Project object
   */
  async convertProject(project) {
    // Prepare frontmatter
    const frontmatter = {
      title: project.name,
      alternateName: project.alternateName,
      slug: project.slug,
      foundingDate: project.foundingDate,
      dissolutionDate: project.dissolutionDate,
      status: project.creativeWorkStatus?.name,
      statusType: project.creativeWorkStatus?.inDefinedTermSet?.name,
      feature: this.processImage(project.image),
      funders: this.processFunders(project.funder),
      departments: this.processDepartments(project.department),
      members: this.processTeam(project.member),
      keywords: this.processKeywords(project.keywords),
      urls: this.processUrls(project.url),
    };

    // Create markdown content
    const content = [
      "---",
      YAML.stringify(frontmatter).trim(),
      "---",
      "",
      project.description || "",
    ].join("\n");

    // Write file
    const filename = `${project.slug}.md`;
    await fs.writeFile(path.join(this.outputPath, filename), content);
  }

  /**
   * Process image data
   */
  processImage(image) {
    if (!image) return null;

    return {
      image: image.filename_download,
      title: image.title,
      description: image.description,
      width: image.width,
      height: image.height,
    };
  }

  /**
   * Process funders data
   */
  processFunders(funders) {
    if (!funders) return [];

    return funders.map((funder) => ({
      name: funder.agent_id.name,
      slug: funder.agent_id.slug,
    }));
  }

  /**
   * Process keywords data
   */
  processKeywords(keywords) {
    if (!keywords) return [];

    return keywords.map((keyword) => keyword.definedterm_id.name);
  }

  /**
   * Process URLs data
   */
  processUrls(urls) {
    if (!urls) return [];

    return urls.map((url) => ({
      name: url.linkrole_id.name,
      url: url.linkrole_id.url,
    }));
  }

  /**
   * Process departments data
   */
  processDepartments(departments) {
    if (!departments) return [];

    return departments.map((dept) => ({
      name: dept.organisation_id.agent.name,
      slug: dept.organisation_id.agent.slug,
    }));
  }

  /**
   * Process team members data
   */
  processTeam(members) {
    if (!members) return [];

    return members
      .filter((member) => member.agent)
      .map((member) => ({
        name: member.agent.name,
        slug: member.agent.slug,
        role: member.roleName.name,
      }));
  }
}

if (require.main === module) {
  const inputFile = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputFile || !outputPath) {
    console.error("Usage: projects-to-md.js <input_json> <output_path>");
    process.exit(1);
  }

  // Resolve paths relative to project root
  const projectRoot = path.resolve(__dirname, "../..");
  const resolvedInputPath = path.resolve(projectRoot, inputFile);
  const resolvedOutputPath = path.resolve(projectRoot, outputPath);

  fs.readFile(resolvedInputPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((projects) => {
      const converter = new ProjectsToMarkdown(resolvedOutputPath);
      return converter.convert(projects);
    })
    .catch((err) => {
      console.error("Error:", err);
      process.exit(1);
    });
}

module.exports = ProjectsToMarkdown;
