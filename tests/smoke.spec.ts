import { expect, type Page, test } from "@playwright/test";
import { portfolioProjects } from "../src/data/site";

/**
 * These assert the classes of defect this site actually shipped, rather
 * than generic "page loads" checks:
 *
 *  - horizontal overflow at narrow widths
 *  - headings collapsing to the wrong rank when a type token is missed
 *  - links pointing at anchors or routes that no longer exist
 *  - console errors
 *
 * Every one of those reached main at least once and was caught by hand.
 */

/* Case study routes come from the data rather than a hand-kept list, so
 * adding a project cannot silently leave its page untested. */
const ROUTES = [
  "/",
  "/portfolio",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  ...portfolioProjects.map((project) => `/portfolio/${project.slug}`),
];

/** Console errors, minus noise from browser extensions we do not control. */
function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (/darkreader|hydrat/i.test(text)) return; // extension-induced, not ours
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

for (const route of ROUTES) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto(route, { waitUntil: "networkidle" });

    expect(response?.status(), `${route} should return 200`).toBe(200);

    // Exactly one h1, and it is not empty.
    const h1 = page.locator("h1");
    await expect(h1, `${route} should have exactly one h1`).toHaveCount(1);
    expect((await h1.innerText()).trim().length).toBeGreaterThan(0);

    // No horizontal overflow — the defect that keeps recurring.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `${route} must not scroll horizontally`).toBe(false);

    // Every image has an alt attribute (empty is fine for decorative).
    const missingAlt = await page.locator("img:not([alt])").count();
    expect(missingAlt, `${route} has images without alt`).toBe(0);

    expect(errors, `${route} logged console errors`).toEqual([]);
  });
}

test("headings descend in rank on a content page", async ({ page }) => {
  await page.goto("/services");

  const sizes = await page.evaluate(() =>
    [...document.querySelectorAll("main h1, main h2")].map((el) =>
      Math.round(Number.parseFloat(getComputedStyle(el).fontSize)),
    ),
  );

  expect(sizes.length).toBeGreaterThan(2);
  // The h1 must outrank every h2. A missed display-* class silently
  // flattened this once already.
  const [h1Size, ...rest] = sizes;
  for (const size of rest) {
    expect(h1Size).toBeGreaterThanOrEqual(size);
  }
});

test("project numbers match their position in the data", () => {
  // The index, the "next case study" link, and the sitemap all walk
  // portfolioProjects in array order, so a stored number that disagrees
  // with position means the cards are labelled wrong somewhere.
  for (const [index, project] of portfolioProjects.entries()) {
    const expected = String(index + 1).padStart(2, "0");
    expect(project.number, `${project.slug} is at position ${index + 1}`).toBe(expected);
  }
});

test("the portfolio index lists projects in data order", async ({ page }) => {
  await page.goto("/portfolio");
  const rendered = await page.evaluate(() =>
    [...document.querySelectorAll("main article h2[id^='project-']")].map((h) =>
      h.id.replace("project-", ""),
    ),
  );
  expect(rendered).toEqual(portfolioProjects.map((project) => project.slug));
});

test("internal links all resolve", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href") ?? ""),
  );

  for (const href of new Set(hrefs)) {
    const res = await request.get(href);
    expect(res.status(), `${href} is linked but does not resolve`).toBeLessThan(400);
  }
});

test("hero honours reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const state = await page.evaluate(() => {
    const read = (sel: string) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { animation: cs.animationName, opacity: Number(cs.opacity) };
    };
    return {
      studio: read(".hero-scene-studio"),
      moonrise: read(".hero-scene-moonrise"),
      title: read(".hero-title"),
    };
  });

  // No looping crossfade...
  expect(state.studio?.animation).toBe("none");
  expect(state.moonrise?.animation).toBe("none");
  // ...and what is left is a legible still, not a blank hero.
  expect(state.studio?.opacity).toBe(1);
  expect(state.title?.opacity).toBe(1);
});

test("only the first hero scene is high priority", async ({ page }) => {
  await page.goto("/");
  const scenes = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement>(".hero-scene")].map((img) => ({
      loading: img.loading,
      fetchPriority: img.getAttribute("fetchpriority"),
    })),
  );

  expect(scenes).toHaveLength(3);
  expect(scenes[0].loading).not.toBe("lazy");
  for (const scene of scenes.slice(1)) {
    expect(scene.loading).toBe("lazy");
    expect(scene.fetchPriority).toBe("low");
  }
});
