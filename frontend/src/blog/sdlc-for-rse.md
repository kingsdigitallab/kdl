---
title: Safeguarding an inheritance and ensuring a legacy
subtitle: Software Development Lifecycle for Research Software Engineering
tags:
  - post
  - Research Software Engineering
authors:
  - King's Digital Lab
date: 2020-08-19
excerpt: "At its inception in 2015, King’s Digital Lab became the de facto
  custodian of a rich legacy of Digital Humanities (DH) research projects
  spanning decades of experimentation... "
feature:
  image: /assets/images/blog/SDLC_blog_banner.original.jpg
  title: © King's Digital Lab, Background image fauxels @ Pexels
  description: SDLC_blog_banner_v2
---

At its inception in 2015, King’s Digital Lab became the de facto custodian of a rich legacy of Digital Humanities (DH) research projects spanning decades of experimentation...

Many of these projects represented very first forays into new methods of research, and new models of impact and dissemination, built by researchers simultaneously discovering and testing the affordances of digital tools. Later on, some of these early exploratory works became the foundations of efforts to consolidate approaches to humanities datasets, and new standards proliferated. More recently still DH projects exhibit the high production values that a sophisticated audience has come to expect from its daily interactions with the world wide web. Specialist resources now appeal to, and cater for, broader audiences beyond their core academic targets.

Where DH was once the sole preserve of self-starters and born out of a spirit of experimentation (an important tradition that we are delighted continues), a discipline is coalescing and becoming codified. Practices are becoming systematised and a global ecosystem of humanities data is proliferating: sometimes in isolated niches; sometimes in silos; and occasionally as networks of resources that share and amplify their respective value through connectivity and interoperability.

The collection of projects inherited by KDL therefore represented the evolution of ideas, conceptual leaps and, of course, the occasional cul-de-sac. The infrastructural burden of maintaining this legacy had crept up imperceptibly to become first bothersome, then onerous, however. We needed to act before it would, eventually, become crippling.

Whilst venerable web resources limped along, held together with metaphorical black tape, newer projects, and those still on the horizon, are gargantuan in scale and ambition, requiring project leaders to corral development and research resources into coherent and sustainable outputs. It was clear that protecting this intellectual legacy was non-negotiable, but also that there were no quick fixes. The combination of challenges for software development in a research setting is unique but the problems of operating at scale are more general. A key consideration is that the accumulated domain knowledge represented in these web resources is complemented by equally substantial learning about critical infrastructure. This is a lesson of history that we hoped to address in a Software Development Life Cycle (SDLC) formulated to meet the needs of Research Software Engineering (RSE).

Digital projects in academic settings are slow to develop, are hopefully long-lived, and need to safeguard the learning gained for future generations. Bid development is a political and diplomatic act coordinating many moving parts, differing opinions and priorities. There is competition for the allocation of resources within the project. Projects are, by definition, operating at a frontier of knowledge and consequently the research outputs become moving targets; we’d be disappointed if they didn’t. How then do we ensure the best chances of a successful research outcome?

Soon after KDL was established, an iterative refinement of our project management processes began. The guiding principle has been a holistic approach to infrastructure that acknowledges the particular needs of software development in a research setting. During the past five years we’ve written and revised multiple versions of document templates, pro-formas and policies to reflect the many years of accumulated experience in the Lab. Of course, this documentation continues to evolve along with the research environment - and sometimes in spite of it.

