import { test, expect } from "@playwright/test";

test.describe("Test the projects page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/about/people/");

		await expect(page.getByRole("heading", { name: "People" })).toBeVisible();

		const people = page.locator(".people ul > li");
		expect(await people.count()).toBeGreaterThan(0);

		const first = page.locator(".people ul > li > ol > li > a").first();
		const href = await first.getAttribute("href");
		expect(href).toBeTruthy();
	});
});
