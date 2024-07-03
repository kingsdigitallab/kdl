---
title: "The Radical Translations: Visualising Networks of Revolutionary Culture (1789-1815)"
event:
  title: The Historical Network Research Conference (HNR2024)
  url: https://historicalnetworkresearch.github.io/lausanne/
tags: slides
slide:
  loop: true
  slideNumber: true
draft: true
---

{% slide %}

## Radical Translators

### (Britain, France and Italy, 1789–1815)

### Through the Lens of a Network Visualisation

Dr Arianna Ciula | Miguel Vieira

#### King's Digital Lab, King's College London

[`kdl.kcl.ac.uk`](https://kdl.kcl.ac.uk)

{% endslide %}

{% slide %}

## Introduction

- The Radical Translations (RT) project (2019–2023)
- Aimed to unravel the complex relationships of radical ideas during the 18th and 19th centuries
- Employed data models based on BIBFRAME and FOAF
- Experimental work around network visualisations

{% endslide %}

{% slide %}

## Dataset Overview

- **`1,505`** agents (`214` organizations, `1,291` persons)
- **`237`** events
- **`1,691`** bibliographical resources (`947` translations, `610` source texts, `255` paratexts)

{% endslide %}

{% slide %}

## Data Model

[![Data model](/assets/images/slides/radicaltranslations-models.png)](https://radical-translations.readthedocs.io/en/latest/technical-overview.html#data-model)

<aside class="notes">

- Captures translation practices (integral, partial, abridged, etc.)
- Includes biographical information about translators (roles, attributes, relationships)
- Extensive use of controlled vocabularies (FAST, Wikidata, VIAF, GeoNames, EDTF)
- Project-specific classification schemes

</aside>

{% endslide %}

{% slide %}

## Network Visualisation

![Network visualisation](/assets/images/slides/radicaltranslations-knows-network.svg)

<aside class="notes">

- Implemented on Observable platform: [`tiny.cc/ixiiyz`](http://tiny.cc/ixiiyz)
- Data manually exported from the project database
- Represents people (authors, translators, publishers) and organizations
- Edges signify various relationships (location, editorial, interpersonal, organizational, publication, translation)

</aside>

{% endslide %}

{% slide %}

## Network Insights

- Abstracts complex personal trajectories into nodes and edges
- Highlights potential gaps, omissions, and biases in the data
- Reveals connections of "political solidarity" across borders

{% endslide %}

{% slide %}

## Network Insights

- Offers visual traces to test hypotheses about people's movements and life stories
- Especially valuable when biographical information is missing or too complex to visualise directly

{% endslide %}

{% slide %}

## Research Process

- Integrates graph networks into the research process
- Enables exploration of translators' networks, collaboration patterns, influence dynamics
- Provides insights into the contextual landscape of radical activities during the period
- Helps test hypotheses about identity when biographical data is incomplete or needs different digital tools

{% endslide %}

{% slide %}

## Conclusion

- Network visualisations reveal intricate connections shaping history
- Expanded dimensions of interpretation within the RT project
- Insightful tool for hypothesis verification

{% endslide %}

{% slide %}

## Thank you & Questions?

### Resources

- RT project: [`radicaltranslations.org`](https://radicaltranslations.org)
- RT technical overview: [`tiny.cc/cziiyz`](http://tiny.cc/cziiyz)
- Network visualisation: [`tiny.cc/ixiiyz`](http://tiny.cc/ixiiyz)

### Contact

- Arianna Ciula: [`arianna.ciula@kcl.ac.uk`](mailto:arianna.ciula@kcl.ac.uk)
- Miguel Vieira: [`jose.m.vieira@kcl.ac.uk`](mailto:jose.m.vieira@kcl.ac.uk)

{% endslide %}
