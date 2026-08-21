"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

/* Typed as Route so a renamed page breaks the build here rather than
 * shipping a nav item that 404s. */
const links: { href: Route; label: string }[] = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio/"));
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [pendingHref, setPendingHref] = useState<Route | null>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
        navigationTimerRef.current = null;
      }
      setIsNavigating(false);
      setPendingHref(null);
      setIsOpen(false);
      setIsHeaderHidden(false);
    }
  }, [pathname]);

  useEffect(
    () => () => {
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrame: number | undefined;

    function handleScroll() {
      if (animationFrame !== undefined) return;

      animationFrame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isMovingDown = currentScrollY > lastScrollY + 6;
        const isMovingUp = currentScrollY < lastScrollY - 6;

        if (currentScrollY < 96 || isMovingUp) {
          setIsHeaderHidden(false);
        } else if (isMovingDown) {
          setIsHeaderHidden(true);
        }

        lastScrollY = currentScrollY;
        animationFrame = undefined;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

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

  function handleMobileNavigation(event: MouseEvent<HTMLAnchorElement>, href: Route) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    if (isNavigating) return;

    if (pathname === href) {
      setIsOpen(false);
      return;
    }

    setPendingHref(href);
    setIsNavigating(true);
    setIsHeaderHidden(false);

    const navigationDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;

    navigationTimerRef.current = setTimeout(() => {
      router.push(href);
    }, navigationDelay);
  }

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-8 md:pt-7 ${
        isHeaderHidden && !isOpen ? "is-hidden" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between">
        <Link
          href="/"
          tabIndex={isOpen ? -1 : undefined}
          className="mobile-home-control group relative z-50 flex size-11 items-center justify-center rounded-full border-0 bg-black/35 text-[0.68rem] font-semibold tracking-[0.2em] text-stone-50 uppercase backdrop-blur-xl transition-colors hover:bg-black/55 sm:h-auto sm:w-auto sm:justify-start sm:gap-3 sm:border sm:border-white/10 sm:bg-black/25 sm:py-1.5 sm:pr-4 sm:pl-1.5"
          aria-label="Carter Steinhoff, home"
        >
          <span className="mobile-home-mark grid size-9 place-items-center rounded-full border-0 transition-colors group-hover:bg-[var(--accent)] group-hover:text-black sm:border sm:border-white/35 sm:group-hover:border-[var(--accent)]">
            CS
          </span>
          <span className="hidden sm:block">Carter Steinhoff</span>
        </Link>

        <nav className="hidden items-center gap-6 rounded-full border border-white/15 bg-black/20 px-6 py-3 text-[0.66rem] font-semibold tracking-[0.16em] text-stone-100 uppercase backdrop-blur-xl md:flex lg:gap-8 lg:tracking-[0.18em]">
          {links.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-control relative z-50 grid size-11 place-items-center rounded-full border-0 bg-black/35 text-stone-50 backdrop-blur-xl transition-colors hover:bg-black/55 md:hidden"
          onClick={() => {
            if (isNavigating) return;
            setIsHeaderHidden(false);
            setIsOpen((open) => !open);
          }}
          disabled={isNavigating}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={`menu-icon ${isOpen ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        ref={menuPanelRef}
        id="mobile-navigation"
        className={`mobile-menu ${isOpen ? "is-open" : ""} ${isNavigating ? "is-navigating" : ""}`}
        aria-hidden={!isOpen}
        aria-busy={isNavigating}
        aria-label="Site navigation"
        aria-modal={isOpen}
        role="dialog"
      >
        <div className="mobile-menu-art" aria-hidden="true">
          <Image
            src="/images/mobile-menu-sonoran-dusk.webp"
            alt=""
            fill
            sizes="100vw"
            className="mobile-menu-art-image"
          />
        </div>

        <nav className="mobile-menu-nav relative z-10 flex h-full flex-col justify-end gap-2 px-6">
          <p className="mobile-menu-label mb-6 text-[0.66rem] tracking-[0.2em] text-stone-400 uppercase">
            Navigate
          </p>
          {links.map((link, index) => {
            const isActive = isActivePath(pathname, link.href);
            const isDestination = pendingHref === link.href;
            const menuLinkStyle = {
              "--menu-link-delay": `${190 + index * 48}ms`,
            } as CSSProperties;

            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={isOpen && !isNavigating ? 0 : -1}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => handleMobileNavigation(event, link.href)}
                style={menuLinkStyle}
                className={`mobile-nav-link flex items-end justify-between border-t border-white/15 py-4 font-[family-name:var(--font-display)] text-[clamp(2.9rem,15vw,5rem)] leading-none text-stone-50 ${
                  isActive ? "is-active" : ""
                } ${isDestination ? "is-destination" : ""}`}
              >
                {link.label}
                <span className="pb-1 font-sans text-[0.62rem] tracking-[0.18em] text-[var(--accent)]">
                  0{index + 1}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
