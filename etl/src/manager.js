const extractUrls = require("extract-urls");
const { parse } = require("csv-parse");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");

const DATA_DIR = path.join(__dirname, "../../frontend/src/_data");

class Manager {
	constructor(activecollab) {
		this.activecollab = activecollab;
		this.slugs = {};
		this.projects = [];
		this.people = [];
		this.organisations = [];
	}

	import(filePath) {
		return new Promise((resolve, reject) => {
			this.parse(filePath)
				.then((projects) => this.prepare(projects))
				.then((projects) => this.hydrate(projects))
				.then((projects) => this.save(projects))
				.then((projects) => resolve(projects))
				.catch((err) => reject(err));
		});
	}

	parse(filePath) {
		return new Promise((resolve, reject) => {
			if (!filePath) {
				reject(new Error("No file path provided"));
			}

			const projects = [];

			const parser = parse({ columns: true, delimiter: "," });
			const readStream = fs.createReadStream(filePath);
			readStream.on("error", (err) => reject(err));

			readStream.pipe(parser);

			parser
				.on("readable", () => {
					let project;
					while ((project = parser.read()) !== null) {
						projects.push(project);
					}
				})
				.on("end", () => resolve(projects))
				.on("error", (err) => reject(err));
		});
	}

	prepare(projects) {
		return new Promise((resolve, reject) => {
			if (!projects || projects.length === 0) {
				reject(new Error("No projects provided"));
			}

			projects = projects
				.filter((project) => project["Project ID"] !== undefined)
				.filter(
					(project) => project["Add to KDL Website"].toLowerCase() === "yes",
				)
				.map((project) => ({
					activecollabId: parseInt(project["Project ID"]),
					name: project.Title,
					alternateName: project.Acronym,
					foundingDate: this.getDate(project["Project Start Date"]),
					dissolutionDate: this.getDate(project["Project End Date"]),
					description: project["Project Description"],
					pi: this.parseList(project.PI).map((pi) => this.parseMember(pi)),
					researchers: this.parseList(project["Other Project Team"]).map((r) =>
						this.parseMember(r),
					),
					funder: this.parseList(project.Funder),
					team: this.parseList(project["KDL Project Team"]),
					url: this.getURLs(project, ["Project URL", "GitHub URL", "Models"]),
				}));

			resolve(projects);
		});
	}

	getDate(string) {
		if (!string || string.length === 0) {
			return null;
		}

		return DateTime.fromFormat(string, "d/M/yyyy").toISODate();
	}

