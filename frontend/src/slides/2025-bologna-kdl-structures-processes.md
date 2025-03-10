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

1. Infrastruttura in senso olistico
1. Introduzione al King's Digital Lab
1. _Repository_ del software e codice
1. Dati e _project lifecycle_ - esempi
1. Buone pratiche ma come far meglio?

{% endslide %}

{% slide %}

### Infrastruttura multilivello

<img 
    src="/assets/images/slides/bologna-2025-fig_1.jpg"
  height="550"
  />
<small>Sistema socio-tecnico ([Ciula e Smithies 2023](https://doi.org/10.2307/j.ctv2wk727j.9))</small>

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
- [Licenza aperta MIT](https://opensource.org/licenses/MIT)
  > <small>KDL makes any project application source code freely accessible at KDL’s GitHub repository [...] Unless otherwise specified, users can download this material and reuse it under the terms of the MIT License.</small>

{% endslide %}

{% slide %}

## Dati e _project lifecycle_

<div class="r-stack">
  <img
    class="fragment fade-out"
    data-fragment-index="0"
    src="/assets/images/slides/sdlc.png"
    height="580"
/>

<img
  class="fragment"
  data-fragment-index="0"
  src="/assets/images/slides/bologna-2025-sdlc-data.png"
  height="580"
/>

</div>

{% endslide %}

{% slide %}

## Dati e _project lifecycle_

### _Pre-project_

- [Domande-guida relative ai _requirements_](https://github.com/kingsdigitallab/sdlc-for-rse/wiki/Data-Management-Plan-guidance-and-AHRC-template)
- [Linee guida e strumento DCC pre creare _Data Management Plans_](https://www.dcc.ac.uk/resources/data-management-plans)
- _Requirement_ di _default_
  > <small>KDL provides help and advice with respect to preparing and depositing the digital data appropriate for deposit in the King's Open Research Data Service (KORDS) or other appropriate data repository</small>

<aside class="notes">

</aside>

{% endslide %}

{% slide %}

## Dati e project lifecycle

### Progetto attivo

- Di chi sono i dati?
  - Github
  - Repository istituzionale (interno o esterno) o disciplinare
- Accesso tramite interfaccia utente pubblica
  - Interfacce al testo/edizione e.g. [COTR _Regiam maiestatem_ edizione dinamica](https://cotr.ac.uk/viewer/?group=regiam&blocks=47:transcription@v-3;47:transcription#) ad altri tipi di dati (e.g. immagini) o enitità/dimensione e.g. [_Alice Thornton Books timeline_](https://thornton.kdl.kcl.ac.uk/timeline/)
  - Database _search_ e.g. [persone in DPRR](https://romanrepublic.ac.uk/person/)
  - Dati in formato tabulare e.g. [_Radical Translations download_](https://kdl.kcl.ac.uk/projects/)
  - Esempi di complessità diversa da altri [progetti](https://kdl.kcl.ac.uk/projects/)

<aside class="notes">

- chiarire ownership dei dati e collaboraz con altre strutture e.g. KCL archivi e biblioteche
- durante fasi di processing, i dati sono solitamente inclusi nello specifico repository del codice in github (tranne casi speciali es. dat confidenziali confidenziali, personali/zzati o di natura sensibile ecc.)
- a seconda del progetto i dati sono anche salvati con metadati associati in repository istituzionali interni o esterni (dell'Univ o altrove e.g. archivio/biblioteca) o repository disciplinari
- accesso (democratised access) ai dati tramite interfacce web e download

</aside>

{% endslide %}
