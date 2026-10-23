import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router";
import type { Project } from "../../content/projects";
import { projectSlots } from "../../content/projects";
import { profile } from "../../content/profile";
import { InteractiveSurface } from "../../components/motion/InteractiveSurface";

export function ConceptArtwork({ variant }: { variant: "layers" | "orbit" }) {
  return (
    <div className={`concept-art concept-${variant}`} aria-hidden="true">
      <div className="concept-grid" />
      {variant === "layers" ? (
        <div className="concept-stack">
          <div />
          <div />
          <div>
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : (
        <div className="concept-sphere">
          <div />
          <div />
          <div />
          <span>{profile.monogram}.</span>
        </div>
      )}
      <span className="art-corner">
        {variant === "layers" ? "FORM / STRUCTURE" : "MOTION / BALANCE"}
      </span>
      <span className="art-caption">CONCEPT ARTWORK</span>
    </div>
  );
}

export function ProjectPlaceholder({
  slot,
}: {
  slot: (typeof projectSlots)[number];
}) {
  return (
    <InteractiveSurface as="article" className="project-card placeholder-card">
      <ConceptArtwork variant={slot.artwork} />
      <div className="project-card-body">
        <div className="project-card-meta">
          <span>FUTURE CASE STUDY</span>
          <span>/{slot.id}</span>
        </div>
        <h3>{slot.title}</h3>
        <p>{slot.description}</p>
        <div className="project-pending">
          <Clock3 size={14} aria-hidden="true" /> Case study coming soon
        </div>
      </div>
    </InteractiveSurface>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images?.[0];
  return (
    <InteractiveSurface as="article" className="project-card real-project">
      {image ? (
        <img
          className="project-cover"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
        />
      ) : (
        <ConceptArtwork variant="layers" />
      )}
      <div className="project-card-body">
        <div className="project-card-meta">
          <span>{project.category}</span>
          {!image && <span>CONCEPT ARTWORK</span>}
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>
            {project.title}
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Link
          to={`/projects/${project.slug}`}
          className="text-link"
          aria-label={`View case study: ${project.title}`}
        >
          View case study <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </InteractiveSurface>
  );
}
