import {
  type SimpleIcon,
  siApache,
  siCloudflare,
  siCplusplus,
  siCss,
  siDotnet,
  siDrizzle,
  siElementor,
  siFastify,
  siGraphql,
  siJavascript,
  siNeon,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siResend,
  siStripe,
  siSwift,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWordpress,
  siWpengine,
} from "simple-icons";

type TechnologyDefinition = {
  name: string;
  icon: SimpleIcon;
};

/**
 * Brand paths come from the pinned Simple Icons package and are used only
 * to identify technology in the project stack. The visible name and role
 * remain the accessible label; the marks themselves are decorative.
 */
export const technologies = {
  apache: { name: "Apache", icon: siApache },
  cloudflare: { name: "Cloudflare", icon: siCloudflare },
  cpp: { name: "C++", icon: siCplusplus },
  css: { name: "CSS", icon: siCss },
  dotnet: { name: ".NET", icon: siDotnet },
  drizzle: { name: "Drizzle ORM", icon: siDrizzle },
  elementor: { name: "Elementor", icon: siElementor },
  fastify: { name: "Fastify", icon: siFastify },
  graphql: { name: "GraphQL", icon: siGraphql },
  javascript: { name: "JavaScript", icon: siJavascript },
  neon: { name: "Neon", icon: siNeon },
  nextjs: { name: "Next.js", icon: siNextdotjs },
  nodejs: { name: "Node.js", icon: siNodedotjs },
  php: { name: "PHP", icon: siPhp },
  postgresql: { name: "PostgreSQL", icon: siPostgresql },
  react: { name: "React", icon: siReact },
  resend: { name: "Resend", icon: siResend },
  stripe: { name: "Stripe", icon: siStripe },
  swift: { name: "Swift", icon: siSwift },
  tailwind: { name: "Tailwind CSS", icon: siTailwindcss },
  typescript: { name: "TypeScript", icon: siTypescript },
  vercel: { name: "Vercel", icon: siVercel },
  wordpress: { name: "WordPress", icon: siWordpress },
  wpengine: { name: "WP Engine", icon: siWpengine },
} as const satisfies Record<string, TechnologyDefinition>;

export type TechnologyId = keyof typeof technologies;

export type TechnologyStackItem = {
  id: TechnologyId;
  role: string;
};

export type TechnologyStackGroup = {
  label: string;
  technologies: readonly TechnologyStackItem[];
};

type TechnologyStackGroups =
  | readonly [TechnologyStackGroup, TechnologyStackGroup]
  | readonly [TechnologyStackGroup, TechnologyStackGroup, TechnologyStackGroup];

export type TechnologyStackData = {
  headline: string;
  summary: string;
  groups: TechnologyStackGroups;
};
