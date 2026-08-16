import { expect, type Page, test } from "@playwright/test";
import { portfolioProjects } from "../src/data/site";
import { technologies } from "../src/data/technologies";

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

function wordCount(value: string) {
  return value.trim().match(/\S+/gu)?.length ?? 0;
}

function expectWordRange(value: string, min: number, max: number, label: string) {
  const count = wordCount(value);
  expect(count, `${label} should be ${min}–${max} words; received ${count}`).toBeGreaterThanOrEqual(
    min,
  );
  expect(count, `${label} should be ${min}–${max} words; received ${count}`).toBeLessThanOrEqual(
    max,
  );
}

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

test("every case study has a concise story, a complete screen set, and a verified stack", () => {
  for (const project of portfolioProjects) {
    const { caseStudy } = project;

    expect(
      caseStudy.screens.length,
      `${project.slug} needs at least six screens`,
    ).toBeGreaterThanOrEqual(6);
    expect(caseStudy.screens[0].image, `${project.slug} cover should lead its gallery`).toBe(
      project.image,
    );
    expect(
      new Set(caseStudy.screens.map((screen) => screen.image)).size,
      `${project.slug} screen images should be unique`,
    ).toBe(caseStudy.screens.length);

    expectWordRange(caseStudy.headline, 6, 12, `${project.slug} headline`);
    expectWordRange(caseStudy.overview, 25, 45, `${project.slug} overview`);
    expectWordRange(caseStudy.detail, 15, 35, `${project.slug} detail`);

    expect(caseStudy.story, `${project.slug} needs three story chapters`).toHaveLength(3);
    for (const [index, chapter] of caseStudy.story.entries()) {
      const chapterName = `${project.slug} chapter ${index + 1}`;
      expect(chapter.label.trim(), `${chapterName} needs a label`).not.toBe("");
      expectWordRange(chapter.title, 6, 12, `${chapterName} title`);
      expectWordRange(chapter.body, 20, 45, `${chapterName} body`);
    }

    const stackIds = caseStudy.technologyStack.groups.flatMap((group) =>
      group.technologies.map((technology) => technology.id),
    );
    expect(caseStudy.technologyStack.groups.length).toBeGreaterThanOrEqual(2);
    expect(caseStudy.technologyStack.groups.length).toBeLessThanOrEqual(3);
    expect(new Set(stackIds).size, `${project.slug} stack technologies should be unique`).toBe(
      stackIds.length,
    );
    for (const id of stackIds) {
      expect(
        technologies[id],
        `${project.slug} uses an unknown technology id: ${id}`,
      ).toBeDefined();
    }
  }
});

test("Anne Ross selected screens cover every public page", () => {
  const anneRoss = portfolioProjects.find((project) => project.slug === "anne-ross");

  expect(anneRoss?.caseStudy.screens.map((screen) => screen.title)).toEqual([
    "Home & Garden",
    "Lifestyle",
    "Still Life",
    "Sets",
    "Motion",
    "Bio",
    "Client List",
    "Contact",
  ]);
});

test("technology stack logos are decorative and names stay visible", async ({ page }) => {
  const project = portfolioProjects[0];
  const expectedGroups = project.caseStudy.technologyStack.groups.length;
  const expectedCount = project.caseStudy.technologyStack.groups.reduce(
    (total, group) => total + group.technologies.length,
    0,
  );

  await page.goto(`/portfolio/${project.slug}`);
  await expect(page.locator(".case-stack-group-label")).toHaveCount(expectedGroups);
  await expect(page.locator(".case-stack-name")).toHaveCount(expectedCount);
  await expect(page.locator('.case-stack-mark[aria-hidden="true"] svg')).toHaveCount(expectedCount);
  await expect(page.getByText("System map", { exact: true })).toHaveCount(0);
});

test("case-study media uses a full-bleed poster and varied editorial scale", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop owns the editorial media rhythm");

  await page.goto("/portfolio/retailboss");
  await expect(page.locator(".case-screen")).toHaveCount(
    portfolioProjects[0].caseStudy.screens.length,
  );

  const hero = await page.locator("main > section").first().boundingBox();
  const leadScreen = await page.locator(".case-screen-wide").boundingBox();
  const supportingScreen = await page
    .locator(".case-screen:not(.case-screen-wide)")
    .first()
    .boundingBox();

  expect(hero?.width).toBeGreaterThanOrEqual(1400);
  expect(leadScreen?.width).toBeGreaterThanOrEqual(1200);
  expect(leadScreen?.width ?? 0).toBeGreaterThan((supportingScreen?.width ?? 0) * 1.45);

  await page.goto("/portfolio/anne-ross");
  const comparison = await page.locator(".case-comparison-stage").boundingBox();
  expect(comparison?.width).toBeGreaterThanOrEqual(900);
  expect(comparison?.width).toBeLessThanOrEqual(1280);
});