We appropriated good practice from the realm of commercial software development with the intention of transforming it into best practice for RSE. This began by formalising a lot of the project activity we already undertook around the unifying terminology of [Agile DSDM](https://www.agilebusiness.org/page/whatisdsdm). Instead of simply codifying common sense, this process compelled us to examine the detail of our more informal approach to planning and to question what we might have held to be self-evident. We are making these resources available to the community (more on this later) but let me give a brief outline of how our project conversations begin:

One of the most practical outputs of this work has been the creation of a matrix of questions for our projects and partners and for ourselves. It was apparent that every member of the team had a sense of the priorities (from different perspectives) that we needed to consider when we encountered a project idea for the first time. In an initial meeting with a domain expert, it can be very helpful to have an arsenal of prompts to hand to guide the conversation and reduce the possibility of misunderstanding at the outset. Whilst our passion is to create and develop exciting new tools we can’t be driven by these appetites alone. Managing the dynamic interactions of the people we work with is as integral to the success of the project as the technical development. Consequently, at the earliest stage of project discovery, we’ve learned to ask searching and reflective questions about how a partner is likely to view our contributions, how invested they are in working with our processes, how pragmatic they might be in the face of change. Occasionally it might be necessary to manage expectations about digital research potentials but, just as often, we’ll need to encourage partners to be both ambitious and realistic.

The decisions as to which of the many projects that come to us we choose to pursue are taken as a group, in the climate of the institution at that time, considering our skills and resources, the timeline of the project, our own interests, the value we can bring and the best interests of the project. This is now a six-weekly meeting for us, having recently changed from a weekly, start-the-week meeting. Six weeks gives us a suitable period to consider the relative merits of a tranche of projects competing for attention and to have a clearer understanding of the forward planning implications. It is a period of time that underlines the importance of considering the digital components of a project as a core output and not just as a supplement to printed volumes.

We still regularly receive requests to provide ball-park figures for websites for project applications that are due to be submitted at the end of the same week, and although we try to help and guide as much as we can, we’ve learned through painful experience that even the most modest seeming digital projects need to be thoroughly scoped out and put through a Feasibility assessment. The working assumption is that most projects, by this stage, are technically feasible. However, being practically feasible is another thing entirely.

Once key requirements are identified, we identify solutions, alternative solutions, and even compromises. All SDLC roles in the team are able to contribute to this assessment and an exacting internal peer review eventually provides a consensus on the time and resources needed. Concurrently, we will already be looking at the options for sustainability and research data management so that the final costs we suggest have been arrived at through a transparent and rigorous process. We’d typically expect to spend no less than four weeks getting this right, but a great deal of the analysis done here can help to build a really robust, technically underwritten grant application. Once the project is live and development has started, work progresses in manageable and logical chunks with efforts targeted at specific requirements. While the high-level vision of the project remains the same throughout the research period, the technical priorities will almost certainly change. Things that appeared to be window dressing turn out to be fundamental and vice-versa. However, if we develop, deploy, review and iterate, things never stray too far from where they need to be. Communication is therefore paramount. Even during long projects with seemingly quiet stretches it is essential to keep to a regular schedule of meetings.

I could go on describing our SDLC and produce a fairly dry post about project management, but instead we’re releasing the framework of this methodology into the wild as we hope it will be useful for other RSE teams, and indeed that other RSE teams will feel empowered to contribute and develop these ideas with us. To this end a GitHub wiki has been set up which gives pro-formas for the most important documents we use to guide our process. Using these project tools has become second nature to KDL now so we’ve tried to provide comprehensive guidance about how to work with them.

A brief word on format. We chose GitHub Wiki to share these resources as we wanted to decouple the Document Template formats from any proprietary file types and to make versioning transparent. The templates are presented in Markdown and the general form can be easily copied into other formats. We took care to remove text that was specific to our institution, or to rephrase it in a way that was generic and reusable. The document templates themselves are lightweight proformas and the main substance is in the accompanying Guidance Documents (one for each template).

It’s not a one-size-fits-all situation of course; there are edge cases and outliers which mean that it will forever be a work in progress, but we hope one that will become a community joint endeavour. Indeed these living documents have already been shared and discussed with our community members on several [occasions](https://www.kdl.kcl.ac.uk/events/research-software-engineering-digital-humanities/).

Aside from the processes and documentation, there is one more vital ingredient that helps to make this all work well for us; continuity, and by that I am referring to career paths. A recognition that for RSE to prosper as a professional field practitioners need to feel secure and have a clear route for advancement both for their own benefit and for the benefit of the projects they work on. If a developer or a designer is drafted in for a year or two, inevitably there will be a ticking clock; a balancing of work commitments with job security. RSE is specialised work and all practitioners have spent years learning how to translate complex and alien concepts into meaningful and useful data models, how to create generous and intuitive interfaces. Asking a commercial developer to step into this world without acclimatising is a big ask. Readers might like to explore our [RSE HR career document](https://zenodo.org/record/2564790#.XzU45pNKhhE) in parallel to our SDLC, which we view as the essential human enabler of the SDLC philosophy described in this post, and the templates we link to below.

We invite you to explore the [Wiki](https://github.com/kingsdigitallab/sdlc-for-rse/wiki) resources and to cherry pick the elements that are useful to your own circumstances. We also encourage you to constructively feedback and suggest amendments and additions based on your own experiences. You might choose to do this through Twitter and thus trigger further discussion in the RSE community ([@kingsdigitallab](https://twitter.com/kingsdigitallab)) or via [kdl-info@kcl.ac.uk](mailto:kdl-info@kcl.ac.uk).