module.exports = {
  layout: "layouts/project.njk",
  navKey: "Projects",
  eleventyComputed: {
    departmentsSlugs: (data) => data.departments?.map((d) => d.slug) || [],
    fundersSlugs: (data) => data.funders?.map((f) => f.slug) || [],
    permalink: ({ page, pagination }) => {
      if (page.fileSlug === "index" || page.fileSlug === "projects") {
        const pageNumber =
          pagination.pageNumber > 0 ? `${pagination.pageNumber + 1}` : "";
        return `/projects/${pageNumber}/`;
      }

      return `/projects/${page.fileSlug}/`;
    },
    title: (data) =>
      `${data.title.trim()}${
        data.alternateName ? ` <small>${data.alternateName}</small>` : ""
      }`,
  },
};
