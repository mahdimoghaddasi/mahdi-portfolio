# Mahdi’s interactive portfolio

React + TypeScript + Vite, initialized directly in this repository. The original brief and Git history/remote are preserved. Phases 0 and 1 implement the complete v1 portfolio; translations, PWA, command palette, and backend features are left for later milestones.

## Run locally

Use **Node.js 24 LTS** and npm. The installed Vite 8 engine requires Node `^20.19.0 || >=22.12.0`; this project standardizes on supported Node 24 in `.nvmrc`, `.node-version`, `package.json`, and CI. Your original Node 20.10.0 was incompatible ([Vite requirements](https://vite.dev/guide/)).

On this Windows checkout, use the repository-local runtime without changing the system installation:

```powershell
. ./scripts/use-local-node.ps1
npm ci
npm run dev
```

Dot-source the script again in each new PowerShell terminal. If the portable runtime is missing, the script downloads the official Windows x64 Node 24 archive and verifies its SHA-256 against Node’s HTTPS checksum list before extraction. Files stay in ignored `.tools/`. It does not change execution policy or global settings. If your organization blocks PowerShell scripts, use an already approved Node 24 installation instead of bypassing its policy.

On macOS/Linux or with an existing Node 24 installation:

```sh
# If you use nvm: nvm install && nvm use
npm ci
npm run dev
```

Open the **Local** URL printed by Vite. The verified port was 5173; Vite can select another port if occupied. To preview the production build, run `npm run build` followed by `npm run preview`.

You can also run the installed project with **pnpm** (12.15.0 installed for this Windows user):

```powershell
pnpm dev
```

pnpm automatically uses **Node 24.22.1**, pinned through `devEngines.runtime` in `package.json` and recorded with a checksum in `pnpm-lock.yaml`. No manual Node activation is needed for pnpm commands, even when `node --version` in the terminal reports the older system version. The first installation may download the runtime. On a fresh checkout, run `pnpm install --frozen-lockfile` first. This uses pnpm’s [documented runtime management](https://pnpm.io/package_json#devenginesruntime).

The same scripts work as `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm test`. For npm commands, still activate Node 24 using the helper above. CI continues to use `npm ci` and `package-lock.json`. If you change dependencies, keep both lockfiles synchronized (update through npm, then run `pnpm import` and `pnpm install`) until choosing a single package manager for the repository.

| Command              | Purpose                                               |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Vite development server with hot updates              |
| `npm run typecheck`  | Strict TypeScript checks for app and Vite config      |
| `npm run lint`       | ESLint, TypeScript, React hooks and refresh rules     |
| `npm run test`       | Vitest + Testing Library, non-watch and CI compatible |
| `npm run test:watch` | Interactive test runner                               |
| `npm run build`      | Typecheck and produce `dist/`                         |
| `npm run preview`    | Serve the production build locally                    |

## What’s included

- Home with an original CSS interface illustration, work slots, about/approach, toolkit, motion lab, and honest contact fallback.
- `/projects` with name/technology search, category filtering, clear actions, empty states, and URL query persistence.
- `/projects/:slug` with conditional case-study sections, approved links/images, and previous/next navigation. Drafts and unknown slugs show the branded 404.
- Light/dark/system theme, persisted locally, with a head script to apply the correct color before React loads. A first visit follows the operating system; dark is used when no light preference is indicated.
- Three real local-state lab demos: focus switch, save/undo, and expandable details, with reset, timing selection, and reduced-motion controls. System reduced motion always takes priority.
- Responsive layout from 320px, semantic landmarks, skip link, visible focus, keyboard controls, mobile disclosure menu with Escape, and section focus after navigation.
- Original SVG favicon and PNG social fallback, route titles/descriptions, robots file, and optional canonical metadata when a real base URL is configured.
- GitHub Actions CI and a [Cloudflare Pages deployment guide](docs/DEPLOYMENT.md), with a Persian glossary. Nothing has been pushed, purchased, or deployed.

## Edit personal content

All personal information belongs in `src/content/`:

| File            | What to change                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `profile.ts`    | Public name/title, hero copy, bio, approach, focus areas, contact, links, portrait/resume paths, production base URL    |
| `projects.ts`   | Real project case studies and explicitly labeled concept placeholders                                                   |
| `skills.ts`     | Set individual `confirmed` flags only after confirming personal skills; the portfolio’s own stack is separately labeled |
| `experience.ts` | Real public roles and dates; an empty array shows general focus areas                                                   |

Empty contact/social/resume fields hide their controls. An empty portrait field uses a monogram. Add an actual resume or portrait to `public/` before setting its `/filename` path. Nothing implies availability for work, seniority, employers, or results that haven’t been supplied.

To publish a case study, add a typed `Project` entry to `projects`, use a unique URL-safe slug, write its real title/summary/category/tags, and set `status: 'published'`. Keep unfinished entries `draft`. Optional fields render only when populated: `role`, `timeframe`, `problem`, `approach`, `features`, `challenges`, `outcomes`, `images`, `demoUrl`, `sourceUrl`. For each image provide meaningful alt text and its actual width/height. Use only approved public source/demo links. Set `featured: true` to select it for home (up to four). With no featured entries, home selects the first two published projects.

There are currently **no real project stories, contact links, confirmed personal skills, or employment entries**. Search/filter/detail behavior is tested using fixtures isolated to test files; those fixtures never ship as portfolio content.

## Architecture

```text
src/
  app/                  App providers, route map, smoke test
  components/           Shared layout, metadata, reveals, section headings
  content/              Editable personal content and typed models
  features/
    playground/         Lazy-loaded UI Motion Lab
    projects/           Cards and original CSS concept artwork
    theme/              Theme state, system listener, accessible select
  lib/                  Published-project selection and filtering
  pages/                Home, project index/detail, 404
  sections/             Home sections
  styles/               Tailwind entrypoint, design tokens, responsive styles
  test/                 DOM environment setup and test-only fixtures
public/                 Static assets and robots.txt
scripts/                Optional repository-local Windows Node setup
.github/workflows/      CI checks only
```

The theme uses React context; demo state stays inside the lab. CSS variables define both themes. Motion uses `motion/react` with reduced-motion handling; hero movement is a short, finite animation. No remote fonts, copied screenshots, backend, analytics, authentication, or paid services are required.

## Verification and limits

See [the implementation review](docs/REVIEW.md) for the current requirement matrix, review fixes, and remaining acceptance work.

See [docs/VERIFICATION.md](docs/VERIFICATION.md) for executed commands/results. Automated checks cover rendering, routing, unpublished content, filtering/query state, keyboard interactions, theme persistence/system changes, reduced motion, and email-copy success/failure. Browser tools were unavailable in the implementation session, so actual viewport screenshots, browser console checks, and Lighthouse were **not run**. Before publishing, manually check 320px/mobile, tablet, and desktop, both themes, keyboard navigation, and system reduced motion.

For Cloudflare Pages SPA refreshes, keep `dist/` free of a top-level `404.html`. Cloudflare then serves the app shell for deep links. The React 404 remains a client-rendered page; a static SPA does not provide an HTTP 404 status for unknown application routes. No hosting configuration has been changed.

## Content to supply

- [ ] Confirm full public display name and preferred job title.
- [ ] Replace/approve the draft 2–3 sentence introduction and approach text.
- [ ] Supply public GitHub and LinkedIn profile URLs.
- [ ] Supply a public contact email or preferred safe contact method.
- [ ] Add real public roles, organizations, dates, and responsibilities.
- [ ] Add 2–4 actual project stories: problem, solution, role, stack, screenshots, lessons/outcomes, and approved links.
- [ ] Confirm each personal toolkit skill before enabling its flag.
- [ ] Supply a resume PDF if ready for public download.
- [ ] Optionally supply a real portrait.
- [ ] Confirm preferred languages and whether Persian/RTL should become default in Phase 2.
- [ ] Supply the purchased domain only when ready. Then set `site.baseUrl`, set absolute social-image/URL metadata in `index.html`, and generate a sitemap containing only actual published routes.

The relative PNG social image is a development fallback. Run `./scripts/generate-social-preview.ps1` on Windows to regenerate it after changing its copy. Provide an absolute public image URL in the final production metadata before sharing. No invented canonical URL or sitemap is included.
