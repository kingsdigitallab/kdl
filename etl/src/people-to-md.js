#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const YAML = require("yaml");

/**
 * Converts people JSON data into markdown files
 */
class PeopleToMarkdown {
  constructor(outputPath) {
    this.outputPath = outputPath;
  }

  /**
   * Main conversion method
   * @param {Array} people - Array of person objects from _people.json
   */
  async convert(people) {
    await fs.mkdir(this.outputPath, { recursive: true });

    console.log(`Converting ${people.length} people...`);
    for (const person of people) {
      console.log(`Converting: ${person.agent.name}`);
      await this.convertPerson(person);
    }
    console.log("Conversion complete");
  }

  /**
   * Convert a single person to markdown
   * @param {Object} person - Person object
   */
  async convertPerson(person) {
    // Prepare frontmatter
    const frontmatter = {
      title: person.agent.name,
      slug: person.agent.slug,
      jobTitle: person.jobTitle,
      memberOf: this.processMemberOf(person.agent.memberOf),
    };

    // Create markdown content
    const content = [
      "---",
      YAML.stringify(frontmatter).trim(),
      "---",
      "",
      person.agent.description || "",
    ].join("\n");

    // Write file
    const filename = `${person.agent.slug}.md`;
    await fs.writeFile(path.join(this.outputPath, filename), content);
  }

  /**
   * Process projects data
   */
  processMemberOf(memberOf) {
    if (!memberOf) return [];

    return memberOf.map((membership) => ({
      startDate: membership.startDate,
      endDate: membership.endDate,
      project: membership.inProject
        ? {
            name: membership.inProject?.name,
            slug: membership.inProject?.slug,
            alternateName: membership.inProject?.alternateName,
          }
        : null,
      organisation: membership.inOrganisation
        ? {
            name: membership.inOrganisation.agent.name,
            slug: membership.inOrganisation.agent.slug,
          }
        : null,
      role: membership.roleName?.name,
    }));
  }
}

if (require.main === module) {
  const inputFile = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputFile || !outputPath) {
    console.error("Usage: people-to-md.js <input_json> <output_path>");
    process.exit(1);
  }

  // Resolve paths relative to project root
  const projectRoot = path.resolve(__dirname, "../..");
  const resolvedInputPath = path.resolve(projectRoot, inputFile);
  const resolvedOutputPath = path.resolve(projectRoot, outputPath);

  fs.readFile(resolvedInputPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((people) => {
      const converter = new PeopleToMarkdown(resolvedOutputPath);
      return converter.convert(people);
    })
    .catch((err) => {
      console.error("Error:", err);
      process.exit(1);
    });
}

module.exports = PeopleToMarkdown;
