import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { PageMeta } from "../components/layout/Layout";
import { profile } from "../content/profile";

export function NotFoundPage() {
  return (
    <section className="container not-found">
      <PageMeta title={`Page not found — ${profile.name}`} />
      <span className="not-found-number" aria-hidden="true">
        404<span>.</span>
      </span>
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>This page is off the grid.</h1>
      <p>
        The link may have changed, or this case study isn’t published yet.
        <br />
        There’s still plenty to explore.
      </p>
      <div className="hero-actions">
        <Link to="/" className="button button-primary">
          <ArrowLeft size={17} aria-hidden="true" /> Back to home
        </Link>
        <Link to="/projects" className="button button-text">
          Explore work <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
