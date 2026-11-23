import js from "@eslint/js";
import ts from "typescript-eslint";
// const babelParser = require("@babel/eslint-parser");
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export const config = defineConfig(
	{
		ignores: ["frontend/public/sla-acpp"],
	},
	js.configs.recommended,
	ts.configs.recommended,
	{
		languageOptions: {
			// parser: babelParser,
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
	prettierConfig,
);
