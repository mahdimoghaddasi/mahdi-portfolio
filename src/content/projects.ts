export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: "draft" | "published";
  tags: string[];
  category: string;
  role?: string;
  timeframe?: string;
  problem?: string;
  approach?: string;
  features?: string[];
  challenges?: string;
  outcomes?: string;
  images?: { src: string; alt: string; width: number; height: number }[];
  demoUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

// Add real project stories here. Drafts never appear in public listings or routes.
// Publish only after replacing the story, images, and links with approved material.
export const projects: Project[] = [];

// Original abstract compositions, explicitly labeled as concept artwork in the UI.
export const projectSlots = [
  {
    id: "01",
    title: "The story behind the interface.",
    description:
      "A space for the problem, the process, and the thoughtful decisions along the way.",
    artwork: "layers",
  },
  {
    id: "02",
    title: "From structure to experience.",
    description:
      "A space for a real project, its technical foundation, and the lessons learned.",
    artwork: "orbit",
  },
] as const;
