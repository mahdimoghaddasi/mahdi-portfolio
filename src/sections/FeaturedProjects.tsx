import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "../components/motion/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { projects, projectSlots } from "../content/projects";
import { publishedProjects } from "../lib/projects";
import {
  ProjectCard,
  ProjectPlaceholder,
} from "../features/projects/ProjectCard";

export function FeaturedProjects() {
  const published = publishedProjects(projects);
  const selected = published.filter((project) => project.featured).slice(0, 4);
  const featured = selected.length ? selected : published.slice(0, 2);
  return (
    <section
      className="section container"
      id="work"
      tabIndex={-1}
      aria-label="Selected work"
    >
      <Reveal>
        <SectionHeading
          number="01"
          label="SELECTED WORK"
          title="Built with purpose."
        >
          <Link className="text-link" to="/projects">
            Explore all work <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </SectionHeading>
      </Reveal>
      {!published.length && (
        <p className="section-intro">
          Every project has a story. Real case studies are being added here;
          these are clearly marked spaces for what’s next.
        </p>
      )}
      <div className="projects-grid">
        {featured.length
          ? featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))
          : projectSlots.map((slot, index) => (
              <Reveal key={slot.id} delay={index * 0.08}>
                <ProjectPlaceholder slot={slot} />
              </Reveal>
            ))}
      </div>
    </section>
  );
}
