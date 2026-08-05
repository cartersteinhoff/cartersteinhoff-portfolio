import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink)] px-5 py-8 text-stone-200 md:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="mb-2 font-[family-name:var(--font-display)] text-3xl">{site.name}</p>
          <p className="text-sm text-stone-400">
            {site.role} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] font-semibold tracking-[0.13em] uppercase">
          <Link className="footer-link" href="/about">
            About
          </Link>
          <Link className="footer-link" href="/portfolio">
            Portfolio
          </Link>
          <Link className="footer-link" href="/services">
            Services
          </Link>
          <Link className="footer-link" href="/contact">
            Contact
          </Link>
          <a className="footer-link" href={`mailto:${site.email}`}>
            Email
          </a>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1500px] justify-between border-t border-white/10 pt-5 text-[0.68rem] tracking-[0.11em] text-stone-500 uppercase">
        <span>© {new Date().getFullYear()}</span>
        <span>Made in the desert</span>
      </div>
    </footer>
  );
}
