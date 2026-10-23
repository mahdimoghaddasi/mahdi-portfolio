import { useEffect, useRef, useSyncExternalStore } from "react";
import { useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import type { PointerEvent } from "react";

const query =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia(query).matches;

/** Pointer updates stay in Motion values, outside React's render cycle. */
export function usePointerMotion(strength = 4) {
  const enabled = useSyncExternalStore(subscribe, snapshot, () => false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rotateX = useSpring(y, { stiffness: 130, damping: 24 });
  const rotateY = useSpring(x, { stiffness: 130, damping: 24 });
  const glow = useMotionTemplate`radial-gradient(380px circle at ${glowX}% ${glowY}%, var(--pointer-light), transparent 75%)`;
  // Only measure on entry; pointermove never forces a layout read.
  const bounds = useRef<DOMRect | undefined>(undefined);
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
      rotateX.jump(0);
      rotateY.jump(0);
    }
  }, [enabled, x, y, rotateX, rotateY]);
  return {
    enabled,
    rotateX,
    rotateY,
    glow,
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (enabled && event.pointerType === "mouse")
        bounds.current = event.currentTarget.getBoundingClientRect();
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const rect = bounds.current;
      if (
        !enabled ||
        event.pointerType !== "mouse" ||
        !rect ||
        !rect.width ||
        !rect.height
      )
        return;
      const px = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width),
      );
      const py = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height),
      );
      x.set((px - 0.5) * strength * 2);
      y.set((0.5 - py) * strength * 2);
      glowX.set(px * 100);
      glowY.set(py * 100);
    },
    onPointerLeave: reset,
    onPointerCancel: reset,
  };
}
