import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { portfolioProjects, site } from "../src/data/site";

const PAGE_ROUTES = [
  "/",
  "/portfolio",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  ...portfolioProjects.map((project) => `/portfolio/${project.slug}`),
] as const;

function markdownPath(pathname: string) {
  return pathname === "/" ? "/index.md" : `${pathname}/index.md`;
}

function expectedMarkdownHeading(pathname: string) {
  if (pathname === "/")
    return `# ${site.name} — Product Design, Full-Stack Development, AI & Cloud`;
  if (pathname === "/portfolio") return `# Selected Work — ${site.name}`;
  if (pathname === "/services") return `# Services — ${site.name}`;
  if (pathname === "/about") return `# About ${site.name}`;
  if (pathname === "/contact") return `# Contact ${site.name}`;
  if (pathname === "/privacy") return `# Privacy Policy — ${site.name}`;
  if (pathname === "/terms") return `# Terms of Use — ${site.name}`;

  const project = portfolioProjects.find(
    (candidate) => pathname === `/portfolio/${candidate.slug}`,
  );
  if (!project) throw new Error(`No heading expectation for ${pathname}`);
  return `# ${project.title} Case Study — ${site.name}`;
}

function headerTokens(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

function serverRenderedMainText(html: string) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/iu)?.[1] ?? "";
  return main
    .replace(/<(?:script|style|template)\b[^>]*>[\s\S]*?<\/(?:script|style|template)>/giu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/&(?:nbsp|#160);/giu, " ")
    .replace(/&amp;/giu, "&")
    .replace(/&(?:rsquo|#8217);/giu, "’")
    .replace(/\s+/gu, " ")
    .trim();
}

test("homepage raw HTML has a branded h1 and substantial server-rendered main content", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  const response = await request.get("/", { headers: { Accept: "text/html" } });
  const html = await response.text();
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/iu)?.[1] ?? "";
  const h1Text = h1
    .replace(/<[^>]+>/gu, " ")
    .replace(/\s+/gu, " ")
    .replace(/\s+([.,])/gu, "$1")
    .trim();
  const mainText = serverRenderedMainText(html);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/html");
  expect(h1Text).toBe("Carter Steinhoff. Products from interface to infrastructure.");
  expect(mainText).toContain("Carter Steinhoff designs the interface");
  expect(
    mainText.length,
    "meaningful raw <main> text should exceed the audit floor",
  ).toBeGreaterThan(700);
});

test("every canonical page negotiates a route-specific Markdown representation", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  for (const pathname of PAGE_ROUTES) {
    const response = await request.get(pathname, {
      headers: { Accept: "text/markdown" },
    });
    const body = await response.text();
    const vary = headerTokens(response.headers().vary);

    expect(response.status(), `${pathname} Markdown status`).toBe(200);
    expect(response.headers()["content-type"], `${pathname} Markdown type`).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(vary, `${pathname} must vary by Accept`).toContain("accept");
    expect(vary, `${pathname} must preserve encoding variance`).toContain("accept-encoding");
    expect(body.startsWith(expectedMarkdownHeading(pathname)), `${pathname} Markdown heading`).toBe(
      true,
    );
    expect(body, `${pathname} must not leak the HTML shell`).not.toMatch(
      /<!doctype|<html|<script/iu,
    );
  }
});

test("every advertised index.md alternate resolves without an Accept header", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  for (const pathname of PAGE_ROUTES) {
    const response = await request.get(markdownPath(pathname));
    const body = await response.text();

    expect(response.status(), `${markdownPath(pathname)} status`).toBe(200);
    expect(response.headers()["content-type"], `${markdownPath(pathname)} type`).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(body.startsWith(expectedMarkdownHeading(pathname))).toBe(true);
  }
});

test("HTML responses advertise Markdown, llms.txt, and preserve Next cache variants", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  const response = await request.get("/", { headers: { Accept: "text/html" } });
  const vary = headerTokens(response.headers().vary);
  const link = response.headers().link ?? "";

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/html");
  expect(vary).toEqual(
    expect.arrayContaining([
      "rsc",
      "next-router-state-tree",
      "next-router-prefetch",
      "next-router-segment-prefetch",
    ]),
  );
  if ((response.headers().server ?? "").toLowerCase() === "vercel") {
    expect(vary).toEqual(expect.arrayContaining(["accept", "accept-encoding"]));
  }
  expect(link).toContain('</index.md>; rel="alternate"; type="text/markdown"');
  expect(link).toContain('</llms.txt>; rel="describedby"');
});

