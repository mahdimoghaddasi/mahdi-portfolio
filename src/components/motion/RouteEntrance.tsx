import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function RouteEntrance({
  children,
  anchor = false,
}: {
  children: ReactNode;
  anchor?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced || anchor ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
