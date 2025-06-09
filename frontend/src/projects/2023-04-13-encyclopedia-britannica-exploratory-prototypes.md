---
title: Encyclopedia Britannica Exploratory Prototypes
name: Encyclopedia Britannica Exploratory Prototypes
tags:
  - projects
alternateName: Encyclopedia Britannica
slug: encyclopedia-britannica-exploratory-prototypes
foundingDate: 2023-04-13
dissolutionDate: 2023-07-24
creativeWorkStatus: Active
feature:
  image: /assets/images/projects/Encyclopedia
    Britannica--mohamed-marey-tZe9vB4EJ4Y-unsplash.jpg
  title: An open book, Photo by Mohamed Marey
  description:
    A close-up of an open book's fanned-out pages, creating a visually
    striking pattern of curved, layered lines in warm tones.
  width: 1200
  height: 800
funders: []
departments:
  - name: Faculty of Arts and Humanities
    slug: faculty-of-arts-and-humanities
  - name: Digital Futures Institute
    slug: digital-futures-institute
  - name: FAH Department of English
    slug: fah-department-of-english
members:
  - name: Geoffroy Noël
    slug: geoffroy-noel
    roleName: Research Software Engineer
    inOrganisation: null
  - name: Arianna Ciula
    slug: arianna-ciula
    roleName: Research Software Analyst
    inOrganisation: null
  - name: Marion Thain
    slug: marion-thain
    roleName: Researcher
    inOrganisation: null
  - name: Peter Logan
    slug: peter-logan
    roleName: Principal investigator
    inOrganisation: null
keywords:
  - Machine Learning and AI
  - History
  - Linguistics
  - Languages and Literature
urls:
  - name: Project URL
    url: https://kingsdigitallab.github.io/eb-pre/
  - name: "Repository: kingsdigitallab/eb-pre/"
    url: https://github.com/kingsdigitallab/eb-pre/
  - name: Data
    url: https://tu-plogan.github.io/source/r_releases.html
---

This project builds on a selection of the published datasets of the early Encyclopedia Britannica editions (1771-1911) produced by the [Nineteenth-Century Knowledge Project](https://tu-plogan.github.io/), led by Peter M. Logan. One hypothesis employed as a use case to guide KDL contribution is that nascent disciplines (domains of knowledge) may not have developed a rich descriptive terminology compared to more established fields and that therefore this linguistic complexity or density can be operationalised by analysis the entries associated to these domains in the Encyclopedia. A particularly important desideratum of KDL exploratory work was to privilege inductive methods and to minimise reliance on extrinsic information.

The scope of this exploratory project was for KDL to:

- familiarise itself with the dataset (7th and 9th editions of the Encyclopedia Britannica);
- experiment various computational linguistic methods (e.g. taxonomic classification, zero-shot classification, semantic topic modelling, semantic classification) and tools to assess their usefulness, limitations and potentials with respect to some research hypotheses around trends and shifts in the historical evolution of knowledge domains as represented in the Encyclopedia entries from cultural and linguistic perspectives;
- identity the most promising classifier (a semantic search approach was selected);
- develop prototype interfaces to manually review the quality of the resulting clusters and assist project partners with uncovering the contemporary organisation of knowledge rather than imposing modern constructs and prior knowledge.

This resulted in two prototype interfaces (we pages) and associated documentation:

1. [keyword search](https://kingsdigitallab.github.io/eb-pre/kwsearch.html) (7th edition, 1830-1842, and 9th edition, 1875-1889) with domain filtering;
2. [semantic search](https://kingsdigitallab.github.io/eb-pre/semsearch.html?q=medicine&l=25&ml=10000) (7th edition, 1830-1842).

Both of these are based on a language model made of vectors (also called “embeddings”), one for each word form used in the datasets and one for each Encyclopedia entry. The model is entirely trained from the corpus using off-the-shelf [word2vec](https://en.wikipedia.org/wiki/Word2vec) libraries ([Gensim](https://radimrehurek.com/gensim/) and [top2vec](https://github.com/ddangelov/Top2Vec)). This algorithm ensures that words used in similar constructs have similar vectors. The vector of an Encyclopedia entry is obtained by averaging the vectors of the words it contains. This model can therefore be used to search for the most similar words or entries to another given word or entry based on their distance in that joint space.

The first interface allows allows users to find entries by their heading in the Encyclopedia, their subject terms as extracted by the 19thC Knowledge Project or their domain (assigned by KDL via a classification process based on the models of contemporary descriptions of 6 core domains and associated seed words).

While the second interface allows users to interact directly with a copy of the language model (compressed for the web, which slightly degrades its quality) to retrieve the semantically closest entries and words to any given word or entry heading. A click on any result will trigger a new query. This interface lets users break free from the pre-defined domains and interrogate the corpus for any frequent terms, whether they are high level categories of knowledge, specific concepts or actual persons or places.
