---
title: "État Civil: French expatriates in Ottoman Egypt"
name: "État Civil: French expatriates in Ottoman Egypt"
tags:
  - projects
alternateName: ""
slug: etat-civil
foundingDate: 2019-11-26
dissolutionDate: 2020-07-02
creativeWorkStatus: Maintained
feature:
  image: /assets/images/projects/etat-civil.png
  title: Screenshot of one of the project interactive map visualisations with
    trajectories of French expatriates in Egypt (1792-1882) created using
    Flowmap to display 15,962 journeys inferred from 10,001 deeds in consular
    civil registers.
  description: A geographic map showcasing cartographic graphical elements
  width: 1776
  height: 588
funders:
  - name: FAH Department of History
    slug: fah-department-of-history
  - name: Harvard and Cambridge Universities Joint Center for History and Economics
    slug: harvard-and-cambridge-universities-joint-center-for-history-and-economics
departments:
  - name: FAH Department of History
    slug: fah-department-of-history
members:
  - name: Arianna Ciula
    slug: arianna-ciula
    roleName: Research Software Analyst
    inOrganisation: null
  - name: David Todd
    slug: david-todd
    roleName: Principal investigator
    inOrganisation: null
  - name: Miguel Vieira
    slug: miguel-vieira
    roleName: Research Software Engineer
    inOrganisation: null
keywords:
  - Data Visualisation
urls:
  - name: Project URL
    url: https://histecon.fas.harvard.edu/visualizing/egypt/index.html
  - name: "Repository: kingsdigitallab/etat-civil-django"
    url: https://github.com/kingsdigitallab/etat-civil-django
  - name: Models
    url: https://etat-civil-django.readthedocs.io/en/latest/technical-overview.html
  - name: Teaching resource
    url: https://miro.com/app/board/o9J_lRs9WpU=/?share_link_id=52435022766
---

The 'État Civil' -- standing for civil registration of births, deaths and marriages -- exploratory project processes data from the Egyptian consulate of the 'État Civil' to visualise mobility on a continental or global scale and offers insights on patterns of migration and social history.

KDL refined the data model and built the proof of concept solution for the project using Django, which provides functionality to upload the project dataset, add geographic locations to places, offer an admin/editing interface to manage the data, and export data into GeoJSON and CSV formats. The solution makes use of two existing tools to generate map visualisations: Kepler.gl and flowmap.
