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

function InterfaceStudy() {
  return (
    <div
      className="interface-study"
      role="img"
      aria-label="Original abstract interface study: layered panels and an orbital grid. Decorative concept artwork."
    >
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
    </div>
  );
}

export function Hero() {
  const emphasisIndex = profile.headline.indexOf(profile.headlineEmphasis);
  const headline =
    emphasisIndex >= 0 && profile.headlineEmphasis ? (
      <>
        {profile.headline.slice(0, emphasisIndex)}
        <span className="accent-serif">{profile.headlineEmphasis}</span>
        {profile.headline.slice(
          emphasisIndex + profile.headlineEmphasis.length,
        )}
      </>
    ) : (
      profile.headline
    );
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
          <h1 id="hero-title">{headline}</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <Link to="/projects" className="button button-primary">
              Explore my work <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
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
