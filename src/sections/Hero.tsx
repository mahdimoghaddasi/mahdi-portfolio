import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Component,
  MousePointer2,
} from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "../components/motion/Reveal";
import { profile } from "../content/profile";
import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import {
  InteractiveSurface,
  Magnetic,
} from "../components/motion/InteractiveSurface";
import { KineticText } from "../components/motion/KineticText";

function InterfaceStudy() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const shell = useRef<HTMLDivElement>(null);
  const visible = useInView(shell, { margin: "80px" });
  return (
    <>
      <div ref={shell} className={paused || !visible ? "is-paused" : undefined}>
        <InteractiveSurface className="study-scene" strength={5}>
          <div
            className="interface-study"
            role="img"
            aria-label="Original abstract interface study: layered panels and an orbital grid. Decorative concept artwork."
          >
            <div className="study-aura" aria-hidden="true" />
            <div className="study-beam" aria-hidden="true" />
            <div className="study-grid" />
            <div className="study-cross cross-one">+</div>
            <div className="study-cross cross-two">+</div>
            <div className="study-label">
              <span className="status-dot" /> INTERACTION STUDY <span>001</span>
            </div>
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <div className="study-card study-card-back">
              <div className="study-window">
                <i />
                <i />
                <i />
              </div>
              <div className="study-skeleton" />
              <div className="study-skeleton short" />
            </div>
            <div className="study-card study-card-front">
              <div className="study-card-title">
                <Component size={19} />
                <span>Thoughtful by design.</span>
                <span className="tiny-code">↗</span>
              </div>
              <div className="study-composition">
                <div className="study-shape shape-one" />
                <div className="study-shape shape-two" />
                <div className="study-shape shape-three" />
                <div className="study-center">
                  {profile.monogram}
                  <span>.</span>
                </div>
              </div>
              <div className="study-card-bottom">
                <span>
                  <i /> Details make the difference
                </span>
                <Braces size={16} />
              </div>
            </div>
            <div className="study-cursor">
              <MousePointer2 size={21} fill="currentColor" />
              <span>Make it feel right.</span>
            </div>
            <div className="study-footnote">
              <span>FORM + FUNCTION</span>
              <span>REACT / TYPESCRIPT</span>
            </div>
            <div className="study-token token-structure" aria-hidden="true">
              <Braces size={15} /> Structure<span>01</span>
            </div>
            <div className="study-token token-interaction" aria-hidden="true">
              <Component size={15} /> Interaction<span>02</span>
            </div>
          </div>
        </InteractiveSurface>
      </div>
      <button
        type="button"
        className="ambient-control"
        aria-pressed={paused || Boolean(reduced)}
        disabled={Boolean(reduced)}
        onClick={() => setPaused(!paused)}
      >
        {reduced
          ? "Motion reduced by system"
          : paused
            ? "Resume ambient motion"
            : "Pause ambient motion"}
        <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
      </button>
    </>
  );
}

export function Hero() {
  return (
    <section
      className="hero container"
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow">
            <span className="small-line" /> {profile.title}{" "}
            <span className="muted">/ React & TypeScript</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="hero-greeting">{profile.greeting}</p>
          <h1 id="hero-title">
            <KineticText
              text={profile.headline}
              emphasis={profile.headlineEmphasis}
            />
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <Magnetic>
              <Link to="/projects" className="button button-primary">
                Explore my work <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </Magnetic>
            <Link to="/#contact" className="button button-text">
              Get in touch <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-art" delay={0.18}>
        <InterfaceStudy />
      </Reveal>
      <div className="hero-bottom">
        <a href="#work">
          <ArrowDown size={14} aria-hidden="true" /> A little further down
        </a>
        <span className="mono">
          THOUGHTFUL INTERFACES. PURPOSEFUL INTERACTIONS.
        </span>
      </div>
    </section>
  );
}