	parseList(string) {
		if (!string) {
			return [];
		}

		return string
			.split(",")
			.map((name) => name.trim().replace(/[[\]"]/g, ""))
			.filter((name) => name.length > 0);
	}

	parseMember(member) {
		if (!member) return;

		const parts = member.split("(");
		const org = parts[1] ? parts[1].replace(")", "") : "Unknown organisation";

		return { name: parts[0].trim(), org: org };
	}

	getURLs(project, columns) {
		return columns
			.map((c) => ({
				name: c,
				values: extractUrls(project[c].replaceAll("&%2358;", ":")),
			}))
			.filter((url) => url.values)
			.map((url) => ({ name: url.name, values: [...new Set(url.values)] }))
			.flatMap((url) =>
				url.values.map((value) => ({
					name: this.getURLName(url.name, value),
					url: value,
				})),
			);
	}

	getURLName(name, url) {
		if (name === "GitHub URL") {
			return `Repository: ${url.split("/").slice(3).join("/")}`;
		}

		return name;
	}

	hydrate(projects) {
		return new Promise((resolve, reject) => {
			if (!projects || projects.length === 0) {
				reject(new Error("No projects provided"));
			}

			Promise.all([this.activecollab.categories(), this.activecollab.labels()])
				.then(([categories, labels]) => {
					const promises = [];

					projects.forEach((project) =>
						promises.push(this.hydrateProject(project, categories, labels)),
					);

					return Promise.allSettled(promises);
				})
				.then((results) => {
					results
						.filter((result) => result.status === "rejected")
						.forEach((result) => {
							console.group(result.reason.config.url);
							console.error(result.reason.message);
							console.groupEnd();
						});
					resolve(
						results
							.filter((result) => result.status === "fulfilled")
							.map((result) => result.value),
					);
				})
				.catch((err) => reject(err));
		});
	}

	hydrateProject(project, categories, labels) {
		return new Promise((resolve, reject) => {
			if (!project || !categories || !labels) {
				reject(new Error("No project, categories or labels provided"));
			}

			this.activecollab
				.project(project.activecollabId)
				.then((acProject) =>
					resolve({
						...project,
						name: acProject.name,
						slug: this.getSlug(project.acronym ?? acProject.name.split(":")[0]),
						creativeWorkStatus: this.getCreativeWorkStatus(
							labels[acProject.label_id],
						),
					}),
				)
				.catch((err) => reject(err));
		});
	}

	getSlug(name) {
		if (!name) {
			return "";
		}

		let slug = slugify(name, { remove: /[#*+~.,()'"!:@]/g, lower: true });

		if (this.slugs[slug] !== undefined) {
			this.slugs[slug] += 1;
			slug = `${slug}-${this.slugs[slug]}`;
		} else {
			this.slugs[slug] = 1;
		}

		return slug;
	}

	getCreativeWorkStatus(label) {
		switch (label.toLowerCase()) {
			case "foundations":
			case "evolutionary development":
				return "Active";
			case "post-project":
				return "Maintained";
			default:
				return "Post-project";
		}
	}

	loadExistingData() {
		try {
			this.projects = JSON.parse(
				fs.readFileSync(path.join(DATA_DIR, "projects.json"), "utf8"),
			);
		} catch (e) {
			this.projects = [];
		}

		try {
			this.people = JSON.parse(
				fs.readFileSync(path.join(DATA_DIR, "people.json"), "utf8"),
			);
		} catch (e) {
			this.people = [];
		}

		try {
			this.organisations = JSON.parse(
				fs.readFileSync(path.join(DATA_DIR, "organisations.json"), "utf8"),
			);
		} catch (e) {
			this.organisations = [];
		}
	}

	async save(projects) {
		this.loadExistingData();

		const existingProjects = new Map(this.projects.map((p) => [p.slug, p]));
		const existingPeople = new Map(this.people.map((p) => [p.slug, p]));
		const existingOrgs = new Map(this.organisations.map((o) => [o.slug, o]));

		for (const project of projects) {
			const projectData = {
				id: existingProjects.get(project.slug)?.id || this.generateId(),
				name: project.name,
				slug: project.slug,
				alternateName: project.alternateName,
				foundingDate: project.foundingDate,
				dissolutionDate: project.dissolutionDate,
				description: project.description,
				creativeWorkStatus: {
					name: project.creativeWorkStatus,
					inDefinedTermSet: { name: "SDLC" },
				},
				funder: project.funder.map((f) => {
					const orgSlug = this.getSlug(f);
					if (!existingOrgs.has(orgSlug)) {
						existingOrgs.set(orgSlug, {
							id: this.generateId(),
							name: f,
							slug: orgSlug,
						});
					}
					return { agent_id: existingOrgs.get(orgSlug) };
				}),
				department: _.uniq(project.pi.map((pi) => pi.org)).map((org) => {
					const orgSlug = this.getSlug(org);
					if (!existingOrgs.has(orgSlug)) {
						existingOrgs.set(orgSlug, {
							id: this.generateId(),
							name: org,
							slug: orgSlug,
						});
					}
					return { organisation_id: existingOrgs.get(orgSlug) };
				}),
				member: [],
				url: project.url.map((url) => ({
					linkrole_id: { url: url.url, name: url.name },
				})),
			};

			project.pi.forEach((pi) => {
				const personSlug = this.getSlug(pi.name);
				if (!existingPeople.has(personSlug)) {
					existingPeople.set(personSlug, {
						id: this.generateId(),
						name: pi.name,
						slug: personSlug,
					});
				}
				projectData.member.push({
					roleName: { name: "Principal investigator" },
					agent: existingPeople.get(personSlug),
					inOrganisation: existingOrgs.get(this.getSlug(pi.org)),
				});
			});

			project.researchers.forEach((r) => {
				const personSlug = this.getSlug(r.name);
				if (!existingPeople.has(personSlug)) {
					existingPeople.set(personSlug, {
						id: this.generateId(),
						name: r.name,
						slug: personSlug,
					});
				}
				projectData.member.push({
					roleName: { name: "Researcher" },
					agent: existingPeople.get(personSlug),
					inOrganisation: existingOrgs.get(this.getSlug(r.org)),
				});
			});

			project.team.forEach((person) => {
				const personSlug = this.getSlug(person);
				if (!existingPeople.has(personSlug)) {
					existingPeople.set(personSlug, {
						id: this.generateId(),
						name: person,
						slug: personSlug,
					});
				}
				projectData.member.push({
					roleName: { name: "RSE team member" },
					agent: existingPeople.get(personSlug),
				});
			});

			existingProjects.set(project.slug, projectData);
		}

		fs.writeFileSync(
			path.join(DATA_DIR, "projects.json"),
			JSON.stringify([...existingProjects.values()], null, 2),
		);
		fs.writeFileSync(
			path.join(DATA_DIR, "people.json"),
			JSON.stringify([...existingPeople.values()], null, 2),
		);
		fs.writeFileSync(
			path.join(DATA_DIR, "organisations.json"),
			JSON.stringify([...existingOrgs.values()], null, 2),
		);

		return projects;
	}

	generateId() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
}

module.exports = Manager;
