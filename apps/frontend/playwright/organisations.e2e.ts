import { test, expect } from "@playwright/test";

test.describe("Test the projects page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/about/partners-and-funders/");

		await expect(page.locator("h1")).toHaveText(/partners & funders/i);

		const organisations = page.locator(".organisations ul > li");
		expect(await organisations.count()).toBeGreaterThan(0);

		const first = page.locator(".organisations ul > li > ol > li > a").first();
		const href = await first.getAttribute("href");
		expect(href).toBeTruthy();
	});
});
