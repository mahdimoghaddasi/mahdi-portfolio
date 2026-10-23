import { lazy, Suspense } from "react";
import { PageMeta } from "../components/layout/Layout";
import { site } from "../content/profile";
import { Hero } from "../sections/Hero";
import { FeaturedProjects } from "../sections/FeaturedProjects";
import { About } from "../sections/About";
import { Skills } from "../sections/Skills";
import { Contact } from "../sections/Contact";

const MotionLab = lazy(() => import("../features/playground/MotionLab"));

export function HomePage() {
  return (
    <>
      <PageMeta title={site.title} />
      <Hero />
      <FeaturedProjects />
      <About />
      <Skills />
      <Suspense
        fallback={
          <div className="container lab-loading" role="status">
            Loading the interaction lab…
          </div>
        }
      >
        <MotionLab />
      </Suspense>
      <Contact />
    </>
  );
}
