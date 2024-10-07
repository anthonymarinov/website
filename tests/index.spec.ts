import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("meta is correct", async ({ page }) => {
  await expect(page).toHaveTitle("Anthony Marinov");
});

test("main heading is correct", async ({ page }) => {
  const mainHeadingSelector = "h1";
  await expect(page.locator(mainHeadingSelector)).toHaveText(
    "hey, i'm anthony 😃"
  );
});

test("should have correct external links", async ({ page }) => {
  const links = [
    { href: "https://linkedin.com/in/anthony-marinov", text: "linkedin" },
    { href: "/resume.v2.1-anthony-marinov.pdf", text: "resume" },
    { href: "https://github.com/anthonymarinov", text: "github" },
    { href: "mailto:anthonymmarinov@gmail.com", text: "email" },
  ];

  for (const link of links) {
    const externalLink = page.locator(`a[href="${link.href}"]`);
    await expect(externalLink).toHaveText(link.text);
  }
});

test("should render Badge components correctly", async ({ page }) => {
  const badges = [
    { href: "https://ucsd.edu", text: "University of California, San Diego" },
    { href: "https://www.mitek-us.com", text: "MiTek"},
  ];

  for (const badge of badges) {
    const badgeElement = page.locator(`a[href="${badge.href}"] span.no-prose`);
    await expect(badgeElement).toHaveText(badge.text);
  }
});
