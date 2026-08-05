"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (!isOpen) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const backgroundRegions = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
    ].filter((region): region is HTMLElement => Boolean(region));

    for (const region of backgroundRegions) {
      region.setAttribute("inert", "");
      region.setAttribute("aria-hidden", "true");
    }

    const menuLinks = Array.from(
      menuPanelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
    );
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    menuLinks[0]?.focus();

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || menuLinks.length === 0) return;

      const focusableElements = [menuButtonRef.current, ...menuLinks].filter(
        (element): element is HTMLButtonElement | HTMLAnchorElement => Boolean(element),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    desktopMedia.addEventListener("change", handleViewportChange);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      desktopMedia.removeEventListener("change", handleViewportChange);
      for (const region of backgroundRegions) {
        region.removeAttribute("inert");
        region.removeAttribute("aria-hidden");
      }
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-8 md:pt-7">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between">
        <Link
          href="/"
          tabIndex={isOpen ? -1 : undefined}
          className="group relative z-50 flex items-center gap-3 rounded-full border border-white/10 bg-black/25 py-1.5 pr-4 pl-1.5 text-[0.68rem] font-semibold tracking-[0.2em] text-stone-50 uppercase backdrop-blur-xl"
          aria-label="Carter Steinhoff, home"
        >
          <span className="grid size-9 place-items-center rounded-full border border-white/35 transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
            CS
          </span>
          <span className="hidden sm:block">Carter Steinhoff</span>
        </Link>

        <nav className="hidden items-center gap-8 rounded-full border border-white/15 bg-black/20 px-6 py-3 text-[0.66rem] font-semibold tracking-[0.18em] text-stone-100 uppercase backdrop-blur-xl md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`nav-link ${pathname === link.href ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="relative z-50 grid size-11 place-items-center rounded-full border border-white/20 bg-black/20 text-stone-50 backdrop-blur-xl md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span className={`menu-icon ${isOpen ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        ref={menuPanelRef}
        id="mobile-navigation"
        className={`mobile-menu ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Site navigation"
        aria-modal={isOpen}
        role="dialog"
      >
        <nav className="flex h-full flex-col justify-end gap-2 px-6 pb-12">
          <p className="mb-6 text-[0.66rem] tracking-[0.2em] text-stone-400 uppercase">Navigate</p>
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              className="flex items-end justify-between border-t border-white/15 py-4 font-[family-name:var(--font-display)] text-[clamp(2.9rem,15vw,5rem)] leading-none text-stone-50"
            >
              {link.label}
              <span className="pb-1 font-sans text-[0.62rem] tracking-[0.18em] text-[var(--accent)]">
                0{index + 1}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
