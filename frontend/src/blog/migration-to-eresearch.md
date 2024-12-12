---
title: "Infrastructure Modernisation: A Year-Long Journey of Migrating Research Projects and Core Services"
subtitle:
tags:
  - post
  - sustainability
  - infrastructure
  - migration
  - static-first
authors:
  - Miguel Vieira
date: 2024-12-10
excerpt: A year-long journey of migrating research projects and core services to
  King's e-Research facility.
feature:
  image: /assets/images/blog/city-infrastructure-aerial.webp
  title: "Aerial View of Urban Infrastructure at Night, by Natasha Dulhiier, Unsplash"
  description: "Network of city lights viewed from above, representing the interconnected nature of modern digital infrastructure"
---

## Introduction

Over the past year, our team has been working on a project to migrate our
research projects from a private VMware infrastructure to a centrally managed
OpenStack infrastructure within
[King's College London's e-Research department](https://www.kcl.ac.uk/research/facilities/e-research).
This migration represents not just a change in hosting, but a complete
modernisation of our digital estate, encompassing projects spanning over
two decades of digital humanities research.

To date, we have successfully migrated the majority of our approximately 85
projects, with only four remaining. For these remaining projects, we have
implemented static copies to ensure continued access to their public interfaces,
while we complete their full migration, albeit with limited functionality.

## Project Scope and Challenges

The scope of this migration was particularly complex due to the diversity of our
digital estate:

- Technologies ranged from [Java](https://www.java.com/)-based webapps to
  [Django](https://www.djangoproject.com/) applications and
  [WordPress](https://wordpress.org/) sites
- Project ages varied significantly, with some dating back more than 20 years
- Version control systems included [SVN](https://subversion.apache.org/) and
  [Mercurial](https://www.mercurial-scm.org/) repositories that needed
  conversion to [Git](https://git-scm.com/)
- Legacy systems requiring [containerisation](https://www.docker.com/resources/what-container/)
  while maintaining functionality

## Background and Context

Our infrastructure and methodological approaches have been documented in several
publications. For readers interested in a deeper understanding, we recommend:

- Ciula and Smithies, “Sustainability and Modelling at King’s Digital Lab:
  Between Tradition and Innovation”, in: Nyhan, Rockwell, Sinclair (eds.): On
  Making in the Digital Humanities. Essays on the Scholarship of Digital
  Humanities Development in Honour of John Bradley. London: University College
  London Press, 2023. <https://doi.org/10.14324/111.9781800084209>
- Smithies and Ciula. Humans in the Loop: Epistemology & Method in King’s Digital
  Lab, Schuster & Dunn eds. Routledge International handbook of research methods
  in digital humanities: 155-172, 2020. <https://doi.org/10.4324/9780429777028-13>
- Digispec: Scoping Future Born-digital Data Services for the Arts and
  Humanities: Case Reports. Zenodo, 31 Aug. 2022,
  [doi:10.5281/zenodo.4716148](https://doi.org/10.5281/zenodo.4716148).

## Modernisation Strategy

### Containerisation and Standardisation

A key aspect of our modernisation effort was the comprehensive containerisation
of all active projects. This process revealed several challenges:

- Finding compatible Docker images for legacy software without extensive
  codebase modifications
- Addressing platform-specific issues, particularly with Apple Silicon machines
- Managing dependency updates across diverse technology stacks
- Dealing with encoding issues that manifested differently in OpenStack/Ubuntu
  compared to local environments

### Infrastructure as Code

We significantly improved our deployment process by implementing infrastructure
as code practices:

- The full infrastructure is now described in [Terraform](https://www.terraform.io/)
  code, including the definition of all services, networks and security rules in
  conjunction with [Ansible](https://www.ansible.com/) to manage the virtual
  machine itself. In addition, this ensures that VMs are auto-patched, typically
  weekly, contributing towards security
- Developed reusable [GitLab CI](https://docs.gitlab.com/ee/ci/) templates for
  common deployment patterns
- Created standardised [Docker](https://www.docker.com/) templates for common
  service types (Django, [Tomcat](https://tomcat.apache.org/),
  [Cantaloupe](https://cantaloupe-project.github.io/) image server,
  [nginx](https://nginx.org/), proxies)
- Simplified deployment to a git push operation
- Implemented consistent environment management across all projects

## Technical Insights and Lessons Learned

Throughout the migration, we encountered and resolved various technical
challenges:

### Platform-Specific Issues

One of the most interesting aspects of the migration was dealing with
platform-specific behaviours that only manifested in the OpenStack environment.
A particularly notable example was with
[Kiln](https://github.com/kcl-ddh/kiln)/[EFES](https://github.com/EpiDoc/EFES)
projects, where XSLT processing would fail with non-obvious errors. The solution
required deep diving into [Cocoon](https://cocoon.apache.org)'s pipeline
architecture and modifying how templates were processed.
We also met with some architectural changes regarding presenting web sites to
the Internet. We no longer place project servers directly in the Internet, but
route all public web access via
[web proxy servers](https://en.wikipedia.org/wiki/Web_application_firewall).

### Java Application Challenges

Java applications presented unique challenges, particularly around class-loading
behaviour. Loading order differed between local development and OpenStack
environments, requiring careful management of JAR file placement to ensure
consistent behaviour across environments.

### Docker and Container Orchestration

Container-related issues required careful attention to platform compatibility,
environment synchronisation, and dependency management. This was particularly
challenging with legacy applications that required specific versions of
dependencies or had complex runtime requirements.

## Static Site Conversion: A Sustainability Strategy

### The Decision to Go Static

Our approach to static conversion emerged as a key sustainability strategy,
driven by practical considerations:

- Security vulnerabilities in legacy systems
- Limited resources for ongoing maintenance
- End of project funding cycles
- Technical feasibility issues
- Cost of maintaining dynamic infrastructure

If interested, you can find out more about our
[static-first development approach](https://kdl.kcl.ac.uk/slides/2024-london-static-first/).

### Technical Implementation Process

1. Initial Site Capture

   - Created complete site snapshots as the first step
   - Documented existing functionality and user flows
   - Identified critical features that needed preservation
   - Used tools like [Sitesucker](https://ricks-apps.com/osx/sitesucker/index.html)
     for creating comprehensive static snapshots

2. Technical Challenges

   - Sites with [AJAX](<https://en.wikipedia.org/wiki/Ajax_(programming)>)-dependent
     interfaces required special handling
   - For complex dynamic functionality:
     - Captured all necessary data states
     - Reimplemented critical features using client-side tools
     - Implemented modern static search functionality using
       [pagefind](https://pagefind.app/) where needed
     - Simplified interfaces where appropriate
   - Preserved core user experience while accepting some functionality trade-offs

3. Sustainability Benefits
   - Dramatically reduced security attack surface
   - Minimal ongoing maintenance requirements
   - Lower hosting costs
   - Improved performance
   - Extended project lifespan

### Stakeholder Engagement

The conversion process involved careful stakeholder management:

- Lab support team led communications with project stakeholders and senior
  management in our Faculty as well as relevant IT departments
- Clearly explained technical implications and benefits
- Focused on long-term preservation benefits
- Generally received positive reception due to extended project lifespan
- Transparent about functionality changes or limitations

## Impact and Benefits

The modernisation effort has yielded several key benefits:

- Improved maintainability through standardised deployment processes
- Enhanced sustainability through containerisation
- Reduced operational costs by optimising resource allocation
- Better documentation and reproducible infrastructure
- Simplified ongoing maintenance and updates

These benefits allows us to pass on cost savings to our partners and Faculty,
for whom we maintain these projects as well as align with central e-Research
facility and services.

## Team and Timeline

The project, so far, has presented significant resource challenges:

- Team composition shifted during the year-long project
- Balancing migration work with ongoing active projects
- Maintaining service continuity while implementing changes
- Managing knowledge transfer during team transitions

## Looking Forward

This migration has positioned us better for future sustainability:

- Standardised processes for new project onboarding
- Improved infrastructure flexibility
- Better prepared for future technological changes
- More resilient and maintainable digital estate

## Conclusion

While more time-intensive than initially anticipated, this migration project has
positively transformed our infrastructure and processes. The standardisation and
modernisation efforts have not only improved our current operations but have
also established a robust foundation for future digital humanities projects at
KDL.

Our shift towards a static-first approach, combined with comprehensive
containerisation and automation, ensures that our digital research outputs remain
accessible and maintainable for years to come. As we work to complete the
migration of the final projects, the successful transformation of the majority
of our digital estate demonstrates the value of systematic modernisation in
research infrastructure (next major upgrade expected in 3 years time) and good
team work!
