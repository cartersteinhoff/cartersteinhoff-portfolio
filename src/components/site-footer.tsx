import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink)] px-5 py-8 text-stone-200 md:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="mb-2 font-[family-name:var(--font-display)] text-3xl">{site.name}</p>
          <p className="max-w-2xl text-sm leading-6 text-stone-400">
            {site.role} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] font-semibold tracking-[0.13em] uppercase">
          <Link className="footer-link" href="/portfolio">
            Portfolio
          </Link>
          <Link className="footer-link" href="/services">
            Services
          </Link>
          <Link className="footer-link" href="/about">
            About
          </Link>
          <Link className="footer-link" href="/contact">
            Contact
          </Link>
          <span className="flex basis-full gap-x-5 md:basis-auto">
            <a
              className="footer-link footer-link-accent"
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              className="footer-link footer-link-accent"
              href={site.upworkUrl}
              target="_blank"
              rel="noreferrer"
            >
              Upwork
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1500px] flex-wrap items-center gap-x-6 gap-y-1 border-t border-white/10 pt-5 text-xs tracking-[0.09em] text-stone-400 uppercase">
        <span>© {new Date().getFullYear()}</span>
        <nav className="flex flex-wrap gap-x-5" aria-label="Legal">
          <Link className="footer-link" href="/privacy">
            Privacy
          </Link>
          <Link className="footer-link" href="/terms">
            Terms
          </Link>
        </nav>
        <span className="ml-auto">
          Made in the desert{" "}
          <span aria-hidden="true" className="not-italic">
            🌵
          </span>
        </span>
      </div>
    </footer>
  );
}
