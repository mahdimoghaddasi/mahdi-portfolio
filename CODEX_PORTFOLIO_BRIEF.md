# CODEX BUILD BRIEF — Mahdi's Interactive Developer Portfolio

> **Your role:** Act as a senior frontend engineer, UI/UX designer, and accessibility-minded technical lead. Build a polished, real, production-oriented portfolio application **in this repository**. This is an implementation request, not just a request for a plan.
>
> **Important — actual starting state:** The owner has created the GitHub repository only. They have **not** successfully initialized Vite or React locally; their attempt to run `npm create vite@latest mahdi-portfolio -- --template react-ts` failed. Assume there may be **no `package.json`, no `src/` directory and no installed dependencies**. You are responsible for scaffolding, installing, configuring and verifying the complete project, not just adding UI components. Preserve any existing `.git` directory and remote. Do not push commits, publish the site, buy a domain, or deploy without explicit user approval.

## 0. REQUIRED FIRST STEP — Phase 0: Bootstrap the actual application from an empty GitHub repository

**Do Phase 0 before implementing any UI. Do not assume the user has already created a React/Vite project or installed project dependencies.** The owner's prior `npm create vite@latest mahdi-portfolio -- --template react-ts` command failed; you must troubleshoot or bypass the failing bootstrap path yourself where the environment allows.

### 0.1 Inspect workspace and prerequisites

1. Inspect current working directory, `git status`, existing files, and `git remote -v`. Never overwrite existing work or delete the `.git` directory. Determine whether the workspace is already a checkout of the owner's existing GitHub repository. If a GitHub checkout is not available, use an existing supplied repository URL to clone it when permitted, or report the exact missing access; **never invent a username, remote URL or credentials**.
2. Check versions/availability of `node`, `npm` and `git` (`node --version`, `npm --version`, `git --version`). Check whether Node satisfies the *installed Vite version's* supported engine range, using official requirements and current versions rather than assuming compatibility.
3. If Node/npm are missing or incompatible, **attempt a safe, project-local or user-scoped remedy that this environment permits** (for example a preinstalled version manager). Never use `sudo`, global system changes, unsafe workarounds, disabling TLS verification or credential prompts without user authorization. If the agent cannot change the runtime, explain the exact blocker and actionable steps, rather than claiming dependencies were installed.

### 0.2 Scaffold React + TypeScript + Vite **in this repository**

- Scaffold in the **repository root**, not a nested `mahdi-portfolio/mahdi-portfolio` folder. If the checkout is empty, the normal command is `npm create vite@latest . -- --template react-ts` (or an equivalent documented method).
- If an existing `README.md`, `.gitignore` or other files prevent the generator from running in `.`, use a safe **temporary scaffolding directory** and integrate the generated application into the repository root without replacing `.git` or discarding valuable existing files. Alternatively, manually create the standard Vite/React/TS configuration if necessary.
- Inspect the actual error output from a failed command, identify its cause, try safe alternatives, and verify the resulting setup. Don't blindly repeat the same failed command. If network/registry restrictions make install impossible, describe this precisely and leave a reproducible scaffold with clear instructions.
- Keep the project's existing Git history and remote untouched; do not initialize a second nested Git repository.

### 0.3 **You** install and configure every required package

- Run `npm install` (or equivalent as appropriate) and ensure React, React DOM, Vite, TypeScript and React type packages are present and configured.
- Install/configure **Tailwind CSS** with its current supported Vite plugin, **Motion for React**, **React Router**, **Lucide React**, ESLint and relevant TypeScript/ESLint tooling.
- Install/configure **Vitest**, **React Testing Library**, **jest-dom**, **jsdom**, and any test-specific packages truly needed. Put runtime dependencies in `dependencies` and build/test tooling in `devDependencies`.
- Set up imports, styles, design tokens, router, entrypoints, `index.html`, static assets, working `.gitignore` and `package-lock.json`. Avoid unrelated dependencies and unnecessary scaffolding.
- Confirm real `package.json` scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, and `test` (with a non-watch CI-compatible invocation such as `vitest run`). Ensure scripts reflect actual installed tools.
- Create a small meaningful smoke test and ensure it can run. Do not fake passing test output.

### 0.4 Verify before declaring Phase 0 complete

1. Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`, and fix reproducible failures.
2. Check that `npm run dev` starts the Vite development server (within the agent's execution constraints); report the usable local URL if confirmed, usually `http://localhost:5173/` but do not assume its port.
3. Verify the app renders at least the starter application before proceeding with the portfolio features.
4. Provide a final short command/results summary for every check: **passed, failed or not run**, with a reason if not run. If network, OS permissions, or runtime limitations prevent completion, don't present the project as fully runnable.

