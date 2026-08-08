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

test("every image referenced in project data resolves", async ({ request }) => {
  // Screens get deleted and replaced as projects change -- three were
  // swapped out in one sitting -- and a stale path renders as a broken
  // image rather than failing the build.
  const paths = new Set<string>();
  for (const project of portfolioProjects) {
    paths.add(project.image);
    for (const screen of project.caseStudy.screens) {
      paths.add(screen.image);
    }
    if ("comparison" in project.caseStudy) {
      paths.add(project.caseStudy.comparison.before.image);
      paths.add(project.caseStudy.comparison.after.image);
    }
  }

  for (const path of paths) {
    const res = await request.get(path);
    expect(res.status(), `${path} is referenced in site data but 404s`).toBe(200);
  }
});

test("case study headings descend h1 to h2 to h3", async ({ page }) => {
  // The Decisions section introduced the first h3 on these pages. If its
  // styling ever outgrows the h2 above it, the visual hierarchy inverts
  // while the markup still looks correct.
  await page.goto("/portfolio/local-city-places");

  const ranks = await page.evaluate(() =>
    [...document.querySelectorAll("main h1, main h2, main h3")].map((el) => ({
      level: Number(el.tagName[1]),
      size: Math.round(Number.parseFloat(getComputedStyle(el).fontSize)),
    })),
  );

  const smallestOf = (level: number) =>
    Math.min(...ranks.filter((r) => r.level === level).map((r) => r.size));
  const largestOf = (level: number) =>
    Math.max(...ranks.filter((r) => r.level === level).map((r) => r.size));

  expect(ranks.filter((r) => r.level === 3).length).toBeGreaterThan(0);
  expect(smallestOf(1)).toBeGreaterThanOrEqual(largestOf(2));
  expect(smallestOf(2)).toBeGreaterThanOrEqual(largestOf(3));
});

test("the decisions section appears only where the data has one", async ({ page }) => {
  // `decisions` is optional so a project without recoverable reasoning
  // gets no section at all. An empty heading with nothing under it would
  // be worse than the omission it is meant to represent.
  for (const project of portfolioProjects) {
    await page.goto(`/portfolio/${project.slug}`);
    const section = page.locator(".case-decisions-section");
    const hasData = "decisions" in project.caseStudy;

    await expect(section, `${project.slug} decisions section presence`).toHaveCount(
      hasData ? 1 : 0,
    );

    if (hasData) {
      await expect(page.locator(".case-decision")).toHaveCount(project.caseStudy.decisions.length);
    }
  }
});

test("each project card has one case study link, after its title", async ({ page }) => {
  // Cards once carried two action rows and three peer links with no
  // primary, and the action row sat above the title in the DOM -- so
  // keyboard focus reached it before the heading it belonged to.
  await page.goto("/portfolio");

  const cards = page.locator("main article[id^='work-']");
  await expect(cards).toHaveCount(portfolioProjects.length);

  for (const project of portfolioProjects) {
    const card = page.locator(`#work-${project.slug}`);
    await expect(
      card.locator(`a[href="/portfolio/${project.slug}"]`),
      `${project.slug} should link to its case study exactly once`,
    ).toHaveCount(1);

    const titleBeforeActions = await card.evaluate((el) => {
      const title = el.querySelector("h2[id^='project-']");
      const bar = el.querySelector(".live-preview-bar");
      if (!title || !bar) return false;
      // DOCUMENT_POSITION_FOLLOWING: the bar comes after the title.
      return Boolean(title.compareDocumentPosition(bar) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(titleBeforeActions, `${project.slug} title must precede its action row`).toBe(true);
  }
});

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
