import { test, expect } from "@playwright/test";

test.describe("Test the projects page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/projects/");

		await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

		const projects = page.locator(".projects ul > li > a");
		await expect(projects).toHaveCount(25);

		const first = page.locator(".projects ul > li > section > a").first();
		const href = await first.getAttribute("href");
		expect(href).toBeTruthy();
		await expect(first.locator("h2")).not.toBeEmpty();
		// await expect(first.locator("small")).not.toBeEmpty();
		await expect(first.locator("p")).toHaveCount(2);
	});
});
