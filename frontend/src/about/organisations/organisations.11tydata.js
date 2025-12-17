module.exports = {
  layout: "layouts/organisation.njk",
  breadcrumb: "Partners and funders",
  navKey: "Partners and funders",
  eleventyComputed: {
    index: (data) => data.title[0].toLowerCase(),
    name: (data) => data.title,
    permalink: ({ page }) => {
      if (page.fileSlug === "index" || page.fileSlug === "organisations") {
        return `/about/partners-and-funders/`;
      }
      return `/about/partners-and-funders/${page.fileSlug}/`;
    },
  },
};