test("desktop case-study section headings share a strong left edge", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop owns the wide editorial layout");

  await page.goto("/portfolio/anne-newgarden");

  for (const sectionId of ["case-build-title", "case-gallery-title"]) {
    const section = page.locator(`[aria-labelledby="${sectionId}"]`);
    const label = await section.locator("p").first().boundingBox();
    const heading = await section.locator(`#${sectionId}`).boundingBox();

    expect(Math.abs((label?.x ?? 0) - (heading?.x ?? 0))).toBeLessThanOrEqual(1);
  }

  await page.goto("/portfolio/anne-ross");
  const comparison = page.locator('[aria-labelledby="case-comparison-title"]');
  const comparisonLabel = await comparison.locator("p").first().boundingBox();
  const comparisonHeading = await comparison.locator("#case-comparison-title").boundingBox();

  expect(Math.abs((comparisonLabel?.x ?? 0) - (comparisonHeading?.x ?? 0))).toBeLessThanOrEqual(1);
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

test("the card screenshot links to the case study without a second tab stop", async ({ page }) => {
  // The screenshot is a redundant click target: it must go to the case
  // study for a mouse, and be invisible to the keyboard and to assistive
  // tech, because the "Case study" link below already goes there.
  await page.goto("/portfolio");

  const cards = page.locator("main article[id^='work-']");
  await expect(cards).toHaveCount(portfolioProjects.length);

  for (const project of portfolioProjects) {
    const href = `/portfolio/${project.slug}`;
    const card = page.locator(`#work-${project.slug}`);

    // The plate wraps the screenshot in a link to the case study...
    const plateLink = card.locator(`a[href="${href}"][aria-hidden="true"]`);
    await expect(plateLink, `${project.slug} screenshot should link to its case study`).toHaveCount(
      1,
    );
    await expect(plateLink.locator("img")).toHaveCount(1);
    await expect(plateLink).toHaveAttribute("tabindex", "-1");

    // ...and exactly one link to that case study is reachable by keyboard.
    const focusable = await card
      .locator(`a[href="${href}"]:not([tabindex="-1"]):not([aria-hidden="true"])`)
      .count();
    expect(focusable, `${project.slug} should have one focusable case study link`).toBe(1);
  }
});

test("clicking a card screenshot opens its case study", async ({ page }) => {
  await page.goto("/portfolio");
  const [first] = portfolioProjects;
  await page.locator(`#work-${first.slug} a[aria-hidden="true"] img`).click();
  await page.waitForURL(`**/portfolio/${first.slug}`);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("the preview iframe feature is fully removed", async ({ page }) => {
  // Deleting a feature means deleting its markup and its styles, not
  // leaving dead classes behind for the next person to puzzle over.
  await page.goto("/portfolio");
  expect(await page.locator("iframe").count()).toBe(0);
  expect(await page.locator("[class*='live-preview']").count()).toBe(0);
  expect(await page.getByRole("button", { name: /preview/i }).count()).toBe(0);
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

test("services opens with the catalog and omits retired sections", async ({ page }) => {
  await page.goto("/services");

  await expect(
    page.getByRole("heading", { level: 1, name: "Choose the help you need." }),
  ).toHaveCount(1);

  for (const retiredCopy of [
    "Design, development, automation, and cloud.",
    "Engagement options",
    "Nucamp web development instructor",
  ]) {
    await expect(page.getByText(retiredCopy, { exact: true })).toHaveCount(0);
  }

  const sectionOrder = await page
    .locator("main > section")
    .evaluateAll((sections) => sections.map((section) => section.getAttribute("aria-labelledby")));
  expect(sectionOrder).toEqual(["services-title", "upwork-proof-title", "proof-title"]);
});

test("services hero image stays full bleed", async ({ page }) => {
  await page.goto("/services");

  const image = await page.locator('img[src*="services-phoenix-dusk"]').boundingBox();
  const viewport = page.viewportSize();

  expect(image?.x).toBeLessThanOrEqual(1);
  expect(image?.width).toBeGreaterThanOrEqual((viewport?.width ?? 0) - 1);
});

test("service catalog opens one offering at a time and allows collapse", async ({ page }) => {
  await page.goto("/services");

  const design = page.getByRole("button", { name: "Website & product design" });
  const development = page.getByRole("button", { name: "Full-stack web development" });

  await expect(design).toHaveAttribute("aria-expanded", "true");
  await expect(development).toHaveAttribute("aria-expanded", "false");

  await development.click();

  await expect(design).toHaveAttribute("aria-expanded", "false");
  await expect(development).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('[aria-expanded="true"]')).toHaveCount(1);

  await development.click();

  await expect(development).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator('[aria-expanded="true"]')).toHaveCount(0);
});

test("Upwork proof preserves the real profile capture and live source", async ({ page }) => {
  await page.goto("/services");

  await expect(page.locator('img[src*="upwork-profile-carter-steinhoff"]')).toHaveCount(1);
  await expect(page.getByText("100%", { exact: true })).toHaveCount(1);
  await expect(page.getByText("4.9 / 5", { exact: true })).toHaveCount(1);
  await expect(page.getByRole("link", { name: /View Upwork profile/ })).toHaveAttribute(
    "href",
    "https://www.upwork.com/freelancers/cartersteinhoff",
  );
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
