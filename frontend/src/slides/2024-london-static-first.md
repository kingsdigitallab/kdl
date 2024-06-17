---
title: Static First Development Approach
event:
  title: Internal Event
  url:
tags:
  - slides
slide:
  loop: true
  theme: light
  slideNumber: true
draft: false
---

{% slide %}

## Static First Development Approach

### King's Digital Lab, King's College London

{% endslide %}

{% slide %}

## Introduction

- Traditional web development often relies on complex, resource-intensive stacks (e.g., Django)
- Moving towards a more sustainable, low-resource approach using static site generators (SSGs)
- Benefits: improved performance, security, scalability, and reduced hosting costs

{% endslide %}

{% slide %}

## The Static First Development Approach

- A modular, flexible approach for building websites and web applications
- Follows a technical stack with at most 3 components:
  1. Static Site Generator (SSG) as the base
  2. Flat File CMS (optional)
  3. Headless CMS (optional, for more complex projects)

{% endslide %}

{% slide %}

## Component 1: Static Site Generator (SSG)

- Generates static HTML, CSS, and JavaScript files from templates and data sources
- Examples: **[11ty](https://www.11ty.dev)**, [Hugo](https://gohugo.io),
  [Next.js](https://nextjs.org), **[SveteKit](https://kit.svelte.dev)** (static export)
- Benefits: fast performance, secure, scalable, and easy to host

{% endslide %}

{% slide %}

## Component 2: Flat File CMS (optional)

- Provides a user-friendly interface for managing content in flat files (e.g., Markdown)
- Examples: **[Front Matter](https://frontmatter.codes)**, [Decap CMS](https://decapcms.org/)
- Suitable for smaller, content-driven projects
  {% endslide %}

{% slide %}

## Component 3: Headless CMS (optional)

- Decoupled content management system, serving content via APIs/data exports
- Examples: **[Directus](https://directus.io)**, **[Pocketbase](https://pocketbase.io)**
- Suitable for projects that require advanced content modeling and dynamic content delivery

{% endslide %}

{% slide %}

## Using Standard Data Models

- Adopt standard data models based on schema.org
- Facilitates content portability and interoperability
- Aligns with semantic web principles
- Examples: Article, Event, Person, etc.

{% endslide %}

{% slide %}

## The Stack Migration Process

- Previously used a Django-based stack (monolithic)
- Recently introduced Docker for improved containerization and scalability
- Now moving towards a static first approach for sustainability reasons

{% endslide %}

{% slide %}

## Benefits of the Static First Approach

- Improved performance and scalability
- Enhanced security (reduced attack surface)
- Lower hosting and maintenance costs
- Better developer experience (simpler tooling, faster build times)
- Easier deployment and content updates

{% endslide %}

{% slide %}

## Challenges and Considerations

- Limited real-time interactivity (can be mitigated with JS frameworks)
- Potential content modeling limitations (depends on CMS choice)
- Learning curve for new tooling and workflows

{% endslide %}

{% slide %}

## Conclusion

- The static first approach offers a sustainable, low-resource solution
- Modular stack allows flexibility and scalability
- Suitable for a wide range of projects, from simple websites to complex web applications
- Embracing the JAMstack (JavaScript, APIs, and Markup) architecture

{% endslide %}
