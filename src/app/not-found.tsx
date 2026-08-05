import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-[var(--ink)] px-5 text-stone-100">
      <div className="text-center">
        <p className="text-[0.66rem] tracking-[0.2em] text-[var(--accent)] uppercase">
          404 · Off the map
        </p>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(4rem,12vw,10rem)] leading-none">
          Nothing here.
        </h1>
        <Link
          className="mt-10 inline-block text-sm underline decoration-white/25 underline-offset-8 hover:decoration-white"
          href="/"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
