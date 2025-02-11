module.exports = {
  layout: "layouts/person.njk",
  breadcrumb: "People",
  navKey: "People",
  eleventyComputed: {
    id: (data) => data.name,
    index: (data) => data.title[0].toLowerCase(),
    name: (data) => data.title,
    permalink: ({ page }) => {
      if (page.fileSlug === "index" || page.fileSlug === "people") {
        return `/about/people/`;
      }
      return `/about/people/${page.fileSlug}/`;
    },
  },
};