**Success criterion:** From the repository root on a compatible Node environment, `npm ci && npm run dev` works, and the codebase has the required dependencies and lockfile. The user should not have to manually create Vite/React or choose packages.

---

## 1. Vision

Create an **interactive developer portfolio / personal web application** for **Mahdi**, a frontend developer focused on React and TypeScript. The portfolio should be convincing to recruiters, engineering managers, and fellow developers, while itself serving as a showcase of frontend craftsmanship.

**Positioning:** "I build thoughtful, fast, interactive web experiences."

This should **not** look like a generic resume template, empty dashboard, cyberpunk game, or overloaded animation demo. Aim for an elegant combination of editorial typography, thoughtful interaction, strong case-study storytelling, and excellent usability.

A portfolio is the core product. Genuine app-like interactions should enhance it, not overwhelm it. No backend, database, authentication, or admin dashboard is needed for v1.

## 2. Product principles

1. Make the work and the person easy to understand within 10 seconds.
2. Projects and real accomplishments matter more than decorative effects.
3. Every prominent UI control must actually work. No dead buttons or fake contact forms.
4. Favor speed, accessibility, SEO, and mobile quality over visual gimmicks.
5. Separate all editable personal content from components; make later edits straightforward.
6. Never invent employment, employers, project outcomes, dates, testimonials, clients, certifications, metric claims, or personal links.
7. Use honest, clearly marked placeholders where actual content is missing. A missing project/link must never masquerade as a real one.
8. Avoid exposing proprietary employer details or private project source code.

## 3. Tech stack

Use the most appropriate currently compatible stable versions. Respect what is already installed if starting from an existing repository.

- React + TypeScript + Vite
- Tailwind CSS using its current official Vite integration (`tailwindcss` + `@tailwindcss/vite` if appropriate)
- Motion for React (`motion` package, imports from `motion/react`) for intentional animations
- React Router for /, /projects, /projects/:slug, and a 404 route
- Lucide React for icons
- CSS variables/design tokens for theme colors, typography, borders, surfaces, spacing
- ESLint + TypeScript validation
- Vitest + React Testing Library for a few useful interaction tests
- GitHub Actions for continuous integration; deployment through Cloudflare Pages Git integration

Prefer native HTML/CSS and small purposeful dependencies. Avoid adding Redux, MobX, React Query, a UI framework, three.js, charting libraries, complex state libraries, or a CMS without a specific requirement. Use React state/context when sufficient.

## 4. Visual direction — "Precision, Motion, Personality"

- **Default:** refined dark theme; optional fully designed light theme.
- **Palette:** near-black navy background (`#090D15` direction), charcoal surfaces, off-white type, a restrained cyan / cool-blue accent (`#57E5DA` direction). Ensure contrast rather than blindly using these values.
- **Style:** premium product UI meets minimalist engineering portfolio; occasional thin blueprint-like grids and small technical annotations can add character. Avoid excessively neon colors, random glow, and excessive glassmorphism.
- **Typography:** very strong, well-spaced hero headline; clean sans-serif UI font, tasteful monospace for metadata/labels. Use legal, well-supported web fonts and robust fallbacks.
- **Layout:** generous spacing, clear reading hierarchy, a responsive bento-grid-like treatment where helpful, balanced asymmetry, neat borders, subtle lighting.
- **Motion:** smooth and calm. The site must still be excellent with animation disabled.
- **Originality:** do not clone a particular existing portfolio or import copyrighted screenshots. Use an original visual composition. If project imagery does not exist, use attractive abstract CSS/SVG previews **clearly identified as concept artwork**, not fabricated screenshots of supposed projects.

## 5. Site map and content structure

### A. Home (`/`)

**Top navigation**
- Minimal brand mark such as `M.` or `Mahdi / Developer`.
- Accessible navigation: Home, Work, About (can link to a home section), Contact.
- Theme toggle with persistent local preference; respects operating-system preference initially.
- Mobile menu with keyboard support and correct aria labeling.
- Small scroll progress indicator if it remains unobtrusive.

**Hero (high-priority)**
- Visually distinct heading that communicates frontend engineering, React/TypeScript, and attention to interaction.
- Suggested draft, editable in data: `Hey, I'm Mahdi.` / `I engineer interfaces that feel as good as they work.`
- One supporting sentence about building usable, performant, polished products. Avoid unsupported seniority claims.
- Primary CTA: `Explore my work` → work/projects.
- Secondary CTA: `Get in touch` → contact.
- Accessible social links only when the real URLs are provided.
- A thoughtful animated visual, such as a gently moving abstract grid/orb or an animated mini UI composition. Must never obstruct copy or degrade mobile performance.
- Do **not** display an "Open for work" badge without the user's explicit status.

