---
layout: layouts/project.njk
pagination:
  data: projects
  size: 1
  alias: project
  addAllPagesToCollections: true
permalink: "projects/{{ project.slug }}/"
tags: projects
eleventyComputed:
  navKey: "Projects"
  title: "{{ project.name }}{%- if project.alternateName %} <small>{{ project.alternateName }}</small>{% endif -%}"
  dissolutionDate: "{% if project.dissolutionDate %}{{ project.dissolutionDate }}{% else %}1970{% endif %}"
  feature:
    image: "{% if project.image %}{% getDirectusAsset project.image.id %}{% endif %}"
    title: "{% if project.image %}{{ project.image.title }}{% endif %}"
    description: "{% if project.image %}{{ project.image.description }}{% endif %}"
---
