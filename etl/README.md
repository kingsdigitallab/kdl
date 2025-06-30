# ETL Module

This module is currently used to import project data from ClickUp into the
frontend.

It was previously used to import data from ActiveCollab into the CMS. This is no
longer the case, the CMS module is deprecated. The previous scripts are kept for
reference.

## Getting Started

The project is set up as a monorepo with the frontend and this module. To install
this module specific dependencies, run:

```bash
npm ci
```

## Import Project Data

To import project data from ClickUp, run:

```bash
npm run etl:clickup frontend/src/projects
```
