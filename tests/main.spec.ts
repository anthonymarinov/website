import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load and display main content", async ({ page }) => {
    await expect(page).toHaveTitle("Anthony Marinov");
    
    // Check hero section
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Engineer");
    
    // Check profile image loads
    const profileImage = page.locator('img[alt="Anthony Marinov"]');
    await expect(profileImage).toBeVisible();
  });

  test("should display all main sections", async ({ page }) => {
    // Articles section
    await expect(page.locator('h2:has-text("Articles")')).toBeVisible();
    
    // Experiences section
    await expect(page.locator('h2:has-text("Experiences")')).toBeVisible();
    await expect(page.locator('text=Graduate Student Researcher')).toBeVisible();
    
    // Resources section
    await expect(page.locator('h2:has-text("Resources")')).toBeVisible();
    
    // Golf section
    await expect(page.locator('h2:has-text("My Golf Progress")')).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    const seeAllArticles = page.locator('a[href="/articles"]');
    await expect(seeAllArticles).toBeVisible();
    
    await seeAllArticles.click();
    await expect(page).toHaveURL("/articles");
  });

  test("should display resource links", async ({ page }) => {
    // Check that resource links exist (they might be in resources section or footer)
    const resumeLinks = page.locator('a[href="/resume.pdf"]');
    await expect(resumeLinks.first()).toBeVisible();
    
    const portfolioLinks = page.locator('a[href="/portfolio-anthony-marinov.pdf"]');
    await expect(portfolioLinks.first()).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should have working desktop navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/");
    
    // Desktop nav should be visible
    await expect(page.locator('nav ul').first()).toBeVisible();
    
    // Logo should link to home
    const logo = page.locator('nav a[href="/"]').first();
    await expect(logo).toContainText("Anthony Marinov");
  });

  test("should have working mobile navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    
    // Hamburger menu should be visible
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toBeVisible();
    
    // Open mobile menu
    await menuToggle.click();
    await page.waitForTimeout(200);
    
    // Menu should be visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toHaveClass(/hidden/);
    
    // Close menu
    const menuClose = page.locator('#menu-close');
    await menuClose.click();
    await page.waitForTimeout(200);
    
    await expect(mobileMenu).toHaveClass(/hidden/);
  });
});

test.describe("Articles", () => {
  test("should display articles index page", async ({ page }) => {
    await page.goto("/articles");
    
    await expect(page.locator('h1:has-text("Articles")')).toBeVisible();
    await expect(page.locator('text=Thoughts on engineering, software, and finance')).toBeVisible();
    
    // Should have article previews
    const articleLinks = page.locator('a[href*="/articles/"]');
    await expect(articleLinks.first()).toBeVisible();
  });

  test("should navigate between articles pages", async ({ page }) => {
    await page.goto("/");
    
    // Click article preview
    await page.locator('a[href*="/articles/"]').first().click();
    await expect(page).toHaveURL(/\/articles\//);
  });
});

test.describe("Footer", () => {
  test("should display footer with links", async ({ page }) => {
    await page.goto("/");
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Copyright
    const currentYear = new Date().getFullYear();
    await expect(footer.locator(`text=© ${currentYear} Anthony Marinov`)).toBeVisible();
    
    // Social links
    await expect(footer.locator('a[href="https://linkedin.com/in/anthony-marinov"]')).toBeVisible();
    await expect(footer.locator('a[href="https://github.com/anthonymarinov"]')).toBeVisible();
    await expect(footer.locator('a[href="mailto:anthonymmarinov@gmail.com"]')).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    
    // Main content should be visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img[alt="Anthony Marinov"]')).toBeVisible();
    
    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("should work on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test("should work on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav ul')).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("should have proper document structure", async ({ page }) => {
    await page.goto("/");
    
    // Should have lang attribute
    const html = page.locator('html');
    await expect(html).toHaveAttribute("lang", "en");
    
    // Should have main landmarks
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test("should have alt text on images", async ({ page }) => {
    await page.goto("/");
    
    const images = await page.locator('img').all();
    for (const image of images) {
      const isVisible = await image.isVisible();
      if (isVisible) {
        const alt = await image.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    }
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/");
    
    // Tab through navigation
    await page.keyboard.press("Tab");
    let focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toBeTruthy();
  });
});

test.describe("Performance", () => {
  test("should load homepage quickly", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/", { waitUntil: "load" });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
  });

  test("should not have broken images", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState('networkidle');
    
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0).length;
    });
    
    expect(brokenImages).toBe(0);
  });
});
