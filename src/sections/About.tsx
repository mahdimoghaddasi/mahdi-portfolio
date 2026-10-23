import {
  ArrowDownToLine,
  ArrowUpRight,
  Braces,
  GitFork,
  BriefcaseBusiness,
} from "lucide-react";
import { Reveal } from "../components/motion/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { profile } from "../content/profile";
import { experience } from "../content/experience";

export function About() {
  return (
    <section
      className="section about-section container"
      id="about"
      tabIndex={-1}
      aria-label={`About ${profile.name}`}
    >
      <Reveal>
        <SectionHeading
          number="02"
          label="A LITTLE ABOUT ME"
          title="A person behind the pixels."
        />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-main">
          <div className="profile-intro">
            {profile.portraitPath ? (
              <img
                className="portrait"
                src={profile.portraitPath}
                alt={profile.name}
                width="72"
                height="72"
                loading="lazy"
              />
            ) : (
              <div className="monogram" aria-hidden="true">
                {profile.monogram}
                <span>.</span>
              </div>
            )}
            <div>
              <h3>{profile.name}</h3>
              <p className="mono">{profile.title}</p>
              {profile.locationLabel && <p>{profile.locationLabel}</p>}
            </div>
          </div>
          <p className="about-bio">{profile.bio}</p>
          <div className="profile-links">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                <GitFork size={16} /> GitHub <ArrowUpRight size={13} />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                <BriefcaseBusiness size={16} /> LinkedIn{" "}
                <ArrowUpRight size={13} />
              </a>
            )}
            {profile.resumePdfPath && (
              <a href={profile.resumePdfPath} download>
                <ArrowDownToLine size={16} /> Resume
              </a>
            )}
          </div>
        </Reveal>
        <Reveal className="approach-card">
          <Braces size={24} className="accent" aria-hidden="true" />
          <p className="eyebrow">THE WAY I THINK</p>
          <h3>
            Thoughtful on the surface.
            <br />
            Solid underneath.
          </h3>
          <p>{profile.approach}</p>
          <span className="approach-line" />
        </Reveal>
      </div>
      <Reveal>
        <div className="focus-heading">
          <span className="eyebrow">
            {experience.length ? "THE JOURNEY" : "WHAT I WORK ON"}
          </span>
          <span className="rule" />
        </div>
        {experience.length ? (
          <ol className="experience-list">
            {experience.map((item) => (
              <li key={item.id}>
                <span className="mono">{item.period}</span>
                <h3>
                  {item.role} · {item.organization}
                </h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="focus-grid">
            {profile.focus.map((item, i) => (
              <div key={item.title}>
                <span className="focus-number mono">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