**About / Snapshot**
- Short introduction in 2–3 sentences.
- A visually distinct card about approach (UI engineering, performance, maintainability, thoughtful interaction).
- Optional subtle reference to an interest in architectural structure and layout; do not overstate it as a professional specialization.
- No fake portrait. Offer a configurable portrait slot with a refined fallback monogram.

**Selected work**
- 2–4 featured project slots sourced from central content files.
- Cards show title, one-line problem, main technologies, and a meaningful view-details action.
- If projects are not yet provided, present explicit `Case study coming soon` slots; do not publish invented professional projects.

**Technical toolkit**
- Organized groups rather than misleading percentage skill bars.
- Initial areas to verify with the owner: React, TypeScript, JavaScript, Vite, Tailwind CSS, responsive UI, state management, REST APIs, real-time features, authentication flows, dashboards, PWA concepts.
- Only present technologies as personal skills after their data entries are marked `confirmed` in the content file. Reasonable project scaffolding is not evidence of professional mastery.
- Subtle hover/focus interactions; avoid endlessly spinning logos.

**Experience / Journey**
- Chronological timeline component driven by explicit data.
- When no employer names and dates are available, show a short general "What I work on" section instead of fabricating a timeline.

**Interactive Lab / Playground**
- A small but **genuinely functional** showcase module proving state/interaction ability. Choose one coherent experience and implement it well.
- Preferred idea: `UI Motion Lab` where users can switch between 2–3 small interface micro-interaction demos, toggle reduced motion, and see transitions. All controls accessible and touch-friendly.
- This is *not* a full code editor, chat bot, backend, fake analytics dashboard, or a distracting minigame.
- Keep it isolated and lazy-loaded if it adds significant bundle weight.

**Contact / footer**
- Strong closing CTA with an easy email link (only when a real email is configured).
- Social buttons only for real URLs supplied in site config.
- `Copy email` button if an email is set, with accessible feedback.
- Clear fallback copy when no contact data is supplied; no pretend form submission.
- Footer includes name and copyright year automatically based on the current date.

### B. Project index (`/projects`)

- Search projects by name or technology.
- Filter by tags/categories with an accessible segmented control or chip group.
- Query parameters can preserve filter/search state if not overcomplicated.
- Display an appropriate empty state.
- Each project card opens a working details route.

### C. Project detail (`/projects/:slug`)

A consistent case-study layout with the following optional sections, rendered only when real content is present:
- Overview / role / timeframe
- Problem and constraints
- Approach / architecture / technical decisions
- Features and key interactions
- Challenges and solutions
- Outcomes and lessons (no fake numbers)
- Tech stack
- Real screenshots (only when supplied)
- Source/demo links (only when approved and supplied)
- Next/previous project navigation and a return-to-projects link

Unknown slug → proper branded Not Found page; navigation/back still work.

### D. Not Found (`*`)

Polished 404 screen and a real return-home link.

## 6. Motion and interactions

Implement a **small, curated animation system**, not a different effect for every component:

- Initial hero text stagger/reveal with subtle opacity and vertical translate.
- A gentle background visual that can stop for reduced-motion users.
- Section entrance reveals only once, avoiding repeated motion on every scroll.
- Project cards: minimal elevation, image/preview movement, and focus state.
- Smooth but restrained page/route transitions (avoid scroll restoration bugs).
- Active navigation indicator or section highlighting when practical.
- Theme toggle with polished transitions and no flash of wrong theme on reload.
- Optional copy-to-clipboard feedback and subtle toast.
- **Required:** honor `prefers-reduced-motion`; preserve keyboard usability; avoid pointer-only and hover-only affordances; avoid unnecessary blur, expensive parallax, and layout thrash.

Motion should support comprehension. Do not use endless typewriter loops, forced scroll hijacking, autoplay audio, excessive animated particles, or giant 3D scenes.

## 7. Content architecture

Make personal information easy to change without editing JSX. Use something similar to:

```
src/
  app/
    App.tsx
    router.tsx
  components/
    layout/
    ui/
    motion/
  sections/
    Hero.tsx
    About.tsx
    FeaturedProjects.tsx
    Skills.tsx
    Experience.tsx
    Contact.tsx
  features/
    projects/
    playground/
    theme/
  pages/
    HomePage.tsx
    ProjectsPage.tsx
    ProjectDetailPage.tsx
    NotFoundPage.tsx
  content/
    profile.ts
    skills.ts
    projects.ts
    experience.ts
  hooks/
  lib/
  styles/
public/
docs/
  DEPLOYMENT.md
.github/
  workflows/
    ci.yml
```

