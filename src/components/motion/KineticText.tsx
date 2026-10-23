import { motion, useReducedMotion } from "motion/react";

export function KineticText({
  text,
  emphasis = "",
}: {
  text: string;
  emphasis?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        className="kinetic-text"
        aria-hidden="true"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.045 }}
      >
        {text.split(" ").map((word, index) => (
          <span className="word-mask" key={`${word}-${index}`}>
            <motion.span
              className={
                word.replace(/[.,!?]/g, "") === emphasis
                  ? "accent-serif"
                  : undefined
              }
              variants={{
                hidden: { y: "105%", opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{
                duration: reduced ? 0 : 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>{" "}
          </span>
        ))}
      </motion.span>
    </>
  );
}
