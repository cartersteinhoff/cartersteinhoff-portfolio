import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

/* Generic over the route so `typedRoutes` can check the href at the call
 * site rather than here. A plain `string` would make this component the
 * hole every broken internal link slips through. */
type ArrowLinkProps<T extends string> = {
  href: Route<T>;
  children: ReactNode;
  inverse?: boolean;
};

export function ArrowLink<T extends string>({
  href,
  children,
  inverse = false,
}: ArrowLinkProps<T>) {
  return (
    <Link className={`arrow-link ${inverse ? "arrow-link-inverse" : ""}`} href={href}>
      <span>{children}</span>
      <span className="arrow-link-icon" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
