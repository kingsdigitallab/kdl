import markdownItImplicitFigures from "markdown-it-image-figures";
import mermaidPlugin from "@kevingimbel/eleventy-plugin-mermaid";
import pluginEleventyNavigation from "@11ty/eleventy-navigation";
import kdlFilters from "kdl-components/src/kdl/filters.js";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import pluginSEO from "eleventy-plugin-seo";
import pluginTOC from "eleventy-plugin-toc";
import markdownIt from "markdown-it";
import Nunjucks from "nunjucks";
import path from "node:path";
import sass from "sass";
import dotenv from "dotenv";
import seoConfig from "./src/_data/config.js";

dotenv.config();

export default (eleventyConfig) => {
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
		"../node_modules/reveal.js/dist/plugin": "assets/reveal/plugin",
		public: "/",
	});

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginEleventyNavigation);
	eleventyConfig.addPlugin(mermaidPlugin);
	eleventyConfig.addPlugin(pluginSEO, seoConfig);
	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.setLibrary(
		"md",
		markdownIt({ html: true }).use(markdownItAnchor).use(markdownItAttrs).use(markdownItImplicitFigures, {
			figcaption: true,
			copyAttrs: "class",
		}),
	);

	eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
		return (data) => {
			if (data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		};
	});
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function () {
		return (data) => {
			if (data.draft && !process.env.BUILD_DRAFTS) {
				return true;
			}

			return data.eleventyExcludeFromCollections;
		};
	});
	eleventyConfig.on("eleventy.before", ({ runMode }) => {
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

	eleventyConfig.addFilter("featuredProjects", function (projects, status = "Active", number = 3) {
		return projects
			.filter((project) => project.data.creativeWorkStatus === status)
			.filter((project) => project.data.feature?.image)
			.sort(() => Math.random() - 0.5)
			.slice(0, number);
	});

	eleventyConfig.addFilter("fundedProjects", (projects, agentSlug) => {
		if (!projects || !agentSlug) return null;

		return projects.filter((project) => {
			return project?.data?.fundersSlugs && project.data.fundersSlugs.some((funder) => funder === agentSlug);
		});
	});

	eleventyConfig.addFilter("partnerProjects", (projects, agentSlug) => {
		if (!projects || !agentSlug) return null;

		return projects.filter((project) => {
			return (
				project?.data?.departmentsSlugs &&
				project.data.departmentsSlugs.some((department) => department === agentSlug)
			);
		});
	});

	eleventyConfig.addFilter("getAgentProjects", (projects, slug) =>
		projects
			.filter((project) => project.data.members && project.data.members.some((member) => member.slug === slug))
			.map((project) => ({
				...project,
				role: project.data.members.find((member) => member.slug === slug),
				dissolutionDate: project.data.dissolutionDate || "1970-01-01",
			})),
	);

	eleventyConfig.addFilter("getAgentOrganisations", (organisations, slug) =>
		Object.values(
			organisations
				.filter(
					(organisation) =>
						organisation.data.members && organisation.data.members.some((member) => member.slug === slug),
				)
				.reduce((acc, organisation) => {
					if (!acc[organisation.data.agent]) {
						acc[organisation.data.agent] = organisation;
					}

					return acc;
				}, {}),
		),
	);

	eleventyConfig.addFilter("getThemeProjects", function (projects, keywords = []) {
		return projects
			.filter((project) => project.data.keywords?.some((keyword) => keywords.includes(keyword.name)))
			.sort((a, b) => new Date(b.data.foundingDate) - new Date(a.data.foundingDate));
	});

	eleventyConfig.addShortcode("route", function (path, navigationKey = "") {
		let url = path;

		if (navigationKey) {
			const graph = pluginEleventyNavigation.navigation.getDependencyGraph(this.ctx.collections.all);

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

	eleventyConfig.addPairedShortcode("slide", function (content, options = "data-auto-animate") {
		return `<section class="slide" ${options.split(",")}>${content}</section>`;
	});

	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		style: "compressed",
		compile: async function (inputContent, inputPath) {
			const parsed = path.parse(inputPath);
			const result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || ".", this.config.dir.includes],
			});

			return () => {
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
