import type { Project } from "../content/projects";

// Synthetic test data only. Never imported by application entrypoints.
export const projectFixtures: Project[] = [
  {
    slug: "fixture-alpha",
    title: "Fixture Alpha",
    summary: "A synthetic UI story for route testing.",
    category: "Interface",
    tags: ["React", "TypeScript"],
    status: "published",
    featured: true,
    role: "Test role",
    problem: "A fixture constraint.",
    approach: "A fixture decision.",
    outcomes: "A fixture lesson.",
    demoUrl: "https://example.test/demo",
  },
  {
    slug: "fixture-beta",
    title: "Fixture Beta",
    summary: "A synthetic tool story for filter testing.",
    category: "Tool",
    tags: ["JavaScript", "Vite"],
    status: "published",
    featured: false,
  },
  {
    slug: "private-fixture",
    title: "Private fixture draft",
    summary: "Must never render publicly.",
    category: "Private",
    tags: ["React"],
    status: "draft",
    featured: true,
    problem: "Private fixture content.",
  },
];
