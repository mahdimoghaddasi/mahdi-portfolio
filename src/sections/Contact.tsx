import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  GitFork,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";
import { Link } from "react-router";
import { profile } from "../content/profile";
import { Reveal } from "../components/motion/Reveal";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }
  return (
    <section
      className="contact-section container"
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <Reveal className="contact-inner">
        <div className="contact-decoration" aria-hidden="true">
          ↗
        </div>
        <p className="eyebrow">
          <span className="small-line" /> NEXT, A CONVERSATION
        </p>
        <h2 id="contact-title">
          {profile.contactHeadline[0]}
          <br />
          <span className="accent-serif">{profile.contactHeadline[1]}</span>
        </h2>
        {profile.email ? (
          <>
            <p>Have something in mind? I’d love to hear about it.</p>
            <div className="contact-actions">
              <a
                className="button button-primary"
                href={`mailto:${profile.email}`}
              >
                <Mail size={17} aria-hidden="true" /> {profile.email}{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="button button-secondary"
                onClick={copyEmail}
              >
                {copyState === "copied" ? (
                  <Check size={16} aria-hidden="true" />
                ) : (
                  <Copy size={16} aria-hidden="true" />
                )}
                Copy email
              </button>
            </div>
            <p className="copy-feedback" role="status">
              {copyState === "copied"
                ? "Email copied to clipboard."
                : copyState === "error"
                  ? `Copy unavailable. You can select this address: ${profile.email}`
                  : ""}
            </p>
          </>
        ) : (
          <>
            <p className="contact-description">{profile.contactFallback}</p>
            <Link to="/#lab" className="button button-secondary">
              Explore the motion lab{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <span className="contact-pending mono">
              CONTACT DETAILS COMING SOON
            </span>
          </>
        )}
        {(profile.githubUrl || profile.linkedinUrl) && (
          <div className="contact-socials">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                <GitFork size={17} /> GitHub <ArrowUpRight size={14} />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                <BriefcaseBusiness size={17} /> LinkedIn{" "}
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        )}
      </Reveal>
    </section>
  );
}
