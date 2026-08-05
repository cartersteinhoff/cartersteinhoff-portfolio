import Image from "next/image";
import { focusAreas } from "@/data/site";

type FocusIndexProps = {
  limit?: number;
};

export function FocusIndex({ limit = focusAreas.length }: FocusIndexProps) {
  return (
    <div className="border-t border-white/15">
      {focusAreas.slice(0, limit).map((area) => (
        <article key={area.number} className="focus-row group">
          <div className="focus-row-copy">
            <span className="text-[0.66rem] font-semibold tracking-[0.16em] text-[var(--accent)]">
              {area.number}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,6.2rem)] leading-[0.88] tracking-[-0.035em]">
                {area.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-stone-500 md:text-base">
                {area.summary}
              </p>
            </div>
            <span className="focus-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <div className="focus-row-image">
            <Image
              src={area.image}
              alt={area.imageAlt}
              fill
              unoptimized
              sizes="(max-width: 768px) 45vw, 26vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </article>
      ))}
    </div>
  );
}
