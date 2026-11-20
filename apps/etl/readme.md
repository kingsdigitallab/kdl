# ETL

ETL transforms data from ClickUp to markdown files and JSON index file.

## Setup

You'll need an API Key and Team ID to be able to run this pipeline.

### Env variables

> [!NOTE]
> Set the .env file in the ETL folder, not the monorepo root folder.

| Variable        | Required |
| --------------- | -------- |
| CLICKUP_API_KEY | true     |
| CLICKUP_TEAM_ID | true     |

## Usage

The cmd folder contains the entrypoint of the script. The default entry script is set to 'cli' in the package.json.

Example:

```bash
pnpm run cli --action=<required> --dest=<required> --item-id=<required if action is sync>

```

Available actions are:

- sync (this is the only action that requires --item-id)
- write-projects
- write-orgs
- write-people
- evaluate

These are also available but are to be used only if there is no process to handle non-url friendly assets names aka not using a CMS that slugifies asset filenames.

- assets-evaluate-blog
- assets-sync-blog
- assets-evaluate-projects
- assets-sync-projects
- assets-evaluate-slides
- assets-sync-slides

Destination can be any folder, but in this repo you'll likely need to use the docs folder: ../../docs

> [!NOTE]
> A full pipeline run (fetch ids, create/update projects, orgs and people) is specified in the root package.json for convenience.
