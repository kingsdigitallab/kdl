import { defineConfig } from "@playwright/test";

export default defineConfig({
	projects: [
		{
			name: "firefox",
			use: {
				browserName: "firefox",
			},
		},
	],
	webServer: { command: "pnpm run dev", port: 8080, reuseExistingServer: true },
	testMatch: "**/*.e2e.{ts,js}",
});
