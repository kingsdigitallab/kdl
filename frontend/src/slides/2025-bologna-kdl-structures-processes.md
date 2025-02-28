---
title: "Un’infrastruttura digitale per la ricerca in ambito umanistico: strutture e processi del King’s Digital Lab"
event:
  title: DH-ATLAS
  url: https://dh-atlas.github.io/workshop.html
tags: slides
slide:
  loop: true
  slideNumber: true
draft: true
---

{% slide %}

## Un’infrastruttura digitale per la ricerca in ambito umanistico

### strutture e processi del King’s Digital Lab

Arianna Ciula

#### King's Digital Lab, King's College London

[`kdl.kcl.ac.uk`](https://kdl.kcl.ac.uk)

{% endslide %}

{% slide %}

## Percorso

- Infrastruttura in senso olistico
- Introduzione al King's Digital Lab
- Software repository
- I dati nel project lifecycle - esempi
- Buone pratiche ma come far meglio?

{% endslide %}

{% slide %}

## Infrastruttura multilivello

[![Socio-technical system](/assets/images/slides/bologna-2025-fig_1.png)](https://doi.org/10.2307/j.ctv2wk727j.9)

<aside class="notes">

- Ciula, A., & Smithies, J. (2023). Sustainability and modelling at King’s Digital Lab: between tradition and innovation. In J. Nyhan, G. Rockwell, S. Sinclair, & A. Ortolja-Baird (Eds.), On Making in the Digital Humanities: The scholarship of digital humanities development in honour of John Bradley (pp. 78-104). University College London Press. https://doi.org/10.2307/j.ctv2wk727j.9
- Figure 4.1 RSE team, data, models and systems are entangled with each other. Concentric circles denote co- constitution as opposite to exogenous relations. The socio- technical system is multilayered

</aside>

{% endslide %}

{% slide %}

## King's Digital Lab


- [Team e ruoli](https://kdl.kcl.ac.uk/about/team/)
- [Progetti](https://kdl.kcl.ac.uk/projects/)
- [Temi di ricerca](https://kdl.kcl.ac.uk/projects/research-themes/)


{% endslide %}

{% slide %}

## Codice e software

- [Github repository](https://github.com/kingsdigitallab/)
- [Licenza apoerta MIT](https://opensource.org/licenses/MIT))
> "KDL makes any project application source code freely accessible at KDL’s GitHub repository."
> "Unless otherwise specified, users can download this material and reuse it under the terms of the MIT License."

{% endslide %}

{% slide %}

## Dati e project lifecycle

### SDLC

<div class="r-stack">
  <img
    class="fragment fade-out"
    data-fragment-index="0"
    src="/assets/images/slides/sdlc.png"
    height="600"
  />
  <img
    class="fragment"
    data-fragment-index="0"
    src="/assets/images/slides/bologna-2025-sdlc-data.png"
    height="600"
  />
</div>

{% endslide %}

{% slide %}

## Dati e project lifecycle

### Pre-project

- [Domande-guida relative ai requirements](https://github.com/kingsdigitallab/sdlc-for-rse/wiki/Data-Management-Plan-guidance-and-AHRC-template)
- [Linee guida e strumento DCC pre creare Data Management Plans](https://www.dcc.ac.uk/resources/data-management-plans)
- Requirement di default
- > "KDL provides help and advice with respect to preparing and depositing the digital data appropriate for deposit in the King's Open Research Data Service (KORDS) or other appropriate data repository"

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
- Other benefits of networks:
  - Helps fill gaps in historical records
  - Offers insights into social and professional circles
  - Allows for hypothesis generation about anonymous agents' identities and roles

</aside>

{% endslide %}

<!--
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
-->

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
