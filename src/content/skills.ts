export interface SkillGroup {
  title: string;
  items: { name: string; confirmed: boolean }[];
}

// Change confirmed to true ONLY after the owner confirms each personal skill.
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & UI",
    items: ["React", "TypeScript", "JavaScript", "Responsive UI"].map(
      (name) => ({ name, confirmed: false }),
    ),
  },
  {
    title: "Tools & styling",
    items: ["Vite", "Tailwind CSS", "State management"].map((name) => ({
      name,
      confirmed: false,
    })),
  },
  {
    title: "Product patterns",
    items: [
      "REST APIs",
      "Real-time features",
      "Authentication flows",
      "Dashboards",
      "PWA concepts",
    ].map((name) => ({ name, confirmed: false })),
  },
];

// These describe this codebase, not claims about the owner's professional skills.
export const portfolioStack = [
  { name: "React", detail: "Component-driven UI", symbol: "Re" },
  { name: "TypeScript", detail: "Explicit by design", symbol: "Ts" },
  { name: "Vite", detail: "A fast foundation", symbol: "Vi" },
  { name: "Tailwind CSS", detail: "A consistent visual system", symbol: "Tw" },
];