Adjust this structure if the existing project suggests a simpler equivalent; avoid needless abstraction.

The profile content should support:

```ts
// Illustrative shape only; design the real types as needed.
export const profile = {
  name: 'Mahdi',
  title: 'Frontend Developer',
  headline: 'I engineer interfaces that feel as good as they work.',
  bio: '', // Owner to fill in
  email: '', // Never invent an email address
  locationLabel: '', // Optional; do not infer a precise location
  githubUrl: '',
  linkedinUrl: '',
  resumePdfPath: '', // Only show download when a real file exists
  portraitPath: '',
};
```

For projects use a typed array with `slug`, `title`, `summary`, `status` (`draft` | `published`), `tags`, `role`, `problem`, `approach`, `challenges`, `outcomes`, `images`, `demoUrl`, `sourceUrl`, and `featured`. **Only `published` entries are presented as real case studies.** When no published project exists, show transparent placeholders that do not route to nonexistent details.

Add concise comments in content files explaining how the owner can replace placeholders. Avoid scattering hardcoded mock content throughout components.

## 8. UX, accessibility, and performance requirements

- Responsive at mobile (320px+), tablet, laptop, desktop; no horizontal overflow.
- Semantic headings, landmarks, useful alt text, visible focus outlines, skip-to-content link, proper button/link semantics.
- Full keyboard operation of nav, project filtering, dialog/menu, and lab.
- Support light/dark/system theme and persist chosen preference locally.
- Honor reduced-motion preferences.
- Maintain strong text contrast and readable line lengths.
- Avoid content layout shift, heavyweight hero media, and unnecessary animation libraries.
- Lazy-load large images; use responsive sizes when images are available.
- Error-free browser console in normal usage.
- Use appropriate `title`, description, favicon, Open Graph/Twitter card metadata, social preview fallback, canonical URL once known, robots.txt, and sitemap when real base URL is available. Do not invent a production domain.
- Handle direct navigation and refresh on deep links on the chosen host.
- Target excellent Lighthouse results; prioritize genuine accessibility and usability over arbitrary scores.

## 9. Initial delivery: make it real

**Build the complete v1 interface now**, including actual working routes and at least one working interactive lab module. Do not stop after wireframes, a design plan, or just the hero section.

Suggested order:
1. **Complete Phase 0**: inspect/repair the environment; create Vite + React + TypeScript in the existing repo root; install and configure all packages; verify the baseline app.
2. Set up styling, design tokens and type safety.
3. Build navigation, hero, page structure, and reusable components.
4. Build project data model, listing, filtering, and detail routing.
5. Add a compact motion system and interactive lab.
6. Implement themes, accessibility, responsive behavior, SEO basics.
7. Add README, deployment guide, tests, and CI workflow.
8. Run available checks; fix any failures you can reproduce.

If useful existing code is present, evolve it incrementally instead of overwriting it.

## 10. CI / CD / domain approach

**Primary hosting recommendation:** Cloudflare Pages, connected to this GitHub repository.

This is the intended workflow:

```
local code → feature branch → GitHub Pull Request
                  ↓
           GitHub Actions CI
          lint / typecheck / test / build
                  ↓
         merge PR into main
                  ↓
     Cloudflare Pages automatic build/deploy
                  ↓
    temporary *.pages.dev address OR custom domain
```

### GitHub Actions — CI

Create `.github/workflows/ci.yml`:
- Trigger on pushes to `main` and pull requests targeting `main`.
- Use maintained official `actions/checkout` and `actions/setup-node` actions.
- Use a compatible supported Node LTS version and npm cache.
- Install with `npm ci` (commit `package-lock.json`).
- Run meaningful checks: `npm run lint`, `npm run typecheck`, tests in non-watch mode, and `npm run build`.
- Ensure the `package.json` scripts actually exist; no silently skipped checks.
- Do not add deployment secrets or an unnecessary second deployment pipeline. Cloudflare Pages handles the deployment when configured in its own dashboard.

### Cloudflare Pages — CD (document now, do not deploy autonomously)

