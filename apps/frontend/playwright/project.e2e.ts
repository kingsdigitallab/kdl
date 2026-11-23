import { test, expect } from "@playwright/test";

test.describe("Test a project page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/projects/crossreads/");

		expect(await page.title()).toBeTruthy();
		await expect(page.locator("h1")).toContainText(/crossreads/i);

		const h1 = page.locator("h1");
		await expect(h1).not.toBeEmpty();
		// await expect(h1.locator("small")).not.toBeEmpty();

		const article = page.locator("article");

		const img = article.locator("img").first();
		expect(await img.getAttribute("alt")).toBeTruthy();
		expect(await img.getAttribute("src")).toBeTruthy();
		await expect(article.locator("figcaption")).not.toBeEmpty();

		await expect(article.locator("#overview")).not.toBeEmpty();

		const team = article.locator("#team");
		const teamItems = team.locator("li");
		expect(await teamItems.count()).toBeGreaterThan(0);
		const firstItem = teamItems.first();
		expect(await firstItem.locator("a").getAttribute("href")).toBeTruthy();
		await expect(firstItem.locator("span")).not.toBeEmpty();

		// kdl team members
		expect(await team.locator("sup").count()).toBeGreaterThan(0);

		const pagination = article.locator(".sibling-pagination");
		await expect(pagination.locator("li")).toHaveCount(2);
		expect(await pagination.locator("li").first().locator("a").getAttribute("href")).toBeTruthy();
		expect(await pagination.locator("li").last().locator("a").getAttribute("href")).toBeTruthy();

		const metadata = article.locator("#metadata");

		const statusText = (await metadata.locator(".status").innerText()) ?? "";
		expect(statusText.length).toBeGreaterThan(16);

		for (const target of ["#links", ".funder", ".date"]) {
			const block = metadata.locator(target).first();
			const items = block.locator("li");
			expect(await items.count()).toBeGreaterThan(0);
			const firstLink = items.first().locator("a").first();
			await expect(firstLink).not.toBeEmpty();
			expect(await firstLink.getAttribute("href")).toBeTruthy();
		}

		await expect(metadata.locator(".date").last()).not.toBeEmpty();
	});
});
