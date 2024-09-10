---
title: iREAL Workshop 2
event:
  title: iREAL Workshop 2
  url:
tags:
  - ireal
  - slides
slide:
  loop: true
  theme: light
  slideNumber: true
draft: false
---

{% slide %}

## Inclusive Requirements Elicitation

### AI in Libraries to Support Respectful Management of Indigenous Knowledges

Samantha Callaghan, Arianna Ciula, Tiffany Ong, Miguel Vieira

{% endslide %}

{% slide %}

## Context for Requirements Elicitation

- iREAL: Indigenous data considerations
- User research (to be re-integrated)
- Workshop dashboard constraints
  - Models and data
- Today's focus:
  - Identify use cases and requirements

{% endslide %}

{% slide %}

## Requirements

- What is a requirement?
- Purpose: How does it fit project/user needs?
- Definition: How do we specify them?
- Prioritisation: How do we rank importance?

{% endslide %}

{% slide %}

## MoSCoW Prioritisation

- **M**ust have
- **S**hould have
- **C**ould have
- **W**on't have this time
  - Defines out-of-scope items
  - Potential for future phases

{% endslide %}

{% slide %}

## MoSCoW Prioritisation

<img src="/assets/images/slides/moscow.png" height="500" alt="MoSCow prioritisation diagram" title="MoSCoW prioritisation" style="width: unset;" />

{% endslide %}

{% slide %}

## System Architecture

1. **Data collection**: NSW Aboriginal school records (1876-1979)
1. **Data preparation**: Conversion to JSON and Markdown
1. **Data extraction**: AI/ML models for metadata extraction
1. **Dashboard**: SvelteKit frontend

<aside class="notes">

- This slide provides an overview of our entire system.
- Data collection: We're working with historical records spanning over a century,
  giving us a rich dataset to explore.
- Data preparation: This crucial step prepares the raw data for analysis, making
  it easier for our systems to work with.
- Data extraction: We use AI and ML models to automatically identify and collect
  important information from the documents.
- Dashboard: This is where you'll be able to explore the information we've
  gathered, designed to be easy to use.
- Our key technologies include AI for identifying important details, tools to
  put historical places on a map, and advanced systems that can understand the
  main themes and topics in the documents.

</aside>

{% endslide %}

{% slide %}

## Data Preparation

1. Original documents converted to:

   - JSON (for data extraction)
   - Markdown (for frontend rendering)

1. Each record divided into smaller, manageable sections
1. Each section is processed for data extraction

<aside class="notes">

- This slide explains how we prepare the historical documents for analysis.
- We start by converting the original documents into formats that computers can
  easily work with. Think of it like translating the documents into a language
  our systems understand.
- Next, we divide long documents into smaller sections. This is similar to how
  a book is divided into chapters.
- Imagine trying to quickly find information in a 500-page book versus a 20-page
  chapter. The smaller sections make it easier and faster for our system to work
  with the information.
- This approach helps us process the information more quickly, get more accurate
  results, and makes it easier to show you the most relevant information when
  you're using the dashboard.

</aside>

{% endslide %}

{% slide %}

## Data Extraction

1. **NER**: SpanMarker model
1. **Geocoding**: Custom transformer
1. **Keywords**: LLM (Mistral 7B) with custom prompt for 5 keywords per text chunk
1. **Topics**: LLM with custom prompt for overarching themes

<aside class="notes">

- This slide covers how we use AI to extract meaningful information from the
  prepared documents.
- We use models recognize and pick out important details like names of people,
  places, and organisations, as well as significant dates and events.
- We also use large language models to identify the main themes and topics of
  each document.
- The extracted place names are matched against an authority list of NSW places.
  This list provides us with the exact geographical coordinates, allowing us to
  show these places on maps.
- All of this extracted information is what populates the dashboard you'll be
  using to explore the historical records.
- This process turns raw historical documents into a rich, interactive resource
  for research and discovery.

</aside>

{% endslide %}

{% slide %}

## Links

- [Dashboard](https://i-real.vercel.app)
- [Miro board](https://miro.com/app/board/uXjVKrW8_Kw=/)
- [GitHub repository (private for now)](https://github.com/kingsdigitallab/iREAL)

{% endslide %}

{% slide %}

## Thank you

[`samantha.callaghan@kcl.ac.uk`](mailto:samantha.callaghan@kcl.ac.uk)

{% endslide %}