test("Vercel applies final Vary repair only to negotiated page routes", ({
  request: _request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Platform configuration is viewport-independent");

  const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
    routes: Array<{
      src: string;
      methods: string[];
      continue: boolean;
      transforms: unknown[];
    }>;
  };
  const route = config.routes[0];
  const matcher = new RegExp(`^${route.src}$`, "u");

  expect(route.methods).toEqual(["GET", "HEAD"]);
  expect(route.continue).toBe(true);
  expect(route.transforms).toEqual([
    {
      type: "response.headers",
      op: "append",
      target: { key: "Vary" },
      args: ["Accept", "Accept-Encoding"],
    },
  ]);

  for (const pathname of [
    ...PAGE_ROUTES,
    ...PAGE_ROUTES.map(markdownPath),
    "/definitely-not-an-agent-ready-page",
  ]) {
    expect(matcher.test(pathname), `${pathname} should receive the final Vary repair`).toBe(true);
  }

  for (const pathname of [
    "/api/contact",
    "/_next/static/app.js",
    "/robots.txt",
    "/sitemap.xml",
    "/llms.txt",
    "/manifest.webmanifest",
    "/contact/opengraph-image",
    "/images/studio-hero-v3.webp",
  ]) {
    expect(matcher.test(pathname), `${pathname} has a fixed representation`).toBe(false);
  }
});

test("Accept parsing honors quality, specificity, rejection, and stable defaults", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  const vectors = [
    { accept: "*/*", status: 200, type: "text/html" },
    { accept: "text/markdown", status: 200, type: "text/markdown" },
    {
      accept: "text/markdown, text/html;q=0.8",
      status: 200,
      type: "text/markdown",
    },
    {
      accept: "text/html, text/markdown;q=0.5",
      status: 200,
      type: "text/html",
    },
    {
      accept: "text/markdown;q=0, text/html",
      status: 200,
      type: "text/html",
    },
    {
      accept: "text/html;q=0, */*;q=1",
      status: 200,
      type: "text/markdown",
    },
    {
      accept: "*/*, text/markdown",
      status: 200,
      type: "text/markdown",
    },
    { accept: "TEXT/MARKDOWN; Q=1", status: 200, type: "text/markdown" },
    { accept: "text/html;q=0, text/markdown;q=0", status: 406, type: "text/plain" },
    { accept: "application/pdf", status: 406, type: "text/plain" },
  ] as const;

  for (const vector of vectors) {
    const response = await request.get("/", { headers: { Accept: vector.accept } });
    expect(response.status(), vector.accept).toBe(vector.status);
    expect(response.headers()["content-type"], vector.accept).toContain(vector.type);
    if (vector.type !== "text/html") {
      expect(headerTokens(response.headers().vary), vector.accept).toContain("accept");
    }
  }
});

test("HEAD exposes the negotiated Markdown headers without a response body", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  const response = await request.head("/", { headers: { Accept: "text/markdown" } });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("text/markdown; charset=utf-8");
  expect(headerTokens(response.headers().vary)).toEqual(
    expect.arrayContaining(["accept", "accept-encoding"]),
  );
  expect((await response.body()).byteLength).toBe(0);
});

test("alternating HTML and Markdown requests never crosses cached representations", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  for (const accept of ["text/html", "text/markdown", "text/html", "text/markdown"]) {
    const response = await request.get("/", { headers: { Accept: accept } });
    const body = await response.text();
    const isMarkdown = accept === "text/markdown";

    expect(response.headers()["content-type"]).toContain(
      isMarkdown ? "text/markdown" : "text/html",
    );
    expect(body.startsWith("# ")).toBe(isMarkdown);
    expect(body.match(/<!DOCTYPE html>/iu) !== null).toBe(!isMarkdown);
  }
});

test("internal negotiation routes cannot be activated by client headers", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  for (const [pathname, marker] of [
    ["/api/markdown", "markdown-canonical"],
    ["/api/not-acceptable", "not-acceptable"],
  ] as const) {
    const response = await request.get(pathname, {
      headers: { "x-cs-agent-negotiation": marker },
    });

    expect(response.status(), pathname).toBe(404);
    expect(response.headers()["cache-control"], pathname).toContain("no-store");
  }
});

