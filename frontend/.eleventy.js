const markdownItImplicitFigures = require("markdown-it-image-figures");
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const kdlFilters = require("kdl-components/src/kdl/filters");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const pluginSEO = require("eleventy-plugin-seo");
const pluginTOC = require("eleventy-plugin-toc");
const { Directus } = require("@directus/sdk");
const markdownIt = require("markdown-it");
const Nunjucks = require("nunjucks");
const path = require("node:path");
const sass = require("sass");

require("dotenv").config();

function getDirectus() {
  return new Directus(process.env.DIRECTUS_URL);
}

module.exports = (eleventyConfig) => {
  const kdlComponentsPath = "../node_modules/kdl-components/src";
  const nunjucksEnvironment = new Nunjucks.Environment([
    new Nunjucks.FileSystemLoader(kdlComponentsPath),
    new Nunjucks.FileSystemLoader("./src/_includes"),
  ]);
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  eleventyConfig.addWatchTarget(kdlComponentsPath);

  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
  eleventyConfig.addPassthroughCopy({
    [`${kdlComponentsPath}/kdl/assets`]: "/assets",
    "../node_modules/reveal.js/dist": "assets/reveal/",
    "../node_modules/reveal.js/plugin": "assets/reveal/plugin",
    public: "/",
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginEleventyNavigation);
  eleventyConfig.addPlugin(pluginMermaid);
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/config.js"));
  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true })
      .use(markdownItAnchor)
      .use(markdownItAttrs)
      .use(markdownItImplicitFigures, {
        figcaption: true,
        copyAttrs: "class",
      })
  );

  // TODO: remove this once we no longer need to use the Directus API
  eleventyConfig.addGlobalData("directus", getDirectus);
  eleventyConfig.addCollection("projectsByDate", function (collectionApi) {
    return [...collectionApi.getFilteredByTag("projects")].sort((a, b) => {
      const dateDescending = (field, a, b) => {
        if (a.data[field] && b.data[field]) {
          return new Date(b.data[field]) - new Date(a.data[field]);
        } else if (a.data[field]) {
          return -1;
        } else if (b.data[field]) {
          return 1;
        }

        return 0;
      };

      const compareDissolution = dateDescending("dissolutionDate", a, b);
      const compareFounding = dateDescending("foundingDate", a, b);

      return (
        compareDissolution ||
        compareFounding ||
        a.data.title.localeCompare(b.data.title)
      );
    });
  });

  // Draft posts https://www.11ty.dev/docs/quicktips/draft-posts/
  // When `permalink` is false, the file is not written to disk
  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return (data) => {
      // Always skip during non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }

      return data.permalink;
    };
  });
  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
  eleventyConfig.addGlobalData(
    "eleventyComputed.eleventyExcludeFromCollections",
    function () {
      return (data) => {
        // Always exclude from non-watch/serve builds
        if (data.draft && !process.env.BUILD_DRAFTS) {
          return true;
        }

        return data.eleventyExcludeFromCollections;
      };
    }
  );
  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    // Set the environment variable
    if (runMode === "serve" || runMode === "watch") {
      process.env.BUILD_DRAFTS = true;
    }
  });

  eleventyConfig.addFilter("toLocaleDate", kdlFilters.toLocaleDate);
  eleventyConfig.addFilter("filter", kdlFilters.filter);
  eleventyConfig.addFilter("renderMd", kdlFilters.renderMd);

  eleventyConfig.addFilter("asToc", (content, tags = ["h2", "h3", "h4"]) => {
    const tocFilter = eleventyConfig.getFilter("toc");

    const toc = tocFilter(content, { tags });
    if (toc) {
      const items = toc.split("<li>");

      if (items.length > 2) {
        return toc;
      }
    }

    return undefined;
  });

  eleventyConfig.addFilter("featuredPosts", function (posts, number = 3) {
    return posts.reverse().slice(0, number);
  });

  eleventyConfig.addFilter(
    "featuredProjects",
    function (projects, status = "Active", number = 3) {
      return (
        projects
          .filter((project) => project.data.creativeWorkStatus === status)
          .filter((project) => project.data.feature?.image)
          // .filter((project) => project.content && project.content.length > 0)
          .sort(() => Math.random() - 0.5)
          .slice(0, number)
      );
    }
  );

  eleventyConfig.addFilter("fundedProjects", (projects, agentSlug) => {
    if (!projects || !agentSlug) return null;

    return projects.filter((project) => {
      return (
        project?.data?.fundersSlugs &&
        project.data.fundersSlugs.some((funder) => funder === agentSlug)
      );
    });
  });

  eleventyConfig.addFilter("partnerProjects", (projects, agentSlug) => {
    if (!projects || !agentSlug) return null;

    return projects.filter((project) => {
      return (
        project?.data?.departmentsSlugs &&
        project.data.departmentsSlugs.some(
          (department) => department === agentSlug
        )
      );
    });
  });

  eleventyConfig.addFilter("getAgentProjects", (projects, slug) =>
    projects
      .filter(
        (project) =>
          project.data.members &&
          project.data.members.some((member) => member.slug === slug)
      )
      .map((project) => ({
        ...project,
        role: project.data.members.find((member) => member.slug === slug),
        dissolutionDate: project.data.dissolutionDate || "1970-01-01",
      }))
  );

  eleventyConfig.addFilter("getAgentOrganisations", (organisations, slug) =>
    Object.values(
      organisations
        .filter(
          (organisation) =>
            organisation.data.members &&
            organisation.data.members.some((member) => member.slug === slug)
        )
        .reduce((acc, organisation) => {
          if (!acc[organisation.data.agent]) {
            acc[organisation.data.agent] = organisation;
          }

          return acc;
        }, {})
    )
  );

  eleventyConfig.addFilter(
    "getThemeProjects",
    function (projects, keywords = []) {
      return projects
        .filter((project) =>
          project.keywords?.some((keyword) =>
            keywords.includes(keyword.definedterm_id.name)
          )
        )
        .sort((project) => project.name);
    }
  );

  eleventyConfig.addShortcode("route", function (path, navigationKey = "") {
    let url = path;

    if (navigationKey) {
      const graph = pluginEleventyNavigation.navigation.getDependencyGraph(
        this.ctx.collections.all
      );

      try {
        const found = graph.getNodeData(navigationKey);
        if (found) {
          url = `${found.url}${path}`;
        }
      } catch (error) {
        console.error("Failed to get route for", navigationKey, error);
      }
    }

    return url;
  });

  eleventyConfig.addPairedShortcode(
    "slide",
    function (content, options = "data-auto-animate") {
      return `<section class="slide" ${options.split(
        ","
      )}>${content}</section>`;
    }
  );

  // https://www.11ty.dev/docs/languages/custom/#example-add-sass-support-to-eleventy
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    style: "compressed",
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      return (_) => {
        return result.css;
      };
    },
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
