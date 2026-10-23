import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePointerMotion } from "./usePointerMotion";

export function InteractiveSurface({
  children,
  className = "",
  as = "div",
  strength = 3,
}: {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
  strength?: number;
}) {
  const { enabled, rotateX, rotateY, glow, ...events } =
    usePointerMotion(strength);
  const Tag = as === "article" ? motion.article : motion.div;
  return (
    <Tag
      className={`interactive-surface ${className}`}
      {...events}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
      <motion.div
        className="surface-light"
        aria-hidden="true"
        style={{ background: glow, display: enabled ? undefined : "none" }}
      />
    </Tag>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const {
    rotateX,
    rotateY,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    onPointerCancel,
  } = usePointerMotion(5);
  return (
    <motion.div
      className="magnetic"
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      style={{ x: rotateY, y: rotateX }}
    >
      {children}
    </motion.div>
  );
}
