# Development Notes

## Directus to Markdown Conversion (Historical)

**February 2026**: The Directus CMS was removed from the project. Content is now managed manually in markdown files.

### Removed Scripts

The following ETL scripts that converted Directus data to markdown were removed:

- [Commit `364e412f4`](https://github.com/kingsdigitallab/kdl/commit/364e412f4): Removed conversion scripts

  - `etl/src/organisations-to-md.js`
  - `etl/src/people-to-md.js`
  - `etl/src/projects-to-md.js`

- [Commit `825d43bad`](https://github.com/kingsdigitallab/kdl/commit/825d43bad): Removed npm scripts and tests
  - Removed npm scripts that ran the conversion
  - Removed tests: `etl/tests/organisations-to-md.test.js`, `etl/tests/people-to-md.test.js`, `etl/tests/projects-to-md.test.js`

### How the Conversion Worked

The scripts read JSON exports from Directus (e.g., `_organisations.json`, `_people.json`, `_projects.json`) and generated markdown files with YAML frontmatter:

**Organisations**: `title`, `tags`, `alternateName`, `slug`, `foundingDate`, `dissolutionDate`, `parentOrganisation`, `subOrganisations`, `urls`

**People**: `title`, `slug`, `jobTitle`, `tags`, `memberOf` (with organisation memberships and roles)

**Projects**: `title`, `name`, `tags`, `alternateName`, `slug`, `foundingDate`, `dissolutionDate`, `creativeWorkStatus`, `feature` (image), `funders`, `departments`, `members`, `keywords`, `urls`

Usage:

```bash
node etl/src/organisations-to-md.js <input_json> <output_path>
node etl/src/people-to-md.js <input_json> <output_path>
node etl/src/projects-to-md.js <input_json> <output_path>
```
