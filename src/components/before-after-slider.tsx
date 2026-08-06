"use client";

import Image from "next/image";
import { type CSSProperties, useId, useState } from "react";

type ComparisonImage = {
  src: string;
  label: string;
};

type BeforeAfterSliderProps = {
  before: ComparisonImage;
  after: ComparisonImage;
  ariaLabel: string;
};

export function BeforeAfterSlider({ before, after, ariaLabel }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const inputId = useId();
  const instructionsId = `${inputId}-instructions`;
  const style = { "--comparison-position": `${position}%` } as CSSProperties;

  return (
    <div className="before-after-slider" style={style}>
      <div className="before-after-visual" role="img" aria-label={ariaLabel}>
        <Image
          src={after.src}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 92vw"
          className="object-cover"
        />
        <div className="before-after-before" aria-hidden="true">
          <Image
            src={before.src}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 92vw"
            className="object-cover"
          />
        </div>

        <span className="before-after-label before-after-label-before" aria-hidden="true">
          {before.label}
        </span>
        <span className="before-after-label before-after-label-after" aria-hidden="true">
          {after.label}
        </span>
        <span className="before-after-divider" aria-hidden="true" />
        <span className="before-after-handle" aria-hidden="true">
          <span>←</span>
          <span>→</span>
        </span>
      </div>

      <label className="sr-only" htmlFor={inputId}>
        Compare the original WordPress site with the Next.js redesign
      </label>
      <input
        id={inputId}
        className="before-after-control"
        type="range"
        min="0"
        max="100"
        step="1"
        value={position}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
        aria-describedby={instructionsId}
        aria-valuetext={`${position}% of the original design visible; ${100 - position}% of the redesign visible`}
      />
      <p className="sr-only" id={instructionsId}>
        Use the left and right arrow keys, Home, or End to change the comparison.
      </p>
    </div>
  );
}
