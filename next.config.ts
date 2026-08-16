import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

/**
 * Headers the platform does not set for us. Production already sends
 * Strict-Transport-Security; everything below was absent.
 *
 * There is deliberately no full Content-Security-Policy. A strict one
 * needs per-request nonces, which means middleware and dynamic
 * rendering — and every route here is prerendered. `frame-ancestors` is
 * the exception: it is the one CSP directive X-Frame-Options cannot
 * express well, and it needs no nonce. It stays `self` rather than
 * `none` because the portfolio embeds its own card in a live preview.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  reactStrictMode: true,
  /* Statically typed links. Turns "does this href resolve?" from a
   * runtime test that only covers the homepage into a build error
   * anywhere a route is renamed or mistyped. */
  typedRoutes: true,
  /* `experimental.inlineCss` was measured and rejected. Do not re-add it
   * without re-measuring.
   *
   * Two problems, the second worse than the first. It makes the CSS part
   * of the document, so the 11KB gzipped shared sheet stops being cached
   * across navigations and is re-sent with every page. And every rule
   * lands in the HTML three times over — once as the rendered <style>
   * and twice more serialised into the RSC flight payload — so the cost
   * is roughly triple the stylesheet, not equal to it.
   *
   * Net: portfolio.html 10KB -> 46KB gzipped, paid on every page view,
   * to save one cached request on the first one. */
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withBotId(nextConfig);
