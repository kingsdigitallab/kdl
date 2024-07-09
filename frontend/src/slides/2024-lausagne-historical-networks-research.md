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

<div class="r-stack">
  <img
    class="fragment fade-out"
    data-fragment-index="0"
    src="/assets/images/slides/radicaltranslations-knows-network.svg"
    height="600"
  />
  <img
    class="fragment"
    data-fragment-index="0"
    src="/assets/images/slides/radicaltranslations-network-interface.png"
    height="600"
  />
</div>

<aside class="notes">

- Network implemented on Observable platform: [`tiny.cc/ixiiyz`](http://tiny.cc/ixiiyz) using the [`d3`](https://d3js.org) library for data visualisation
- Data exported from the project database and converted to a network format
- Nodes represent people (authors, translators, publishers), organisations, and
  places
- The edges signify various relationships (location, editorial, interpersonal, organisational, publication, translation)
- Some of the relationships inferred from other connections, not directly defined
  in the database
- Interactive features:
  - Filter network data by people and organisation
  - Select different types of relationships to display
  - Ability to explore and manipulate the network dynamically

</aside>

{% endslide %}

{% slide %}

## Network Insights

### Abstracts complex personal trajectories

<img src="/assets/images/slides/radicaltranslations-thomas-paine.svg" height="500" />

<aside class="notes">

- Simplifies intricate life paths into nodes and edges
- Example: Thomas Paine
  - Zoomed-in view of Paine's node
  - Multiple edges connect to various other people, organisations and places
  - Edges represent different types of relationships
  - Illustrates the complexity of an individual's connections and influence.

</aside>

{% endslide %}

{% slide %}

## Network Insights

### Highlights gaps, omissions, and issues

<div class="r-stack">
  <img
    class="fragment fade-out"
    data-fragment-index="0"
    src="/assets/images/slides/radicaltranslations-knows-network-before.svg"
    height="500"
  />
  <img
    class="fragment"
    data-fragment-index="0"
    src="/assets/images/slides/radicaltranslations-knows-network-after.svg"
    height="500"
  />
</div>

<aside class="notes">

- Highlights potential gaps, omissions, and biases in the data
- Wide view of the network reveals:
  - Areas of high connectivity
  - Contrasting sparse areas
  - Potential geographical or temporal biases
- Example: Isolated 'kite' shape
  - Group of four individuals initially disconnected
  - Revealed a gap in the data
  - Connection to the main network addressed the gap
  - Also uncovered a self-referential group of radicals in Genoa
- Demonstrates how visualisation can expose data limitations and lead to new insights

</aside>

{% endslide %}

{% slide %}

## Network Insights

### Reveals connections across borders

<img
    src="/assets/images/slides/radicaltranslations-basedin-translated-network.svg"
    height="500"
  />

<aside class="notes">

- Reveals connections across borders
- Network example illustrates:
  - Nodes representing agents (individuals and organisations) and places
  - Edges indicating translation relationships
  - Large nodes for Paris and London, surrounded by numerous connections
- Key insights:
  - Visualises the flow of radical texts across national boundaries
  - Highlights Paris and London as central hubs in the radical translation network
  - Reveals extensive cross-border relationships centred on these major cities
- Emphasises the international nature of the translations

</aside>

{% endslide %}

{% slide %}

## Network Insights

### Highlight missing biographical information

<img
    src="/assets/images/slides/radicaltranslations-anonymous-network.svg"
    height="500"
  />

<aside class="notes">

- Highlight missing biographical information
- Valuable when biographical data is:
  - Missing
  - Incomplete
  - Too complex to visualise directly
- Example:
  - Focus on nodes representing anonymous persons
  - Shows connections to known entities
  - Demonstrates how network analysis can help:
    - Infer information about unknown individuals
    - Provide context through associative relationships
- Benefits:
  - Helps fill gaps in historical records
  - Offers insights into social and professional circles
  - Allows for hypothesis generation about anonymous agents' identities and roles

</aside>

{% endslide %}

{% slide %}

## Research Process

<div class="r-stack">
  <img
    class="fragment fade-out"
    data-fragment-index="0"
    src="/assets/images/slides/radicaltranslations-research-countries.svg"
    height="500"
  />
  <img
    class="fragment"
    data-fragment-index="0"
    src="/assets/images/slides/radicaltranslations-knows-network-annotated.svg"
    height="500"
  />
</div>

<aside class="notes">

- Enables exploration of:
  - Translators' networks
  - Collaboration patterns
  - Influence dynamics
- Example: Influence dynamics
  - Researchers examined potential bridge figures
  - Focus on connections between Italian and French contexts
  - Identified key individuals facilitating cross-cultural exchange
- Provides insights into:
  - Contextual landscape of radical activities
  - Geographical and temporal distribution of translation efforts
- Hypothesis testing:
  - Assists when biographical data is incomplete
  - Complements other digital tools
  - Allows for inference of identities and roles based on network position
- Benefits:
  - Reveals hidden connections and patterns
  - Supports data-driven research narratives
  - Enhances understanding of the radical translation ecosystem

</aside>

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
- Mucignat, Perovic: [`doi.org/10.61147/des.9`](https://doi.org/10.61147/des.9)

### Contact

- Arianna Ciula: [`arianna.ciula@kcl.ac.uk`](mailto:arianna.ciula@kcl.ac.uk)
- Miguel Vieira: [`jose.m.vieira@kcl.ac.uk`](mailto:jose.m.vieira@kcl.ac.uk)

{% endslide %}
