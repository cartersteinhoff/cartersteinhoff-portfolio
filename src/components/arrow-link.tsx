import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  inverse?: boolean;
};

export function ArrowLink({ href, children, inverse = false }: ArrowLinkProps) {
  return (
    <Link className={`arrow-link ${inverse ? "arrow-link-inverse" : ""}`} href={href}>
      <span>{children}</span>
      <span className="arrow-link-icon" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
