import { test, expect } from "@playwright/test";

test.describe("Test the home page", () => {
	test("Visits, gets and asserts", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator("video")).toBeAttached();
		await expect(page.locator(".hero-content")).toBeVisible();

		const scrollLink = page.locator("a.scroll").first();
		await scrollLink.evaluate((el) => el.click());
		await expect(page).toHaveURL(/#explore/);

		await expect(page.getByText("Featured projects")).toBeVisible();
		await expect(page.getByText("Browse all projects")).toBeVisible();
		await expect(page.locator("div.project")).toHaveCount(9);

		await page.locator(".blog").scrollIntoViewIfNeeded();
		await expect(page.getByText("Latest blog posts")).toBeVisible();
		await expect(page.getByText("Browse all posts")).toBeVisible();
		await expect(page.locator("div.post")).toHaveCount(3);

		await page.locator(".discover").scrollIntoViewIfNeeded();
		await expect(page.getByText("Activities")).toBeVisible();
		await expect(page.locator("div.activities-block")).toHaveCount(3);
		await expect(page.getByText("Research themes")).toBeVisible();
		await expect(page.locator("div.research-block")).toHaveCount(4);

		await page.locator(".contact").scrollIntoViewIfNeeded();
		await page.getByRole("button", { name: "Contact us" }).click();
		await expect(page).toHaveURL(/\/contact-us/);
		await page.goBack();

		await page.locator("section.contact").getByText("Frequently Asked Questions").click();
		await expect(page).toHaveURL(/\/faqs/);
		await page.goBack();

		await page.locator(".connect").scrollIntoViewIfNeeded();
		await expect(page.locator(".connect li")).toHaveCount(5);

		await page.evaluate(() => window.scrollTo(0, 0));
	});
});
