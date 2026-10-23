import {
  ArrowUpRight,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { projects, projectSlots } from "../content/projects";
import { publishedProjects, filterProjects } from "../lib/projects";
import {
  ProjectCard,
  ProjectPlaceholder,
} from "../features/projects/ProjectCard";
import { PageMeta } from "../components/layout/Layout";
import { Reveal } from "../components/motion/Reveal";
import { profile } from "../content/profile";

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const published = publishedProjects(projects);
  const categories = [
    ...new Set(published.map((project) => project.category)),
  ].sort();
  const filtered = filterProjects(projects, query, category);
  const filtering = Boolean(query || category !== "all");
  function update(key: string, value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || (key === "category" && value === "all")) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  }
  return (
    <div className="container interior-page">
      <PageMeta
        title={`Work — ${profile.name}`}
        description={`Explore ${profile.name}’s project case studies, technical decisions, and interface experiments.`}
      />
      <Reveal>
        <p className="eyebrow">
          <span className="small-line" /> THE WORK
        </p>
        <h1>
          Ideas, brought
          <br />
          to <span className="accent-serif">the interface.</span>
        </h1>
        <p className="page-description">
          A closer look at the problems, the process, and the decisions behind
          the work.
        </p>
      </Reveal>
      <div className="project-filters">
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="project-search">
            Search projects by name or technology
          </label>
          <input
            id="project-search"
            type="search"
            placeholder="Search by project or technology…"
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => update("q", "")}
            >
              <X size={17} />
            </button>
          )}
        </div>
        <div
          className="filter-chips"
          role="group"
          aria-label="Project categories"
        >
          <SlidersHorizontal size={15} aria-hidden="true" />
          {["all", ...categories].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              onClick={() => update("category", value)}
            >
              {value === "all" ? "All work" : value}
            </button>
          ))}
        </div>
      </div>
      <p className="results-count mono" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "case study" : "case studies"}
        {filtering ? " found" : " published"}
        {category !== "all" && !categories.includes(category)
          ? ` · Unknown category: ${category}`
          : ""}
      </p>
      {!filtering || filtered.length > 0 ? (
        <h2 className="sr-only">Project results</h2>
      ) : null}
      {filtered.length > 0 ? (
        <div className="projects-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : filtering ? (
        <div className="empty-state">
          <SearchX size={30} aria-hidden="true" />
          <h2>No matching projects.</h2>
          <p>Try a different name, technology, or category.</p>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setSearchParams({})}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="work-pending-note">
            <span className="status-dot" />
            <p>
              <strong>The stories are still to come.</strong> Project details
              haven’t been supplied yet. These slots are concept artwork, ready
              for real work.
            </p>
          </div>
          <div className="projects-grid">
            {projectSlots.map((slot) => (
              <ProjectPlaceholder key={slot.id} slot={slot} />
            ))}
          </div>
          <div className="index-lab-link">
            <span>Something you can try right now.</span>
            <Link to="/#lab" className="text-link">
              Explore the motion lab{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
