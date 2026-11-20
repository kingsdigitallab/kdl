import { test, expect } from "@playwright/test";

test.describe("Test an organisation page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/about/people/arianna-ciula/");

		const h1 = page.locator("h1");
		await expect(h1).not.toBeEmpty();
		await expect(h1.getByText("Arianna Ciula")).toBeVisible();
		await expect(page.locator(".description")).not.toBeEmpty();

		for (const target of [".part-of", ".sibling-pagination"]) {
			const block = page.locator(target).first();
			const items = block.locator("li");
			expect(await items.count()).toBeGreaterThan(0);
			const firstLink = items.first().locator("a").first();
			await expect(firstLink).not.toBeEmpty();
			expect(await firstLink.getAttribute("href")).toBeTruthy();
		}
	});
});
