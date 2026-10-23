// Replace empty fields with public, approved information. Empty links stay hidden.
export const profile = {
  name: "Mahdi",
  monogram: "m",
  title: "Frontend Developer",
  greeting: "Hey, I'm Mahdi.",
  headline: "I engineer interfaces that feel as good as they work.",
  headlineEmphasis: "feel", // A word in headline to set in the accent typeface.
  description:
    "Thoughtful design. Solid engineering. I build usable, fast, interactive web experiences with React and TypeScript.",
  bio: "I'm Mahdi, a frontend developer focused on React and TypeScript. This is my space for exploring the intersection of clear structure, thoughtful design, and purposeful interaction.",
  email: "",
  locationLabel: "",
  githubUrl: "",
  linkedinUrl: "",
  resumePdfPath: "", // Add the real file to public/ before setting its path.
  portraitPath: "", // Optional; an original monogram is used until supplied.
  approach:
    "Good interfaces make complex things feel simple. I care about the small decisions: a clear hierarchy, a useful transition, and code that makes sense to the next person.",
  focus: [
    {
      title: "Interfaces with intention",
      description:
        "Clear layouts and responsive experiences that put people first.",
    },
    {
      title: "A considered foundation",
      description:
        "Reusable components, explicit types, and room for a product to grow.",
    },
    {
      title: "The details in between",
      description:
        "Useful feedback, keyboard access, and motion with a purpose.",
    },
  ],
  contactHeadline: ["Good things start", "with a conversation."],
  contactFallback:
    "Public contact details are being added. In the meantime, take a look around the lab and explore how this portfolio works.",
};

export const site = {
  title: `${profile.name} — ${profile.title}`,
  description:
    "Thoughtful interfaces. Purposeful interactions. A frontend portfolio built with React and TypeScript.",
  baseUrl: "", // Set a real https:// origin after choosing a domain; never invent one.
};
