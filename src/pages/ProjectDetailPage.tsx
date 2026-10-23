import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { projects } from "../content/projects";
import { publishedProjects } from "../lib/projects";
import { PageMeta } from "../components/layout/Layout";
import { NotFoundPage } from "./NotFoundPage";
import { ConceptArtwork } from "../features/projects/ProjectCard";
import { profile } from "../content/profile";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const published = publishedProjects(projects);
  const index = published.findIndex((project) => project.slug === slug);
  const project = published[index];
  if (!project) return <NotFoundPage />;
  const previous = published[index - 1];
  const next = published[index + 1];
  const sections = [
    { title: "The problem & constraints", text: project.problem },
    { title: "The approach", text: project.approach },
    { title: "Challenges & solutions", text: project.challenges },
    { title: "Outcomes & lessons", text: project.outcomes },
  ];
  return (
    <article className="container interior-page case-study">
      <PageMeta
        title={`${project.title} — ${profile.name}`}
        description={project.summary}
      />
      <Link className="text-link back-link" to="/projects">
        <ArrowLeft size={15} aria-hidden="true" /> All work
      </Link>
      <p className="eyebrow">{project.category} / CASE STUDY</p>
      <h1>{project.title}</h1>
      <p className="page-description">{project.summary}</p>
      <dl className="project-facts">
        {project.role && (
          <div>
            <dt>ROLE</dt>
            <dd>{project.role}</dd>
          </div>
        )}
        {project.timeframe && (
          <div>
            <dt>TIMEFRAME</dt>
            <dd>{project.timeframe}</dd>
          </div>
        )}
        {project.tags.length > 0 && (
          <div>
            <dt>TECH STACK</dt>
            <dd>{project.tags.join(" / ")}</dd>
          </div>
        )}
      </dl>
      {(project.demoUrl || project.sourceUrl) && (
        <div className="hero-actions">
          {project.demoUrl && (
            <a
              className="button button-primary"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit live project <ArrowUpRight size={17} />
            </a>
          )}
          {project.sourceUrl && (
            <a
              className="button button-secondary"
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              View source <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      )}
      {project.images?.length ? (
        <div className="case-images">
          {project.images.map((image) => (
            <figure key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
              <figcaption>{image.alt}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="case-concept">
          <ConceptArtwork variant="layers" />
          <p className="mono">
            Concept artwork · Project screenshots have not been supplied.
          </p>
        </div>
      )}
      <div className="case-story">
        {sections
          .filter((section) => section.text)
          .map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        {Boolean(project.features?.length) && (
          <section>
            <h2>Features & interactions</h2>
            <ul>
              {project.features?.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <nav className="project-pagination" aria-label="Case studies">
        {previous && (
          <Link to={`/projects/${previous.slug}`}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>
              <small>PREVIOUS PROJECT</small>
              {previous.title}
            </span>
          </Link>
        )}
        {next && (
          <Link to={`/projects/${next.slug}`}>
            <span>
              <small>NEXT PROJECT</small>
              {next.title}
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
        <Link to="/projects" className="text-link">
          Back to all work <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
}
