---
title: Role and responsibilities of the Research Software Analyst
subtitle:
tags:
  - post
  - RSE
  - analysis
  - Agile SDLC
  - Digital Research Technical Professions (dRTPs)
authors:
  - Arianna Ciula
date: 2025-10-21
excerpt: This blog post builds on a talk co-authored with King’s Digital Lab (KDL) research software analysts - Paul Caton, Samantha Callaghan and Neil Jakeman - and presented at RSECon 2025 with the title [“Aligning feasible technical requirements to research objectives and steering collaboration ":" role and responsibilities of the Research Software Analyst in RSE teams”](https://virtual.oxfordabstracts.com/event/75166/submission/41).
feature:
  image: /assets/images/blog/textiles-and-tech-1_hanna-barakat-aixdesign_archival-images-of-ai_4096x2846.png
  title: Textiles and Tech 1 by Hanna Barakat & Archival Images of AI + AIxDESIGN https://betterimagesofai.org CC 4
  description:
draft: true
---

## Digital Research Technical Professionals (dRTP) in Arts and Humanities (A&H) and beyond

The UKRI-embraced term of digital Research Technical Professions (dRTP) represents a wide range of roles and responsibilities across the digital research ecosystem. In this blog post, I would like to focus on the role I have taken on since joining KDL in 2017 – Research Software Analyst (RSA) - to offer the example I know best of competences and responsibilities which I consider complementary and essential to research software engineering teams.

The blog post can hopefully be useful for others to see what an RSA role is, what we do as RSAs, how it differs from the role of Research Software Engineers and to inspire others holding similar responsibilities to professionalise RSA roles in or closely working with RSE teams and beyond.

First, when looking at the national context, it is interesting to note that the Arts and Humanities Research Council definition of RTPs includes analysts – albeit as an undefined label:

>"[an RTP is] anyone who brings indispensable specialist technical skills, at an advanced level, to a research project, i.e. professional skills that are necessary for the design, development, delivery, completion and maintenance of the project. Depending on the project, Research/Academic Library professionals, Information systems specialists, Analysts, Sound engineers, Digital technicians, Conservators, Information systems and software engineers, _System managers_, Archivists, Animators, Illustrators, Graphic and _UI/UX designers_, Conservators, Curators, _Project and research infrastructure managers_ and others may qualify for inclusion."
>>(in bold additions proposed by KDL in a response to AHRC consultation on RTPs in 2022, [What does the role of Research Technology Professional mean to King’s Digital Lab?](kdl.kcl.ac.uk/blog/rtp-rse)

Conversely, the Arts and Humanities community – where in the last few years awareness of RSE and dRTPs roles more widely has increased – recognises that research and business analysis are prerogatives of the Research Software Engineer (RSE) role:

>“RSEs are involved in a very wide variety of activities ranging from project leadership/management and research / business analysis to UI/UX design, systems administration, and collections management. They also often lead or contribute to systems and infrastructure development and maintenance in partnership with both internal IT departments and external vendors. They are an increasingly key component in interdisciplinary, computationally intensive research, working alone and in teams and across an extraordinary range of research disciplines.”
>>[Sichani et al. 2023](https://doi.org/10.5281/zenodo.8177926)

If you agree that research and business analysis are relevant for RSE teams at large, you might find it useful to read on and find out more on how KDL defined the RSA role and its career pathways.

## King’s Digital Lab (KDL) roles and career pathways context

Timewise, here is a quick overview of KDL career pathways work:

* 2018
    * RSE term adoption ([one of the first teams in Arts & Humanities](https://zenodo.org/records/13655424) - p.20 - to do so)
* 2019
    * [Roles document](https://doi.org/10.5281/zenodo.2559234%20%20​) published
    * [SDLC wiki](https://github.com/kingsdigitallab/sdlc-for-rse/wiki) started with project templates and guidance building on [Agile DSDM roles](https://www.agilebusiness.org/dsdm-project-framework/roles-and-responsibilities.html)| definitions

### RSA role description

The table below is a snapshot of the KDL RSA workload model. At the time of drafting these roles (this work was led by KDL founding Director, [James Smithies](https://orcid.org/0000-0003-4801-0366)), this document was conceived as an indication and guidance of potential distribution of tasks and responsibilities rather than an exact match.

![Extracts from KDL roles document](/assets/images/blog/Table-analyst-role.jpg "Extracts from KDL roles document, Analyst role, 2019, pp. 6-8.")

This more high-level grouping is useful to highlight that project management is only one of the varied and various responsibilities the RSA role covers:

| Core responsibilities amounting to **30%** | **20%** | **30%** | **20%** |
|-------------------------------------------|---------|---------|---------|
| **Research analysis**                     | **Project management** | **Other responsibilities** | **... and more** |
| Deploy / accumulate domain knowledge to understand methods / requirements / interfaces | rowspan: Take responsibility for the design and delivery of technical solutions and their integration into wider institution technical frameworks and strategies | **10%** Research Implementation | 5% Research Development |
| Produce solution overview documents for inclusion in funding bids |  | **10%** Teaching | 5% System, Software and Data Maintenance Support |
| rowspan: Work with colleagues to support technical research outputs |  | **10%** Personal research | 5% Self-directed learning |
|  |  |  | 5% Community outreach |

To those that have time to read the full role document, it will be clear that it builds on [business analysis good practices](https://shop.bcs.org/page/detail/?k=9781780175102) anchored by [Skills Framework for the Information Age (SFIA)](https://sfia-online.org/). In particular the KDL RSA role can potentially map to and fulfil the following Agile Software Development Lifecycle (SDLC) roles:

* Research Analyst
* Project Coordinator
* Tester
* Team Leader
* Research Developer

The document also identifies different levels of seniority starting from entry level and moving into senior and principal. Some of the characteristics that distinguish the senior level include:

* team management including professional development;
* lead on large grants / methodologies / lab strategy;
* stakeholder management;
* community engagement.

To the above the principal role adds amongst others:

* increased line management including appraisals/workload planning;
* engagement with stakeholders at executive level;
* national & international community engagement / networks;
* personal research.

All these specifications might sound quite abstract; so, let's consider what an RSA actually does.

### What does an Analyst do?

Following the [Agile DSDM terminology](https://www.agilebusiness.org/dsdm-project-framework/roles-and-responsibilities.html), I decided to focus on the important part an RSA plays in the so-called pre-project and evolutionary development phases of the KDL SDLC.

![KDL SDCL pre-project phase](/assets/images/blog/pre-project.png "KDL SDCL pre-project phase.")

In particular, the feasibility assessment part of pre-project (circled in red in the diagram above) is where the contribution of this role is key.

The [KDL guidance on feasibility assessment phase](https://github.com/kingsdigitallab/sdlc-for-rse/wiki/F2:-Feasibility-guidance) offers some information of how the role operates but to sum up, the RSA needs to rely on:
*their knowledge (of research domains as well as specific technical methods)
*combined with own experience (in particular around collaboration)
*as well as analytical skills (around research questions, technical requirements framing)
*and so-called "power" skills - to enable others to perform their own roles in a collaborative project team made up of other dRTPs including RSEs and designers, as well as, typically, project leads, co-leads, and other researchers as applicable.

In this critical feasibility assessment stage, the role requires:
*awareness of organisational requirements as well as of the research and research funding contexts within which a project is shaped.

Whether at organisation or research context level, this awareness applies to both general and technical requirements.

An example of awareness of an organisational general requirement might relate to the Faculty’s strategy to support AI in research with associated documentation; while awareness of an organisation-level technical requirement might relate to knowledge of the University’s provision for compute infrastructure. The example of awareness of general requirements at the research funding context level might concern eligibility and budgetary constraints of specific funding schemes.

The core activity the RSA leads during the feasibility assessment stage is the so-called elicitation of solution-level requirements. Crucially, this is a proactive, curious, collaborative process (which is the reason why I don’t like calling it requirements gathering as it assumes requirements are out there ready to be harvested, rather than to be  understood and shaped collaboratively). The main key steps in this process are:

1. understand research objectives in a technology agnostic manner - curiosity is a key RSA attitude!
1. iterate, asking many questions and including examination of data samples as needed
1. evaluate options and approaches - RSA leads this but crucially in a technology-aware consultative manner integrating input from the rest of the RSE team
1. formalise prioritisation of requirements – again the RSA leads this but in collaboration with others from the RSE team and project team at large (project lead etc.); in the KDL case, prioritisation is normally done following the well-known [MoSCoW technique](https://github.com/kingsdigitallab/sdlc-for-rse/wiki/A2:-Terms-of-Reference-Guidelines#231-moscow-prioritisation)
1. estimate effort – similarly to step 3, the RSA in KDL leads this but gets input and feedback from the larger RSE team ensuring levels of accountability for the whole team and process
1. forward plan – the RSA also must think beyond the immediate objectives of the project and keep an eye on future responsibilities especially if components of research outputs are at stake – in particular software and systems – that are required to be maintained long term.

Again, to be less abstract, let’s look at an example of elements of feasibility assessment taken from a design and development work package of a specific project I have been lead research analyst for. I chose the [CROSSREADS project](https://kdl.kcl.ac.uk/projects/crossreads/), led by the University of Oxford and funded by the European Research Council, with the core objective of collecting aggregated data – epigraphic, linguistic and petrographic - about all ancient inscriptions recorded on the Italian island of Sicily.
What follows is an extract from the table of what KDL calls default requirements – i.e. not project specific but requirements KDL has found apply as default and to be adapted based on each context – with MoSCOW prioritisation.

| ID     |     | Description                  |
|--------|-----|------------------------------|
| KDL01  | M   | Data protection              |
| …      |     |                              |
| KDL08  | S   | Data publication and deposit |
| …      |     |                              |
| KDL10  | C   | Training                     |

This list would be complemented by analysis and prioritisation of the project specific requirements as showcased below:

| ID   |     | Description             |
|------|-----|-------------------------|
| D1   | M   | Petrographic environment |
| …    |     |                         |
| D4   | M   | Aggregated search       |
| …    |     |                         |
| D6   | C   | Visualisations          |
| D7   | S   | Open data endpoints     |
| …    |     |                         |

The associated estimate of effort would then look something like the following:

|              | **Role**         | **Days / Cost**        |
|--------------|------------------|------------------------|
| **Project requirements** | RSA …<br>RSE … | X<br>Y<br>Z<br>... |
| **Default requirements** | _(colspan 2)_              | Α                      |
| **Infrastructure**       | _(colspan 2)_              | Ω                      |
| **TOTAL**                | _(colspan 2)_              | X + Y + Z + ... + Α + Ω |

Based on consultation undertaken under step 3 of the requirements elicitation phase, the RSA would also make sure that ideally the feasibility assessment document includes an overview, even if in the form of a simple outline or sketch idea, of the proposed  solution – this is usually based on the collaborative analysis undertaken during the elicitation process and on how the project compares with the RSE team expertise as well as previous efforts.
In the pre-project phase of this CROSSREADS work package I worked very closely with KDL RSE Geoffroy Noël, KDL RSA Neil Jakeman and project lead Jonathan Prague.
Since this work package of CROSSREADS builds on a previous work package developed by KDL, the sketch architecture was quite detailed and deemed as feasible at the end of the feasibility process:

![Miro board drawn by RSE](/assets/images/blog/Crossreads-Req.mapping.jpg "Miro board drawn by RSE outlining the evolving solution overview for the corpus building work package of CROSSREADS project.")

The other phase of the SDLC I decided to focus on to explain the role of the RSA is the iterative evolutionary development phase.

![KDL SDCL evolutionary development phase](/assets/images/blog/evo-dev.png "KDL SDCL evolutionary development phase.")

During this phase of active design and development for the RSE team, the RSA role can be grouped into three areas, namely:

1. Lead initiation, analysis and reviews where, in line with KDL guidance developed over the last 5 years or so, the RSA leads on:
    1. Notification of grant / project start
    2. Set up management environment (in collaboration with projects portfolio manager)
    3. Organise kick off
    4. Ownership of Project Review Record and internal/external review meetings schedules
    5. Analysis work (e.g. data modelling) and associated documentation
2. First point of contact and escalations, where the RSA monitors:
    1. Iterative prioritisation
    2. Capacity planning at project level
    3. Any substantial project change request
3. Other contributions, in particular to:
    1. Project and at times lab-level communication strategy
    2. “Change freeze,” where the RSA coordinates consensus-reaching (within the RSE sub-team and project team at large) around prioritisation based on testing results and budget available
    3. Data deposit or other dissemination activity
    4. Service Level Agreement draft if applicable or any decommissioning plans or documentation
    5. Project review aiming at wider lab process improvement activities

Let’s look again at the same example with a specific deliverable in mind (the petrographic environment mentioned in the project requirements table above). In this phase of the project deliverable, I worked very closely with the KDL RSE at the time Ryan Hauser and the project Research Associate Alessia Coccato.
A core element of RSE support for the project was to create a data collection, processing and analysis environment for one of the project researchers undertaking material sciences analysis of the rocks where the texts (in Latin, Greek and other languages) are inscribed. What follows are examples of the evolutionary development artefacts I contributed to in my role as lead RSA for the project.

As part of analysis work (1e above) I met several times with the aforementioned researcher,  looked at data samples (including data produced both via invasive and entirely digital, so non-invasive, techniques of petrographic observation and analysis), familiarised myself with the units of analysis, agreed on a high level language for the data workflow and associated data models, and recorded relevant notes or decisions in the project review record.

![Analogue artefact (whiteboard sketch)](/assets/images/blog/white-board.jpg "Analogue artefact (whiteboard sketch) drawn by the RSA in discussion with the researcher and the project RSE.")

![Digital artefact (extract from Miro board) drawn by the RSA and the research domain expert.](/assets/images/blog/crossreads-petrography.png "Digital artefact (extract from Miro board) drawn by the RSA and the research domain expert.")

Ultimately this collaborative analysis process led to agreed RSE interventions in the research workflow formalised both by technical documentation (such as the diagram above), research dissemination (e.g. conference papers) and, crucially from an RSE perspective, the actual code used to implement the petrographic research environment.

![Digital artefact (extract from ClickUp project review record document)](/assets/images/blog/crossreads-CU-increment4.png "Digital artefact (extract from ClickUp project review record document) owned by RSA and shared with the whole project team showcasing one iteration of a component of the solution – isotope analysis – which did not end up being part of the final product.")

While the RSA role is more prominent in the initial phases of analysis of the research problem to tackle or support, I continued to monitor the development iterations, recording key milestones and reviews in the project review record as per 1d (see example above and below), including contributing to testing of the deliverables when applicable.

![Digital artefact (extract from ClickUp project review record document) listing progress on high level requirements/deliverables with associated tracked time and level of priority.](/assets/images/blog/crossreads-CU-requirements.png "Digital artefact (extract from ClickUp project review record document) listing progress on high level requirements/deliverables with associated tracked time and level of priority.")

Other activities listed under 2 above I have contributed to are prioritisation and capacity planning as showcased below.

![Digital artefact (extract from ClickUp project review record document) recording discussion and prioritisation of RSE work in the project.](/assets/images/blog/crossreads-CU-increment16.png "Digital artefact (extract from ClickUp project review record document) recording discussion and prioritisation of RSE work in the project.")

## Reflections on skills mapping and professionalisation

I mentioned how the KDL roles were drafted to map indicatively to the SFIA framework. The framework has slightly evolved since then, but the mapping is still relevant. The diagram below lists on the left characteristics and competences that the KDL RSAs (Paul, Samantha, Neil and myself) collected anecdotally to describe what we think is most important in what we do. All these map to what you would expect in the SFIA framework (for those interested, for the senior level these are: BUSA 5; FEAS 5; REQM 5; RSCH 5; METL 5; EMRG 5; PRMG 5; DTAN 4; DESN 5; INCA 4; UNAN 4; RELM 3; TEAC 5; PDSV 4; PEMT 4).

However, interestingly, they also highlight other areas of the framework highlighted in blue in the diagram that:

* are associated to relationships management and what I referred to above as “power” skills, highlighting the importance of engaging with people and processes in addition to data and systems;
* have gained importance in an increasingly digital research infrastructure (DRI) oriented landscape such as service management; and,
* have become essential in a Higher Education Institution ecosystem supported by external funding and targeting realistic cost recovery such as financial management.

![Mapping KDL RSA perceived key assets with SFIA framework.](/assets/images/blog/RSA_talk_sfia.jpg "Mapping KDL RSA perceived key assets with SFIA framework.")

Finally, as the RSE community is also engaged in a holistic mapping of skills and competences, I also attempted to map what KDL RSAs perceived as their key assets or talents to the [DIRECT framework](https://github.com/direct-framework/) draft. This fun exercise both validated the DRAFT framework (as it is, it already seems to map nicely to the RSA role as we intend it in KDL) but also to potentially highlight the importance of other areas beyond project management including professional skills at personal, interpersonal and teamwork/collaboration level, as well as domain expertise and research, and, last but not least, leadership and management.

![Mapping KDL RSA perceived key assets with DIRECT draft framework.](/assets/images/blog/RSA_talk_direct.jpg "Mapping KDL RSA perceived key assets with DIRECT draft framework.")

RSA roles, whilst well-known and professionalised in industry (as business analysts or, increasingly, as product managers), Higher Education Institutions in the UK tend o not have formal RSA roles, so the tasks described above are carried out by RSE themselves, technical project managers (e.g. Scrum masters at the University of Manchester) or data roles (e.g. data scientists at Alan Turing Institute; data stewards at UCL). Professionalising a separate RSA role has the advantage of freeing RSE (and other members of the Solution Development Team such as UI / UX designers) from these responsibilities to focus on technical design and development. RSAs are able to enable grant capture and parallel work on multiple projects in different stages of conceptualisation and development at scale. Separating overall lab management (responsibility of the lab manager at KDL) from portfolio-level project management (responsibility of the project manager at KDL) from project-level project management (responsibility of the RSAs) enables accountability in financial management while keeping the deliverables close to the research questions and concerns (main responsibility of the RSAs). This separation also allows for both lab level and project-level capacity planning  and supports the SDT team to develop analysis processes around its SDLC (e.g. feasibility assessment, planning and documentation, decommissioning). However, it does require some investment beyond better known RSE roles and the availability of career pathways or provision for training and mobility across roles.

The RSA is a rich role with skills which can complement an existing RSE role or, for teams which work at scale, more successfully be implemented into a separate role; hopefully, this blogpost left you with a clearer idea of what an RSA does, what they could do in your team or whether you would be interested in a similar career.

For two projects I co-lead which support career development for digital RTPs including RSA see [STEP-UP](https://step-up.ac.uk/) and [DisCourse](https://discourse-network.github.io/).
