import { test, expect } from "@playwright/test";

test.describe("Test an organisation page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/about/partners-and-funders/ddh/");

		const h1 = page.locator("h1");
		await expect(h1).not.toBeEmpty();
		await expect(h1.getByText("Department of Digital Humanities")).toBeVisible();

		// TODO: need to change expectations as orgs have changed in projects
		// for (const target of ["#partner", "#funded", ".sibling-pagination"]) {
		// 	const block = page.locator(target);
		// 	await expect(block).toBeAttached();
		// 	const items = block.locator("li");
		// 	expect(await items.count()).toBeGreaterThan(0);
		// 	const firstLink = items.first().locator("a").first();
		// 	await expect(firstLink).not.toBeEmpty();
		// 	expect(await firstLink.getAttribute("href")).toBeTruthy();
		// }
	});
});
