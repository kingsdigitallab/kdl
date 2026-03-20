const baseUrl = "/";
const paths = {
	assets: `${baseUrl}assets`,
	images: `${baseUrl}assets/images`,
	placeholderImage: `${baseUrl}assets/images/general/placeholder-blur2.jpg`,
	stylesheets: `${baseUrl}assets/stylesheets`,
};

module.exports = {
	baseUrl: baseUrl,
	title: "King's Digital Lab",
	description:
		"King’s Digital Lab (KDL) is a Research Software Engineering (RSE) team in King’s College London",
	url: "https://kdl.kcl.ac.uk",
	author: "King's Digital Lab",
	twitter: "kingsdigitallab",
	feature: {
		image: `${paths.images}/kings-logo-red.svg`,
		description: "King's College London logo in red",
	},
	// SEO plugin options
	options: {
		titleDivider: "|",
		imageWithBaseUrl: true,
	},
	paths: { ...paths },
	forms: {
		newProjectIdeas:
			"https://forms.clickup.com/26475560/f/t7z18-72308/NK252MBKP2M3U8YGXU",
		reportProblem:
			"https://forms.clickup.com/26475560/f/t7z18-72288/ZIZZG9QOO8ZE1TCMQG",
		issuesComments:
			"https://forms.clickup.com/26475560/f/t7z18-74115/7YCNCR5Y6MA3KI9GX1",
	},
};
