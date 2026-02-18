#!/usr/bin/env node

const Scraper = require("./scraper");
require("dotenv").config();

const { Command } = require("commander");
const pkg = require("../package.json");

async function cli() {
	const program = new Command();

	program
		.name(pkg.name)
		.description(pkg.description)
		.usage("<command> [options]")
		.version(pkg.version, "-v, --version");

	const scrapeCommand = program
		.command("scrape")
		.description("Scrape content from the current web site");

	scrapeCommand
		.command("blog")
		.argument("<path>", "Path to save the blog posts")
		.action((path) => {
			const scraper = new Scraper("https://kdl.kcl.ac.uk/blog", path);
			scraper
				.scrape("*", "blog", scraper.getBlogData)
				.then(() => console.info("Blog scraping done"))
				.catch((err) => console.error(err));
		});

	scrapeCommand
		.command("faqs")
		.argument("<path>", "Path to save the faqs")
		.action((path) => {
			const scraper = new Scraper("https://kdl.kcl.ac.uk/how-we-work", path);
			scraper
				.scrape("faq-partners", "resources", scraper.getFaqData)
				.then(() => console.info("FAQs scraping done"))
				.catch((err) => console.error(err));
		});

	return program;
}

cli()
	.then((program) => program.parseAsync(process.argv))
	.catch((err) => {
		console.error(err.message);
		process.exit(1);
	});
