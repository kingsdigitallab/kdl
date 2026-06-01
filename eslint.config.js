const js = require("@eslint/js");
const cypress = require("eslint-plugin-cypress");
const babelParser = require("@babel/eslint-parser");
const globals = require("globals");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
	{
		ignores: ["frontend/public/sla-acpp"],
	},
	js.configs.recommended,
	{
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
			},
			globals: {
				...globals.es2021,
				...globals.node,
				...globals.jest,
			},
		},
	},
	{
		files: ["cypress/**/*.js"],
		...cypress.configs.recommended,
	},
	prettierConfig,
];
