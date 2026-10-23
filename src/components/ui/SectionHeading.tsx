import type { ReactNode } from "react";
import { KineticText } from "../motion/KineticText";

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>
          <KineticText text={title} />
        </h2>
      </div>
      {children}
    </div>
  );
}
