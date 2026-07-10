#!/usr/bin/env node
const fs = require("fs/promises");
const path = require("path");
const YAML = require("yaml");
const prettier = require("prettier");

const ROOT = path.resolve(__dirname, "../../frontend/src");
const PROJECTS_DIR = path.join(ROOT, "projects");
const PEOPLE_DIR = path.join(ROOT, "about/people");
const PEOPLE_JSON = path.join(ROOT, "_data/people.json");

async function readYamlFrontmatter(filePath) {
	const content = await fs.readFile(filePath, "utf8");
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return null;
	return YAML.parse(match[1]);
}

async function main() {
	const allMembers = {};

	const projectFiles = (await fs.readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".md"));

	for (const file of projectFiles) {
		const frontmatter = await readYamlFrontmatter(path.join(PROJECTS_DIR, file));
		if (!frontmatter) continue;

		const members = frontmatter.members || [];
		if (!members.length) continue;

		const projectMeta = {
			name: frontmatter.name || frontmatter.title,
			alternateName: frontmatter.alternateName || null,
			slug: frontmatter.slug,
			foundingDate: frontmatter.foundingDate || null,
			dissolutionDate: frontmatter.dissolutionDate || null,
			departments: frontmatter.departments || [],
		};

		for (const member of members) {
			const slug = member.slug;
			if (!slug) continue;

			if (!allMembers[slug]) {
				allMembers[slug] = { name: (member.name || "").trim(), projects: [] };
			}

			allMembers[slug].projects.push({
				project: projectMeta,
				member: {
					roleName: member.roleName,
					inOrganisation: member.inOrganisation || null,
				},
			});
		}
	}

	const existingSlugs = new Set();
	for (const file of await fs.readdir(PEOPLE_DIR)) {
		if (file.endsWith(".md")) existingSlugs.add(file.replace(/\.md$/, ""));
	}

	const peopleJson = JSON.parse(await fs.readFile(PEOPLE_JSON, "utf8"));
	const existingJsonSlugs = new Set(peopleJson.map((p) => p.agent.slug));

	const allowlistPath = process.argv[2];
	let allowlist = null;
	if (allowlistPath) {
		const content = await fs.readFile(allowlistPath, "utf8");
		allowlist = new Set(
			content
				.split("\n")
				.map((l) => l.trim())
				.filter(Boolean),
		);
	}

	const missingSlugs = Object.keys(allMembers)
		.filter((slug) => !existingSlugs.has(slug))
		.filter((slug) => !allowlist || allowlist.has(slug))
		.sort();

	if (!missingSlugs.length) {
		console.log("No missing people found.");
		return;
	}

	console.log(`Found ${missingSlugs.length} missing people:\n`);

	for (const slug of missingSlugs) {
		const person = allMembers[slug];

		const seen = new Set();
		const memberOf = [];
		for (const p of person.projects) {
			const org = p.member.inOrganisation
				? { name: p.member.inOrganisation.name, slug: p.member.inOrganisation.slug }
				: { name: "King's Digital Lab", slug: "kdl" };

			const key = `${org.slug}|${p.member.roleName}`;
			if (!seen.has(key)) {
				seen.add(key);
				memberOf.push({
					startDate: null,
					endDate: null,
					organisation: org,
					roleName: p.member.roleName,
				});
			}
		}

		const mdFrontmatter = {
			title: person.name,
			slug: slug,
			jobTitle: null,
			tags: ["people"],
			memberOf,
		};

		const mdContent = ["---", YAML.stringify(mdFrontmatter).trim(), "---", ""].join("\n");
		const formatted = await prettier.format(mdContent, { parser: "markdown" });
		await fs.writeFile(path.join(PEOPLE_DIR, `${slug}.md`), formatted);

		if (!existingJsonSlugs.has(slug)) {
			const jsonEntry = {
				jobTitle: null,
				agent: {
					name: person.name,
					slug: slug,
					description: null,
					memberOf: person.projects.map((p) => {
						const org = p.member.inOrganisation
							? { agent: { name: p.member.inOrganisation.name, slug: p.member.inOrganisation.slug } }
							: { agent: { name: "King's Digital Lab", slug: "kdl" } };

						return {
							startDate: null,
							endDate: null,
							inProject: {
								name: p.project.name,
								alternateName: p.project.alternateName,
								slug: p.project.slug,
								foundingDate: p.project.foundingDate,
								dissolutionDate: p.project.dissolutionDate,
								department: p.project.departments.map((d) => ({
									organisation_id: {
										agent: {
											name: d.name,
										},
									},
								})),
							},
							inOrganisation: org,
							roleName: { name: p.member.roleName },
						};
					}),
				},
			};

			peopleJson.push(jsonEntry);
		}

		console.log(`  ${person.name} (${slug})`);
	}

	peopleJson.sort((a, b) => a.agent.name.localeCompare(b.agent.name));

	const formattedJson = await prettier.format(JSON.stringify(peopleJson), { parser: "json" });
	await fs.writeFile(PEOPLE_JSON, formattedJson);

	console.log(`\nDone. Generated ${missingSlugs.length} profiles.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