Write beginner-friendly steps in `docs/DEPLOYMENT.md`:
1. Push the repository to GitHub.
2. Open Cloudflare dashboard → Workers & Pages → Create application → Pages → Import existing Git repository.
3. Authorize GitHub and select the repository.
4. Choose production branch `main`, build command `npm run build`, output directory `dist` (assuming standard Vite SPA).
5. Trigger the first build; explain where to find the `*.pages.dev` URL.
6. Explain branch/PR preview deployments and production deployments on updates to `main`.
7. Explain where build logs live and basic debugging.
8. Explain how to attach a **separately purchased** real domain through Pages → Custom domains and update required DNS/nameserver records according to the host's current dashboard instructions.
9. Mention HTTPS generally becomes managed by the host after successful domain setup. Do not claim a domain has been purchased or connected.
10. If routing needs host configuration for deep-link refresh, include and test the needed Cloudflare Pages SPA behavior.

Include a short glossary in **simple Persian** for: domain, hosting, DNS, GitHub, CI, CD, build, deployment, production, preview, and SSL/HTTPS. Preserve English technical terms alongside Persian explanations.

Never claim the user has hosting, a domain, or API keys already. Do not log in to accounts, modify DNS, or use paid services without explicit approval.

## 11. Future milestones (do **not** block v1)

**Phase 2 — app-like upgrades**
- English/Persian language switch with real translations and correct RTL layout (English-first content is fine for v1).
- Optional installable PWA with manifest, icons, well-tested caching, offline fallback and service worker update flow.
- Optional `Ctrl/Cmd + K` command palette for navigation and project search.
- Optional project case-study images and visual comparisons once actual assets are supplied.

**Phase 3 — only if useful**
- Real blog / writing section, CMS, real contact form with server-side spam mitigation, analytics with appropriate consent/privacy treatment.
- Backend features only when an actual user need emerges.

Do not implement speculative backend infrastructure just to make the portfolio seem like an app.

## 12. Definition of done

The first deliverable is complete when:

- [ ] Codex created the React + TypeScript + Vite application from scratch **inside the existing repository root**, installed/configured all required dependencies, and preserved Git history/remotes.
- [ ] `package-lock.json` exists; the app runs with `npm ci` and `npm run dev` on a compatible Node version.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test -- --run`, and `npm run build` pass (adjust test invocation consistently with chosen scripts).
- [ ] Home page is polished and displays meaningful, non-fabricated information.
- [ ] Projects index supports real search/filter state; real project routes work for published entries.
- [ ] Theme toggle persists and doesn't flash incorrectly on initial load.
- [ ] The interactive Lab works on keyboard, mouse, and touch.
- [ ] The UI works at mobile, tablet, and desktop breakpoints.
- [ ] Motion respects reduced-motion preferences.
- [ ] Links are functional; absent destinations are hidden or clearly disabled with explanation.
- [ ] 404 and refresh/deep-link behavior are considered.
- [ ] README has setup/commands, content editing instructions, and architecture overview.
- [ ] `docs/DEPLOYMENT.md` walks through Cloudflare Pages, domain, and CI/CD for a beginner.
- [ ] GitHub Actions workflow checks the application without deploying it.
- [ ] Provide a short final report: files created, design decisions, checks executed/results, missing real content needed from owner, and next recommended steps.

## 13. Content needed from the owner (don't block implementation)

Put these items in a clearly readable checklist in the README so the owner can fill them later:

1. Full public display name and preferred public job title.
2. A 2–3 sentence personal introduction.
3. GitHub and LinkedIn URLs.
4. Public contact email (or preferred safe contact method).
5. Actual professional roles, organizations (if public), dates and responsibilities.
6. Two to four portfolio project stories: problem, solution, role, stack, screenshots, outcomes, approved links.
7. Real resume PDF (only if ready to be public).
8. A real portrait (optional).
9. Preferred language(s) and whether Persian/RTL should become default.
10. Actual purchased domain name (only when ready).

If content is unavailable, use a professional layout with clearly indicated pending sections rather than generating a fake career history.

---

## Start now

**Start with Phase 0: inspect the repository, bootstrap Vite + React + TypeScript in the repository root, and install all dependencies yourself; then implement v1.** Make reasonable design decisions autonomously, write maintainable code, and verify the build. Ask questions only for truly blocking technical issues; unknown personal details should remain editable placeholders. Do not turn this request into another high-level planning document.

### Reference documentation (check latest versions if necessary)

- Tailwind with Vite: https://tailwindcss.com/docs/installation/using-vite
- Motion React: https://motion.dev/docs/react
- Cloudflare Pages Git deployment: https://developers.cloudflare.com/pages/configuration/git-integration/
- Cloudflare Pages React: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- GitHub Actions Node CI: https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs
