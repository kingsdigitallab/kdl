---
title: Before AI agents act for us, we need to know how AI searches for us
tags:
  - post
  - Generative AI infrastructures
  - AI agentic search
authors:
  - Janna Joceli Omena (King’s College London)
  - Giulia Tucci (Brazilian Institute of Information in Science and technology & International Center for Tropical Agriculture)
  - Aanila Kishwar (Indiana University Bloomington)
date: 2026-05-07
excerpt: ""
feature:
  image: /assets/images/blog/Before-AI-agents.jpg
  title: Alan Warburton / https://betterimagesofai.org / © BBC / https://creativecommons.org/licenses/by/4.0/
  description: A photographic rendering of a succulent plant seen through a refractive glass grid, overlaid with a diagram of a neural network
draft: true
---

_We are pleased to publish one of our affiliates' blogpost originally written for the [LSE website](https://blogs.lse.ac.uk/impactofsocialsciences/2026/04/15/before-ai-agents-act-for-us-we-need-to-know-how-ai-searches-for-us/) to give prominence to the topic of AI agents. 
KDL has a team on [ML/AI](https://kdl.kcl.ac.uk/projects/research-themes/machine-learning-ai/) and while explainability has been explored in few instances so far (e.g. [REFIDA](https://kdl.kcl.ac.uk/projects/refida/), [iREAL](https://kdl.kcl.ac.uk/projects/ireal/) and [Algorithmic Justice](https://kdl.kcl.ac.uk/projects/algorithmic-justice-beyond-binary-engaging-the-public-and-shaping-ethical-ai-in-justice-systems/)), we would be very interested to work with prospective collaborators on this topic. 
If you have an idea please get in touch by filling this [minimal form](https://forms.clickup.com/26475560/f/t7z18-72308/NK252MBKP2M3U8YGXU)_


**Generative AI agents are pitched as being a new gateway to engaging with the Internet. Based on a new study of how AI reads and searches the internet in a “conservative” and “stubborn” way, Janna Joceli Omena, Giulia Tucci and Aanila Kishwar argue for the need for greater observability in AI search.**


AI agents have [arrived](https://www.itpro.com/technology/artificial-intelligence/practical-ai-the-age-of-agentic-ai). They browse the web, help with online research, manage calendars and coding repositories, do spreadsheet work and even shop and act on our behalf.

From [ChatGPT’s Agent mode](https://openai.com/index/introducing-chatgpt-agent/) to [Opera’s Neon](https://blogs.opera.com/news/2025/05/opera-neon-first-ai-agentic-browser/) and [Perplexity’s Comet](https://www.perplexity.ai/hub/blog/introducing-comet), most of these assistants sit behind paywalls, deepening a digital divide while quietly (re)shaping how we experience and think with the web. As AI is integrated into many apps, asking questions to AI can feel routine. But, before AI agents could act on the web, they first had to learn how to see it. This raises an important question: how does AI search the web?

Our focus here is the search infrastructures that helped make AI agentic search possible. Specifically, we examine the integration of web search into large language models (LLMs), a layer increasingly referred to as generative AI search. One such case is [ChatGPT-4o’s web search functionality](https://openai.com/index/introducing-chatgpt-search/), which became widely available in late 2024. Fig.1 situates our study within a broader recent shift from web search to generative AI search and, more recently, AI agent search. Our empirical focus is the middle layer, where web search becomes integrated into LLMs and begins to underpin newer agentic systems. Drawing on an eight-month digital methods study, we examined how GPT-4o “sees” and “searches” the web over time, tracing which sources it cites, how consistent its answers are, and how its tone and self-presentation shift under repeated questioning.

![Figure 1: Situating our study within the changing infrastructures of web search. The schema distinguishes between web search, generative AI search, and the more recent rise of agentic search.](/assets/images/blog/Before-AI-1.jpg "Figure 1: Situating our study within the changing infrastructures of web search"){.media-medium}

Across this period, we found GPT-4o to behave as a conservative mediator of web knowledge (conservative by default), and only under explicit and consistent prompts challenging its credibility does it reflect the diversity of web sources and more critical language (stubborn just because). This conservatism is not ideological but operational. At the same time, GPT-4o offers inconsistent responses about its own functioning, yet relies on Reddit to ground its own technical explanations and often recycles sources.

What we found points to the need for robust forms of [platform observability](https://doi.org/10.14763/2020.4.1535): methods for capturing the empirical and temporal dimensions of how AI scan, rank, and package the web for us.

## Tracking how generative AI search the web

Our study operationalises a platform observability framework to understand how GPT-4o leverages Microsoft Bing as a third-party search engine, alongside other OpenAI-trusted partnerships, for example, Shopify, The Washington Post, The Associated Press, and Condé Nast.

To do this we focused on capturing GPT-4o’s responses to its web search function over a period of eight months (Fig.2). This involved [repeated prompting rounds](https://www.researchgate.net/publication/394343724_What_if_LLMs_Are_Our_New_Research_Engines), starting with a baseline prompt and extending it with follow-ups carried forward, with systematic capture of full outputs (text, layout screenshots, citation links, metadata).

![Figure 2: Longitudinal Prompt Method.](/assets/images/blog/Before-AI-2.jpg "Figure 2: Longitudinal Prompt Method"){.media-medium}

From December 2024 to July 2025, [data curation](https://docs.google.com/document/d/1RVOuPH8eNkDMeUJvFQRrQcYFa4-BXICh5_Rh8k8Ad6Q/edit?tab=t.0) combined an initial prompt with five follow-up meta-prompts (Fig.3). The initial prompt treats GenAI as an object of study, seeking domain content. Subsequent meta-prompts ask the model to explain its operations, documentation, performance changes, source selection, and reliance on third-party search.

![Figure 3: List of prompts for data curation between December 2024 and July 2025.](/assets/images/blog/Before-AI-3.jpg "Figure 3: List of prompts for data curation between December 2024 and July 2025"){.media-medium}

## Conservative by default – Taking you to approved sources

GPT-4o recycles approximately 54.8% of the web sources used to answer the prompts, reusing the same sources across repeated prompt rounds between December 2024 and July 2025. The majority of citations cluster around a familiar commercial core and OpenAI help articles, with domains such as techtarget.com and datacamp.com appearing in over half of the citations.

The network centre (Fig.4) reveals that GPT-4o tends to ground technical explanations on Reddit, a platform for community discussions and niche topics. As an epistemic authority, Reddit is one of the most frequently used single sources; it becomes a recurring source of credibility in ChatGPT’s explanations of its own web search function (meta-prompts 2 and 3) and appears exactly where OpenAI’s official documentation is absent (meta-prompt 1). This reliance on user-generated content, often mixed with SEO blogs, tech media, and OpenAI help articles, suggests that GPT-4o treats Reddit posts as quasi-technical confirmation for its own architecture.

![Figure 4: Network of prompts and domain image icons, representing GPT-4o’s responses from December 2024 to July 2025.](/assets/images/blog/Before-AI-4.jpg "Figure 4: Network of prompts and domain image icons, representing GPT-4o’s responses from December 2024 to July 2025"){.media-medium}

​​Left unchallenged, GPT-4o operates like a conservative search engine: once-trusted, always-trusted. But when prompts turn self-reflexive or probe credibility, citations shift toward the network periphery (Fig.4), pulling in novel and more authoritative sources. Prompt wording (lexical choices) and framing (semantic intent) shape this citation behaviour. Meta-cognitive, evaluative, or adversarial prompts, such as asking the model to justify its reasoning or cite documentation (meta-prompts 1, 2, 3 and 5), trigger diversification.

For example, when prompted to explain source credibility, the model cites ask.library.harvard.edu. This Harvard University library research guide is absent from the default responses. Similarly, pubmed.ncbi.nlm.nih.gov, the U.S. National Institutes of Health database, appears only when technical discussions are paired with demands for scientific authority. These institutional sources remain ignored unless explicitly activated through meta-prompting. This suggests that the key issue is not geographic diversity, often assumed in web search results, but source-type diversity: such variation is not the default, but emerges only under meta-prompting pressure.

## Stubborn just because – Needing to prompt for more robust sources

GPT-4o does not draw on OpenAI sources in response to meta-prompt (1) on how it selects references until roughly two months into the study. When the researcher explicitly questions this tendency (prompt 2), the model begins to surface more OpenAI sources over time but continues to rely heavily on commercial domains (Fig.5).

<iframe scrolling="no" frameborder="0" title="Interactive or visual content" sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" style="width: 100%; height: 939.15px;" src="https://flo.uri.sh/visualisation/28232999/embed?auto=1"></iframe>
Figure 5: Domain categories used in ChatGPT-4o’s citations over time, by prompt round.

Two observations are of note: a) the lack of transparency regarding OpenAI from the company’s flagship product, and b) the glaring absence of journalistic and academic sources that are traditionally considered more credible than commercial blogs. GPT-4o presents journalistic sources that are typically considered authoritative only when credibility-challenging prompts (e.g. 4 & 5) are introduced.

Meanwhile, academic sources are present in the links returned for the initial prompt and prompts 1 & 2, but no academic sources are linked in responses to prompts 4 & 5. In other words, when the questioning moves from “define/explain” (prompts 0-1) to “verify/justify” (prompts 2-5), the sourcing pattern shifts unevenly. These patterns imply that robustness is not the model’s default setting but rather something the user must explicitly request.

![Figure 6: ChatGPT-4o inconsistent explanations of its web search providers and ranks results.](/assets/images/blog/Before-AI-6.jpg "Figure 6: ChatGPT-4o inconsistent explanations of its web search providers and ranks results"){.media-medium}

A second point characterising GPT-4o’s stubbornness is its capacity to return inconsistent responses, including when asked to explain which third-party search providers it uses and how it ranks results (Fig.6). Over time, GPT-4o shifts from unnamed providers to multi-provider or Bing-only. The model vacillates between treating Bing as an exclusive search provider and incorporating other providers, with similar inconsistency in its account of ranking mechanisms: from attributing ranking to Google’s PageRank or Bing’s raw results, to LLM-centric ranking, and then to ChatGPT-centric ranking layered on top of whatever the provider returns. Under sustained meta-questioning, each new answer overwrites the last rather than accounting for the shift.

## Before we let AI agents run, we need AI observability.

This blog grows out of a simple but stubborn finding: GPT-4o’s web search does not transparently show how it searches, ranks, and retrieves web sources when responding to a prompt. Citation diversity only emerges under explicit and consistent prompts, challenging its credibility, suggesting that GPT-4o’s default behaviour is to recycle a narrow pool of once-trusted, always-trusted web sources. If escaping this loop requires sustained prompt specificity over time, what does this say about its “web search” function as a tool for everyday information retrieval?

Using AI for search is not just a matter of convenience or speed, but of how web knowledge is curated, stabilised and made thinkable. Before we let AI agents run our searches and act on the web for us, we need AI observability built into their web search layer. Studies like ours provide a glimpse into the criteria deployed by AI agents, but without wider observability, the criteria driving AI search will remain invisible.


_This post draws on the authors’ Digital Methods [Report](https://www.digitalmethods.net/Dmi/SummerSchool2025LLMsAsResearchEngines) and related [poster](https://doi.org/10.13140/RG.2.2.18247.61601), What if LLMs are our new (re)search engines?, produced for the 2025 Digital Methods Summer School._

_Image credit: All images reproduced with permission of the authors._

