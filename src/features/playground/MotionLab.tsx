import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  Bookmark,
  Check,
  ChevronDown,
  Command,
  Layers2,
  RotateCcw,
  ToggleLeft,
} from "lucide-react";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Reveal } from "../../components/motion/Reveal";

const demos = [
  {
    id: "switch",
    label: "The switch",
    detail: "A little state change.",
    icon: ToggleLeft,
  },
  {
    id: "save",
    label: "The save",
    detail: "Feedback that feels right.",
    icon: Bookmark,
  },
  {
    id: "expand",
    label: "The reveal",
    detail: "Room for a little more.",
    icon: Layers2,
  },
] as const;
type Demo = (typeof demos)[number]["id"];

export default function MotionLab() {
  const systemReduced = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  const [demo, setDemo] = useState<Demo>("switch");
  const [enabled, setEnabled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [speed, setSpeed] = useState("calm");
  const motionOff = Boolean(systemReduced || reduced);
  const transition = {
    duration: motionOff ? 0 : speed === "calm" ? 0.35 : 0.14,
    ease: "easeInOut" as const,
  };
  function reset() {
    setEnabled(false);
    setSaved(false);
    setExpanded(false);
  }
  return (
    <section
      className="section container lab-section"
      id="lab"
      tabIndex={-1}
      aria-label="Interactive UI Motion Lab"
    >
      <Reveal>
        <SectionHeading
          number="04"
          label="THE INTERACTION PLAYGROUND"
          title="Small details. Big difference."
        >
          <p className="section-heading-note">
            A small experiment in how an interface feels.
            <br />
            Go on. Push a button.
          </p>
        </SectionHeading>
      </Reveal>
      <Reveal>
        <div className="lab-panel">
          <div className="lab-topbar">
            <span>
              <Command size={16} aria-hidden="true" /> UI MOTION LAB
            </span>
            <span className="lab-live">
              <span className="status-dot" /> INTERACTIVE DEMO
            </span>
          </div>
          <div className="lab-body">
            <div className="lab-sidebar">
              <p className="eyebrow">CHOOSE AN INTERACTION</p>
              <div
                className="demo-options"
                role="group"
                aria-label="Choose a demo"
              >
                {demos.map(({ id, label, detail, icon: Icon }, index) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={demo === id}
                    onClick={() => setDemo(id)}
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>
                      <strong>{label}</strong>
                      <small>{detail}</small>
                    </span>
                    <span className="demo-index">0{index + 1}</span>
                  </button>
                ))}
              </div>
              <p className="lab-sidebar-note">
                Built for the small moments
                <br />
                between action and response.
              </p>
            </div>
            <div className="lab-stage">
              <div className="lab-stage-grid" />
              <span className="lab-stage-label mono">
                PLAY / EXPLORE / REPEAT
              </span>
              <div className="demo-surface" key={demo}>
                {demo === "switch" && (
                  <>
                    <div className={`demo-icon ${enabled ? "is-enabled" : ""}`}>
                      <Command size={25} aria-hidden="true" />
                    </div>
                    <h3>Less noise. More focus.</h3>
                    <p>A small switch. A different state.</p>
                    <div className="switch-row">
                      <span id="focus-switch-label">Focus mode</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-labelledby="focus-switch-label"
                        className={`demo-switch ${enabled ? "on" : ""}`}
                        onClick={() => setEnabled(!enabled)}
                      >
                        <motion.span
                          animate={{ x: enabled ? 23 : 0 }}
                          transition={transition}
                        >
                          {enabled && <Check size={12} aria-hidden="true" />}
                        </motion.span>
                      </button>
                    </div>
                    <span className="demo-state" role="status">
                      {enabled
                        ? "Focus mode is on. A little more clarity."
                        : "Focus mode is off. Try the switch."}
                    </span>
                  </>
                )}
                {demo === "save" && (
                  <>
                    <div className={`demo-icon ${saved ? "is-enabled" : ""}`}>
                      <Bookmark
                        size={25}
                        fill={saved ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                    </div>
                    <h3>A little idea worth keeping.</h3>
                    <p>Good feedback closes the loop.</p>
                    <motion.button
                      type="button"
                      className={`button ${saved ? "button-secondary" : "button-primary"}`}
                      aria-pressed={saved}
                      onClick={() => setSaved(!saved)}
                      whileTap={motionOff ? undefined : { scale: 0.97 }}
                    >
                      {saved ? (
                        <Check size={17} aria-hidden="true" />
                      ) : (
                        <Bookmark size={17} aria-hidden="true" />
                      )}
                      {saved ? "Saved — undo?" : "Save this idea"}
                    </motion.button>
                    <span className="demo-state" role="status">
                      {saved
                        ? "Idea saved for this demo session."
                        : "Your next good idea starts here."}
                    </span>
                  </>
                )}
                {demo === "expand" && (
                  <>
                    <div className="demo-icon">
                      <Layers2 size={25} aria-hidden="true" />
                    </div>
                    <h3>There’s more to the story.</h3>
                    <p>Reveal it when you need it.</p>
                    <button
                      type="button"
                      className="expand-trigger"
                      aria-expanded={expanded}
                      aria-controls="reveal-content"
                      onClick={() => setExpanded(!expanded)}
                    >
                      A closer look{" "}
                      <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={transition}
                      >
                        <ChevronDown size={17} aria-hidden="true" />
                      </motion.span>
                    </button>
                    <motion.div
                      id="reveal-content"
                      initial={false}
                      animate={{
                        height: expanded ? "auto" : 0,
                        opacity: expanded ? 1 : 0,
                      }}
                      transition={transition}
                      className="expand-content"
                      inert={!expanded}
                    >
                      <div hidden={!expanded}>
                        <p>
                          A clear action. A considered response. Motion helps
                          connect the two, while keeping the content accessible
                          with motion turned off.
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
              <span className="stage-hint">
                <ArrowDown size={12} aria-hidden="true" />{" "}
                {demo === "switch"
                  ? "Try the switch"
                  : demo === "save"
                    ? "Try saving an idea"
                    : "Try revealing the details"}
              </span>
            </div>
          </div>
          <div className="lab-controls">
            <label className="motion-checkbox">
              <input
                type="checkbox"
                checked={motionOff}
                disabled={Boolean(systemReduced)}
                onChange={(event) => setReduced(event.target.checked)}
              />{" "}
              Reduce motion{systemReduced && <span> (system)</span>}
            </label>
            <div>
              <label className="speed-control">
                Timing{" "}
                <select
                  value={speed}
                  disabled={motionOff}
                  onChange={(event) => setSpeed(event.target.value)}
                >
                  <option value="calm">Calm</option>
                  <option value="quick">Quick</option>
                </select>
              </label>
              <button type="button" className="reset-button" onClick={reset}>
                <RotateCcw size={13} aria-hidden="true" /> Reset
              </button>
            </div>
          </div>
        </div>
        <p className="lab-footnote mono">
          REAL INTERACTIONS. LOCAL DEMO STATE. NOTHING SENT OR STORED.
        </p>
      </Reveal>
    </section>
  );
}
