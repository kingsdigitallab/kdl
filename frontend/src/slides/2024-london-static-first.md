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

<aside class="notes">
To start I would like to emphasize the sustainability and performance benefits of
the static/archival first approach, especially in comparison to our previous
monolithic stacks like Django. Other benefits include improved performance,
security, and reduce hosting costs. These benefits are mainly because in the end
all that we are hosting is HTML/CSS/JavaScript files.
</aside>

{% endslide %}

{% slide %}

## The Static First Development Approach

- A modular, flexible approach for building websites and web applications
- Follows a technical stack with at most 3 components:
  1. Static Site Generator (SSG) as the base
  2. Flat File CMS (optional)
  3. Headless CMS (optional, for more complex projects)

<aside class="notes">
It's a modular stack, that allows for different
combinations based on project complexity and requirements.
</aside>

{% endslide %}

{% slide %}

## The Static First Development Approach

![Static first components](/assets/images/slides/static-first-components.png)

<aside class="notes">
The static first components mapped into the Divine Comedy of web development at
KDL.
</aside>

{% endslide %}

{% slide %}

## Component 1: Static Site Generator

- Generates static HTML, CSS, and JavaScript files from templates and data sources
- Examples: **[11ty](https://www.11ty.dev)**, [Jekyll](https://jekyllrb.com),
  [Next.js](https://nextjs.org), **[SvelteKit](https://kit.svelte.dev)** (static export)
- Benefits: fast performance, secure, scalable, and easy to host

<aside class="notes">
Briefly explain each component (SSG, Flat File CMS, Headless CMS) and provide examples of popular tools.
</aside>

{% endslide %}

{% slide %}

## Component 1: Static Site Generator

![Static first project structure](/assets/images/slides/static-structure.png)

{% endslide %}

{% slide %}

## Component 2: Flat File CMS (optional)

- Provides a user-friendly interface for managing content in flat files (e.g., Markdown)
- Examples: **[Front Matter](https://frontmatter.codes)**, [Decap CMS](https://decapcms.org/)
- Suitable for smaller, content-driven projects

{% endslide %}

{% slide %}

## Component 2: Flat File CMS (optional)

![Front matter CMS](/assets/images/slides/frontmatter.png)

{% endslide %}

{% slide %}

## Component 3: Headless CMS (optional)

- Decoupled content management system, serving content via APIs/data exports
- Examples: **[Directus](https://directus.io)**, **[Pocketbase](https://pocketbase.io)**
- Suitable for projects that require advanced content modeling and dynamic content delivery

{% endslide %}

{% slide %}

## Component 3: Headless CMS (optional)

![Directus CMS](/assets/images/slides/directus.png)

{% endslide %}

{% slide %}

## Using Standard Data Models

- Adopt standard data models based on [schema.org](https://schema.org/)
- Enables content portability and interoperability
- Aligns with semantic web principles
- Examples: Article, Event, Person, etc.

<aside class="notes">
In parallel with the static first approach we also started a more general
adoption of standard data models based on schema.org for content
portability, interoperability, and alignment with semantic web principles.
</aside>

{% endslide %}

{% slide %}

## The Stack Migration Process

- Previously used a Django-based stack (monolithic)
- Recently introduced Docker for improved containerization and scalability
- Now moving towards a static first approach for sustainability reasons

<aside class="notes">
Discuss the migration process from the previous Django-based stack, including 
the recent introduction of Docker for containerization.
</aside>

{% endslide %}

{% slide %}

## Benefits of the Static First Approach

- Improved performance and scalability
- Enhanced security (reduced attack surface)
- Lower hosting and maintenance costs
- Better developer experience (simpler tooling, faster build times)
- Easier deployment and content updates

<aside class="notes">
Outline the key benefits of the static/archival first approach, such as improved
performance, security, scalability, and reduced hosting costs, again this is
because we are mostly just hosting HTML files.
</aside>

{% endslide %}

{% slide %}

## Challenges and Considerations

- Limited real-time interactivity (can be mitigated with JS frameworks)
- Potential content modeling limitations (depends on CMS choice)
- Learning curve for new tooling and workflows

<aside class="notes">
Address potential challenges and considerations, such as limited real-time
interactivity, content modeling limitations, learning curves.
</aside>

{% endslide %}

{% slide %}

## Conclusion

- The static first approach offers a sustainable, low-resource solution
- Modular stack allows flexibility and scalability
- Suitable for a wide range of projects, from simple websites to complex web applications
- Based on the [JAMstack](https://jamstack.org) (JavaScript, APIs, and Markup) architecture

<aside class="notes">
Mention the alignment with the JAMstack (JavaScript, APIs, and Markup)
architecture, which is popular for its scalability and performance
characteristics.
</aside>

{% endslide %}
