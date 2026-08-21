import { expect, type Page, test } from "@playwright/test";
import { portfolioProjects, site } from "../src/data/site";

async function metaContent(page: Page, selector: string) {
  return page.locator(selector).getAttribute("content");
}

test("homepage h1 keeps spaces between its visual lines", async ({ page }) => {
  await page.goto("/");

  expect(await page.locator("h1").textContent()).toBe("Products from interface to infrastructure.");
});

test("legal pages use the branded social image", async ({ page }) => {
  for (const route of ["/privacy", "/terms"]) {
    await page.goto(route);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const content = await metaContent(page, selector);
      expect(content, `${route} should emit ${selector}`).not.toBeNull();

      const imageUrl = new URL(content ?? "");
      expect(imageUrl.origin).toBe(site.defaultUrl);
      expect(imageUrl.pathname).toBe("/opengraph-image");
    }
  }
});

test("404 metadata does not reuse homepage social metadata", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-real-page");

  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Page Not Found",
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    "Page Not Found",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);
});

test("case-study schema relates the case study to its subject without sameAs", async ({ page }) => {
  for (const project of portfolioProjects) {
    await page.goto(`/portfolio/${project.slug}`);

    const rawStructuredData = await page.locator("#case-study-structured-data").textContent();
    expect(rawStructuredData).not.toBeNull();

    const structuredData = JSON.parse(rawStructuredData ?? "{}") as {
      "@type"?: string;
      sameAs?: string;
      about?: { "@type"?: string; name?: string; url?: string };
    };

    expect(structuredData["@type"]).toBe("CreativeWork");
    expect(structuredData.sameAs).toBeUndefined();
    expect(structuredData.about).toEqual({
      "@type": "WebSite",
      name: project.title,
      url: project.url,
    });
  }
});

test("generated branded share cards remain available", async ({ request }) => {
  for (const route of ["/opengraph-image", "/portfolio/opengraph-image"]) {
    const response = await request.get(route);
    expect(response.status(), `${route} should render`).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    expect((await response.body()).byteLength).toBeGreaterThan(100_000);
  }
});