test("missing paths provide a recoverable HTML 404", async ({ page }) => {
  const pathname = "/definitely-not-an-agent-ready-page";
  const htmlResponse = await page.goto(pathname);

  expect(htmlResponse?.status()).toBe(404);
  const recoveryNavigation = page.getByRole("navigation", { name: "404 recovery links" });
  for (const href of ["/", "/portfolio", "/services", "/contact", "/sitemap.xml", "/llms.txt"]) {
    await expect(
      recoveryNavigation.locator(`a[href="${href}"]`),
      `${href} recovery link`,
    ).toBeVisible();
  }
});

test("missing paths provide a recoverable Markdown 404", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");
  const pathname = "/definitely-not-an-agent-ready-page";
  const markdownResponse = await request.get(pathname, {
    headers: { Accept: "text/markdown" },
  });
  const body = await markdownResponse.text();

  expect(markdownResponse.status()).toBe(404);
  expect(markdownResponse.headers()["content-type"]).toBe("text/markdown; charset=utf-8");
  expect(headerTokens(markdownResponse.headers().vary)).toEqual(
    expect.arrayContaining(["accept", "accept-encoding"]),
  );
  expect(body).toContain("# 404 — Page not found");
  expect(body).toContain("/sitemap.xml");
  expect(body).toContain("/llms.txt");
});

test("llms.txt follows the v2 structure and gives specific when-to-use guidance", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  const response = await request.get("/llms.txt", {
    headers: { Accept: "application/pdf" },
  });
  const body = await response.text();
  const lines = body.split("\n");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("text/markdown; charset=utf-8");
  expect(lines[0]).toBe(`# ${site.name}`);
  expect(lines[1]).toBe("");
  expect(lines[2]).toMatch(/^> Official portfolio/u);
  expect(body).toContain("**When to use this site**");
  expect(body).toContain("**How agents should use and contact this site**");
  expect(body).toContain("explicitly authorizes outreach");
  expect(body).toContain("## Primary");
  expect(body).toContain("## Case studies");
  expect(body).toContain("## Optional");
  expect(body).toContain("https://cartersteinhoff.co/index.md");
  for (const project of portfolioProjects) {
    expect(body).toContain(`https://cartersteinhoff.co/portfolio/${project.slug}/index.md`);
  }
});

test("HTML metadata advertises each explicit Markdown alternate", async ({ page }) => {
  for (const pathname of PAGE_ROUTES) {
    await page.goto(pathname);
    const alternate = page.locator('link[rel="alternate"][type="text/markdown"]');
    await expect(alternate, `${pathname} Markdown alternate`).toHaveAttribute(
      "href",
      new URL(markdownPath(pathname), site.defaultUrl).toString(),
    );
  }
});

test("machine-readable discovery files stay complete and keep their fixed formats", async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Raw HTTP behavior is viewport-independent");

  const robots = await request.get("/robots.txt", { headers: { Accept: "text/markdown" } });
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toContain("Sitemap: https://cartersteinhoff.co/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml", { headers: { Accept: "text/markdown" } });
  const sitemapBody = await sitemap.text();
  const sitemapUrls = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/gu)]
    .map((match) => match[1])
    .filter((url) => !url.includes("/images/") && !url.includes("/opengraph-image"));
  const expectedUrls = PAGE_ROUTES.map((pathname) => new URL(pathname, site.defaultUrl).toString());

  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("application/xml");
  expect(new Set(sitemapUrls)).toEqual(new Set(expectedUrls));

  const manifest = await request.get("/manifest.webmanifest", {
    headers: { Accept: "text/markdown" },
  });
  expect(manifest.status()).toBe(200);
  expect(manifest.headers()["content-type"]).toContain("application/manifest+json");
  expect((await manifest.json()).name).toContain("Carter Steinhoff");

  const image = await request.get("/images/studio-hero-v3.webp", {
    headers: { Accept: "text/markdown" },
  });
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/webp");

  const contactGet = await request.get("/api/contact", {
    headers: { Accept: "text/markdown" },
  });
  expect(contactGet.status()).toBe(405);
});
