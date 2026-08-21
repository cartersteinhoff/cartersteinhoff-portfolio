import type { Metadata } from "next";
import Link from "next/link";

const title = "Page Not Found";
const description = "The requested page could not be found.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: null,
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-[var(--ink)] px-5 text-stone-100">
      <div className="w-full max-w-4xl py-32 text-center">
        <p className="text-[0.66rem] tracking-[0.2em] text-[var(--accent)] uppercase">
          404 · Off the map
        </p>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(4rem,12vw,10rem)] leading-none">
          Nothing here.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-stone-400">
          The requested address does not match a page on Carter Steinhoff&apos;s portfolio. Start
          with the work or service catalog, or use the machine-readable indexes to recover.
        </p>
        <nav
          className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-7 gap-y-4 border-t border-white/15 pt-7 text-sm"
          aria-label="404 recovery links"
        >
          <Link className="underline decoration-white/25 underline-offset-8" href="/">
            Home
          </Link>
          <Link className="underline decoration-white/25 underline-offset-8" href="/portfolio">
            Portfolio
          </Link>
          <Link className="underline decoration-white/25 underline-offset-8" href="/services">
            Services
          </Link>
          <Link className="underline decoration-white/25 underline-offset-8" href="/contact">
            Contact
          </Link>
          <a className="underline decoration-white/25 underline-offset-8" href="/sitemap.xml">
            Sitemap
          </a>
          <a className="underline decoration-white/25 underline-offset-8" href="/llms.txt">
            Agent guide
          </a>
        </nav>
      </div>
    </main>
  );
}
