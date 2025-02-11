#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const YAML = require("yaml");

/**
 * Converts organisations JSON data into markdown files
 */
class OrganisationsToMarkdown {
  constructor(outputPath) {
    this.outputPath = outputPath;
  }

  /**
   * Main conversion method
   * @param {Array} organisations - Array of organisation objects from _organisations.json
   */
  async convert(organisations) {
    await fs.mkdir(this.outputPath, { recursive: true });

    console.log(`Converting ${organisations.length} organisations...`);
    for (const org of organisations) {
      console.log(`Converting: ${org.agent.name}`);
      await this.convertOrganisation(org);
    }
    console.log("Conversion complete");
  }

  /**
   * Convert a single organisation to markdown
   * @param {Object} org - Organisation object
   */
  async convertOrganisation(org) {
    // Prepare frontmatter
    const frontmatter = {
      title: org.agent.name,
      tags: ["organisations"],
      alternateName: org.agent.alternateName,
      slug: org.agent.slug,
      foundingDate: org.foundingDate,
      dissolutionDate: org.dissolutionDate,
      parentOrganisation: this.processParentOrg(org.parentOrganisation),
      subOrganisations: this.processSubOrgs(org.subOrganisation),
      urls: this.processUrls(org.agent.url),
    };

    // Create markdown content
    const content = [
      "---",
      YAML.stringify(frontmatter).trim(),
      "---",
      "",
      org.agent.description || "",
    ].join("\n");

    // Write file
    const filename = `${org.agent.slug}.md`;
    await fs.writeFile(path.join(this.outputPath, filename), content);
  }

  /**
   * Process parent organisation data
   */
  processParentOrg(parent) {
    if (!parent) return null;

    return {
      name: parent.agent.name,
      slug: parent.agent.slug,
      alternateName: parent.agent.alternateName,
    };
  }

  /**
   * Process sub-organisations data
   */
  processSubOrgs(subs) {
    if (!subs) return [];

    return subs.map((sub) => ({
      name: sub.agent.name,
      slug: sub.agent.slug,
      alternateName: sub.agent.alternateName,
    }));
  }

  /**
   * Process URLs data
   */
  processUrls(urls) {
    if (!urls) return [];

    return urls.map((url) => ({
      type: url.linkrole_id.name,
      url: url.linkrole_id.url,
    }));
  }
}

// CLI execution
if (require.main === module) {
  const inputFile = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputFile || !outputPath) {
    console.error("Usage: organisations-to-md.js <input_json> <output_path>");
    process.exit(1);
  }

  // Resolve paths relative to project root
  const projectRoot = path.resolve(__dirname, "../..");
  const resolvedInputPath = path.resolve(projectRoot, inputFile);
  const resolvedOutputPath = path.resolve(projectRoot, outputPath);

  fs.readFile(resolvedInputPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((orgs) => {
      const converter = new OrganisationsToMarkdown(resolvedOutputPath);
      return converter.convert(orgs);
    })
    .catch((err) => {
      console.error("Error:", err);
      process.exit(1);
    });
}

module.exports = OrganisationsToMarkdown;
