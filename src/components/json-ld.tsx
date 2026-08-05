type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Next.js recommends a native script for JSON-LD; escaping `<` prevents script-tag injection.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
