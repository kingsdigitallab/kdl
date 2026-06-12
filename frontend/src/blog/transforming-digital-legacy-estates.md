---
title: Transforming digital legacy estates to create a more sustainable future
tags:
    - post
    - archiving
    - sustainability
authors:
    - Samantha Callaghan
    - Brian Maher (University College London)
    - Pamela Mellen
date: 2026-06-12
excerpt: ""
feature:
    image: /assets/images/blog/picture-blogpost-sustainability1.jpg
    title: Transforming digital legacy estates
---

_Background note: Samatha Callaghan and Pamela Mellen are current KDL staff members. Brian Maher previously worked at KDL and is now based at the University College London (UCL) [Advanced Research Computing Centre](https://www.ucl.ac.uk/advanced-research-computing/) (ARC) with a visiting fellowship in KDL._

_We presented at [RSECon24](https://rsecon24.society-rse.org/), in Newcastle - our presentation was based on work KDL undertook since its formation and the work that UCL plans to do in near future – how to address our inherited digital legacy estates to ensure a sustainable future. We share an edited version of that presentation in this blogpost._

We will share our working definition of the term ‘digital legacy estate’[^1], followed by some of the history and context of KDL and UCL Digital Humanities (DH). Our discussion will cover:

- The goals that motivate us to address our legacy estates and some of the challenges we've encountered when undertaking this work
- Our past approaches and what we've learned, including examples drawn from our legacy estates and how we approached them
- Our current approaches as well as what we foresee to be our future solutions
- A call to action

We hope the experiences we share will galvanise teams with unaddressed legacy estates to take up the challenge sooner rather than later.

---

## Definition

For our purposes we define an organisation's ‘digital legacy estate’ as collectively referring to the projects which they support or host after their core funding has ended.

Very often, these legacy estates come with significant “legacy debt” - projects without a clear plan for archiving, sustainability or long-term support. This “debt” presents a series of risks and challenges, as outlined below.

There are many reasons that projects end up in this state. For example, researchers who developed early digital humanities projects often assumed that hosting would continue indefinitely; their creators focused on building new and innovative digital research tools. They didn't anticipate the increasing challenges of security, or the complexity of ongoing maintenance as digital technology evolved over time.

---

## History and context – KDL and UCL

KDL was founded in 2015, when the Faculty of Arts and Humanities at King’s College London decided to separate the academic Department of Digital Humanities from the Research Software Engineers (RSE) who developed the digital research projects; that development team became KDL’s founding staff.

KDL inherited around 30 years of DH projects at King's, which constituted more than 100 individual projects and sites that we then hosted. These projects included a huge variety of work, from simple conference websites to highly experimental digital tools to more traditional DH projects such as prosopographies. As there was no clear plan for these projects’ ongoing support, this estate brought with it significant legacy debt.

These different projects involved a wide variety of stakeholders, including the project investigators and other project staff, King’s Faculty of Arts and Humanities, individual departments, external organisations, funders, users and so on.

At UCL, the Advanced Research Computing Centre (ARC) was formed in 2021 in part to fulfil the research computing demands among research teams at UCL and the wider community. ARC builds digital research infrastructure for partners both inside and outside of UCL. UCL DH was established in 2010 and supports 50+ pioneering DH projects that very much need a sustainability strategy, or strategies, now.

---

## Goals

For KDL to tackle our legacy debt, our first task was to rationalise how we supported the digital legacy estate and put everything on a long-term sustainable footing.

In consultation with our faculty, we agreed a set of core goals for what we were trying to achieve with what we termed our [Archiving and Sustainability](https://kdl.kcl.ac.uk/about/archiving-and-sustainability/) project.

These goals were:

- Preserving high "value" projects, factoring in:
    - Impact
    - Reputation
    - Value to scholars
    - Ongoing usage
    - Long-term technical and financial sustainability
- Graceful decommissioning

We recognise that preserving high “value” projects is necessarily based on subjective criteria; still, a start needed to be made.

---

## Challenges

In tackling our legacy debt, we had to address a range of challenges, often through trial and error as we uncovered unexpected issues and adjusted our approaches to adapt as we learned. As the project progressed, the team identified common themes and challenges, some project-by-project, others in respect to our position and resources as a lab, and in alignment with the wider institution. We frame them here as questions that others can use when considering how to address their own legacy debts:

- **Infrastructure** – Do you have the resources to host legacy projects?
- **Time** – Do you have the time (and finances) to maintain or rebuild?
- **Cyber Security** – Do you have the right expertise? What is your organisational risk appetite?
- **Technical** – Is the code very old? Does it rely on unsupported software?
- **Reputational Risk** – If things go wrong, how bad will the impact be?
- **Legal/Ethical Risks** – Accessibility regulations; GDPR compliance
- **Lost connections** – Are academic partners still available?
- **Political/Interpersonal Issues** – Will partners take decisions personally?

### Infrastructure

Do you have the resources to host the project both now and in five years' time? Those resources may be compute and/or finances to sustain the underlying infrastructure that you need.

### Time

Do you have the people resource to support a project, including if it requires a complete rebuild, either now or in the future? At times you will need to effectively scrap it and start again; other times you will need to maintain the project on an ongoing basis. Both approaches can take a lot of time.

### Cyber security

This brings a range of challenges. For example, [Cyber Essentials](https://www.ncsc.gov.uk/cyberessentials/overview) (a UK government-backed cyber security certification scheme) is a specific challenge of the British research landscape as some funders require it and meeting the requirements to receive certification can be very challenging and time consuming.

Lateral movement is also a risk; you may host your legacy projects on the same corporate networks that host your student and HR systems. Do you have the expertise and the risk appetite to host legacy projects that may represent a security risk? Are you willing to risk your legacy software being hacked, with the possibility that an attacker could then move over to a HR system and steal sensitive information?

### Technical

The biggest challenge for developers, and perhaps the most frustrating one, is that you will be dealing with code that may not have been touched for years. For example, the code may be in a GitHub repository that's never been tested or consist of compiled Java that you no longer have the source code for and which contains embedded passwords.

### Reputational Risk

Even if you do have some appetite for risk, your Information and Communication Technology (ICT) department may not, as there is a reputational risk. The risk is two-fold; the first ties to the cybersecurity aspect, the second to the potential reputation hit to your team and your institution — how bad are the headlines going to be? As [this Guardian article on the British Library cyberattack](https://www.theguardian.com/commentisfree/2024/feb/06/hacker-british-library-cybersecurity-cybercrime-uk) illustrates, the impact can be severe.

However, taking research offline rather than risking a cyber-attack is itself not risk-free. If you suddenly turn off an established project with data that's been online for years this will also impact your institutional reputation. A reputation for 'killing' research completed and paid for years ago will present political issues.

### Legal/Ethical risks

Legacy projects can also bring legal and ethical risks. Accessibility regulations may apply if you're making major changes and can present significant time investment to meet, especially for projects created before the regulations existed. Ethical concerns also arise; even if you aren't legally obligated to bring a site up to current accessibility standards, is it fair to host a site that isn't accessible?

GDPR is also an ongoing issue, particularly if you have a legacy site that has been collecting information without a privacy policy in place. You may not have formal consent to collect data, creating a legal risk.

### Lost connections

Missing information and lost connections present challenges when managing legacy projects and needed decision-making. You may not know who the academic partner or project developer is. Alternatively, you may know who they are but be unable to contact them for a range of reasons — including non-response. Their department may have been gone for five years, or they may have moved to another institution or passed away. Who then has the authority to make decisions as to a project's future?

### Political/Interpersonal Issues

Political and interpersonal issues are often an unspoken but pervasive challenge. For example, academics or project partners may take suggestions for archiving or decommissioning personally. Whatever the reasons, being informed that it is no longer possible to host their website may give rise to responses suggesting the researcher feels they are being singled out — e.g. "why are you taking my research offline? Why is it my data that gets removed from the internet?" This challenge is significant and can be the most difficult to address.

---

## Past approaches

As UCL is in the early stages of addressing their legacy projects, this discussion focuses on approaches that KDL took and how these have evolved.

We foresaw some of these challenges; others emerged as we investigated and explored options for addressing our legacy estate.

As digital humanities evolved into a discipline and attracted grants from major funding bodies, many researchers assumed that digital humanities projects would be supported indefinitely; that they were the digital equivalent of a scholarly monograph. As we have outlined above, this is not feasible for technical, financial and security reasons. As we began to have conversations — with academic partners, RSEs, system administrators and faculty stakeholders — we soon identified the need to educate stakeholders on the practical realities about legacy projects which needed to be addressed. We also explored options on how to do so and began proactively proposing solutions.

Some of these conversations were difficult. We found it helpful to refer to authority. This might be a technical authority, e.g. explaining the project presented a known security risk; or to Faculty authority where senior leaders had made a decision about the project, based on our recommendations.

KDL established a process and a set of options for archiving and sustainability. The options we have established include:

### Ongoing hosting

**Service Level Agreements (SLA):** a costed agreement outlining how we will host and maintain the project. We review these regularly, usually every five years. Depending on the relationship between the academic lead and the King's Faculty of Arts and Humanities, they may be faculty supported, externally funded or a mix of both.

### Decommissioning options

**Static (minimal hosting):** If technically feasible, it may be converted to static and hosted at no or low cost. Initially, our static sites lost all dynamic elements; we've since been able to include a new search functionality. For some projects, this has proven better than their original search functionality.

**Migration:** Migrating the site to a new host, especially if an academic partner is now resident at another institution. This option can take some time, especially if there are legal considerations around data ownership and copyright to address or contracts to arrange.

**Minimal archiving:** Taking the project offline. We put up a static page with metadata about the project, a screenshot and links to archived snapshots (e.g. the Internet Archive and/or the UK Web archive). We also commit to keep a copy of the project on our servers for a minimum of two years.

Example: [Archetype GitHub access](https://github.com/kcl-ddh/digipal/wiki/) — redirected to the project's GitHub page at the partner's request rather than a holding page.

Critically, we began to document our decommissioning process early on. We captured information about the projects' development histories, infrastructure needs at the time of decommissioning, recommendations and decisions, any special requests made and the dates of decommission. While both the decommissioning authorisation template and the process overall have gone through many iterations, the decommissioning documents have proven extremely valuable. They allow us to answer questions that arise, sometimes even years later, when the partners have long retired or moved on.

![KDL Legacy Projects Pie Chart showing archiving and sustainability progress as of November 2024](/assets/images/blog/picture-blogpost-sustainability3.jpg)

![KDL Legacy Projects Pie Chart showing current status as of June 2026](/assets/images/blog/picture-blogpost-sustainability4.jpg)

The first pie chart indicates how many projects had been addressed under our archiving and sustainability approach as of November 2024. The tiny slice for "GitHub Access" is a minimally archived project (Archetype) which redirects to the project's GitHub page rather than a holding page at the request of the partner. The second pie chart updates this status as of June 2026.

---

## Completed examples

These two projects went through these processes and presented additional challenges.

### Early English Laws (EEL)

- [Project site](https://www.earlyenglishlaws.ac.uk/home)
- Outcome: migrated to the University of Saint Andrews

Although we reached an agreement on migration relatively early, there were difficulties in getting a contract in place as it was atypical. There were three institutions involved and complex conversations around copyright permissions.

- September 2019: Began conversations about possible migration
- August 2021: Began writing the decom document
- October 2023: KDL archived our copy of the site, completing decommissioning

### Stormont Papers

- [Project site](https://stormontpapers.ahds.ac.uk/)
- Outcome: currently minimally archived

The site was technically unsustainable in its previous form and presented major reputational risks due to the importance of the content. It needed to be handled gracefully. We hoped that it would find new life in the future as we regularly received emails from people interested in reviving it. However, it is currently minimally archived and can only be securely revived in a new form. As of February 2025, we have shared the data that comprised the Stormont Papers website with Queen's University Belfast who plan to make it available via their [Northern Ireland Official Papers Archive](https://niopa.qub.ac.uk/) platform.

---

## Current approaches – Evaluation

Out of this complex 'archiving sustainably' project, and with contributions from many staff over the years, KDL evolved a standardised approach. The process must be fair, transparent and consistent. We have agreed criteria and make recommendations for each site based on these. The final decisions rest with the Faculty of Arts and Humanities, which has a formal SLA committee that meets annually.

![KDL Service Level Agreement (SLA) Evaluation Process Diagram](/assets/images/blog/picture-blogpost-sustainability5.jpg)

The diagram above outlines how we make recommendations for sites as they come to the end of their SLAs; the complexity of this chart reflects the complexity of these decisions. While this doesn't always make it easy, we find that it makes the conversations with partners and the decisions about next steps more straightforward. Referring to standard policies and criteria, backed by the authority of our Faculty, helps ensure that the process is and feels fair to all involved.

Documentation resources:

- [Software Development Lifecycle (SDLC) wiki](https://github.com/kingsdigitallab/sdlc-for-rse/wiki)

### Current approaches – Decommissioning process

![KDL Decommissioning Process Diagram](/assets/images/blog/picture-blogpost-sustainability6.jpg)

The evaluation decision tree is part of our larger Archiving and Sustainability process; in conjunction with our decommissioning process, we ensure our approach is consistent and documented. This includes specifying what should happen and who has responsibility for each step. It helps ensure we keep our digital legacy estate in good order and, while the documentation can take time, it pays off readily when a difficult question arises. Our approach is always evolving, but clear processes and documentation enable us to maintain consistency and transparency which are essential.

---

## Future solutions

What can we do going forward with web-based research outputs? As described above, it's critical to consider both technical and non-technical aspects.

### Technical approaches

How do you ensure that everything you produce is technically sustainable?

It is crucial to build with sustainability in mind from the outset. Consider questions such as: do you really need a dynamic CMS for a web-based output? Do you need to use the fancy tools whilst building the website? Could the output be a static website? See our [Static-first approach slides](https://kdl.kcl.ac.uk/slides/2024-london-static-first/) for more.

Don't be tempted by unsustainable features; if you need a search engine, consider using a front-end JavaScript based search engine rather than, say, a back-end search engine backed with Elasticsearch or Solr, which is more at risk of hacking or obsolescence.

Think about others maintaining your projects in the future and ensure that your infrastructure and everything that goes with it is fully reproducible. Having your application containerised isn't a perfect solution, but a containerised seven year-old application will be far easier to maintain than a seven year-old piece of Java code that is undocumented and which nobody knows how to run.

Be very careful with cloud services for web outputs. Using cloud services to build research data pipelines doesn't present sustainability issues, but the picture is very different when it comes to web outputs. Imagine a website with faceted search backed by an AWS lambda script, with images hosted in Azure — who will have responsibility for supporting that in five years time? Will there be funding? If you use Google services, will they even be around in five years? Google have a habit of deprecating services — many old research websites have embedded Google Maps on their contact page that now just shows an invalid API token.

Finally: document everything. This is a common refrain amongst developers but its importance is very clear when looking at code another developer wrote many years ago. While it is something of a chore, it's critical when it comes to the Archiving and Sustainability process.

---

### Non-technical approaches

When it comes to non-technical processes, it is vital to have these conversations early. Talk about the project's sustainability at inception — ideally in the pre-funding application stages. This allows you to design a project with sustainability in mind and plan both funding and capacity accordingly.

Funders are now relatively open to including modest amounts of funding for managing the sustainability of a project in the post-funding period, especially when they mandate it. This means research can include funding for a post-project support agreement, an SLA, into the funding application. These need to be structured correctly — ensuring the payment is made in full during the funded period — but can provide vital funding for longer-term support.

In some cases, there are now dedicated funding calls to apply for funding to maintain digital resources, e.g. the [Software Sustainability Institute's Research Software Maintenance Fund](https://www.software.ac.uk/programmes/research-software-maintenance-fund). While these calls are limited, this and broader funder openness to post-project support speaks to the crucial advocacy role the digital Research Technical Professional (dRTP) community has played in making these issues more visible.

Ensure everyone is aware that further conversations about archiving and sustainability are coming. Partners are generally happier with the decision to convert their website to static in five years' time if they knew they would need to consider a decommissioning approach, rather than being unexpectedly told their website is no longer sustainable and must be taken offline.

And again: document. Document decisions, e.g. agreed decommissioning arrangements and continuity planning. Academics may retire or move to other institutions. Make a plan and document it.

Finally, be transparent. Make it clear that you have a standard process, tell partners how it works and how their project fits into it. Making this standard practice will help to smooth some of the interpersonal issues we discussed above.

---

## Call to action

Identify your current digital legacy estate by looking at your current and past projects. Do you know what you are hosting, where it lives and what is needed?

Tackle it systematically, fairly and consistently. The chart below shows the time KDL spent getting our estate in order, especially at the beginning. Over the period of this project, we have spent in the region of 3000 hours across a range of roles, from system administrators to RSEs, investigating and addressing sustainability for our digital legacy estate. It is a significant number of hours but the alternative — hosting questionable, insecure legacy projects indefinitely — is not a viable strategy.

![Bar chart showing hours spent per project over the course of the archiving and sustainability project](/assets/images/blog/picture-blogpost-sustainability7.png)

Start documenting — your future self will thank you. You'll be able to answer difficult questions about projects that have been decommissioned years ago, allowing you to act consistently.

While addressing the legacy estate is complex, time-consuming and can be uncomfortable, the advantages to having addressed the historical digital debt are clear. It gives you clarity on what projects you have, where they live, who to talk to about them and what is needed to maintain them in the long term. It reduces the reputational and security risks described above. This process connects you to your colleagues and partners. And importantly, the conversations you have with partners and decisions you make as a lab — while sometimes difficult — ultimately serve to demonstrate that you care about the research you have produced and the people involved.

If you have questions about our approach to archiving and sustainability at KDL, you can reach out to us via the KDL website: [https://kdl.kcl.ac.uk](https://kdl.kcl.ac.uk)

---

[^1]: We have refined this definition since the original presentation, to differentiate between a “legacy estate” and “legacy debt”.
