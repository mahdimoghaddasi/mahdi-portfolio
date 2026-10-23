# Verification — 2026-10-23

Phases 0 and 1 were implemented directly in `D:\myprojects\portfolio\mahdi-portfolio`. The brief was the only initial working file. The existing `.git` directory and `origin` remote were preserved. No commit, push, account login, purchase, DNS change, or deployment was performed.

## Environment and setup

- Original environment: Node **20.10.0**, npm **10.2.3**, Git **2.42.0.windows.2**.
- Registry-reported and installed Vite: **8.3.5**, requiring Node `^20.19.0 || >=22.12.0`. Original Node was incompatible.
- Remedy: official **Node 24.22.1** Windows x64 archive installed in ignored `.tools/`, with SHA-256 checked against the official Node HTTPS checksum list. Its bundled npm is **11.19.1**. The global Node installation was left unchanged.
- `scripts/use-local-node.ps1` activates/downloads that local runtime. `.nvmrc`, `.node-version`, package engines, and CI consistently select Node 24.
- Manually created the standard Vite/React/TypeScript scaffold in the root, avoiding a nested project and protecting the existing brief. The earlier failed generator command’s output was not available; the Node incompatibility is a confirmed setup issue rather than a claim about the exact earlier failure.
- Installed all requested runtime, styling, animation, routing, lint, and test dependencies. `package-lock.json` is present. Clean install reports **0 known vulnerabilities**.
- The initial starter passed typecheck, lint, its rendering smoke test, and production build before portfolio UI implementation. Vite startup and HTTP delivery were also verified at that stage.

## Final checks

| Check | Result | Evidence / scope |
| --- | --- | --- |
| `npm ci` | **Passed** | Clean install from the repository lockfile; 255 packages installed, 0 audit vulnerabilities |
| `npm run lint` | **Passed** | ESLint with `--max-warnings 0` |
| `npm run typecheck` | **Passed** | Strict app and Vite-config TypeScript checks |
| `npm run test` | **Passed** | **19 tests in 5 files**, Vitest non-watch mode |
| `npm run build` | **Passed** | Vite production bundle generated in `dist/` |
| `npm run dev -- --host 127.0.0.1` | **Passed** | Vite ready at `http://127.0.0.1:5173/`; HTTP 200 |
| `npm run preview -- --host 127.0.0.1` | **Passed** | Production preview at `http://127.0.0.1:4173/`; HTTP 200 |
| Production HTTP routes/assets | **Passed** | `/`, `/projects`, `/projects/a-missing-slug`, `/not-a-page`, SVG favicon, PNG preview, and robots file all served with expected MIME types |
| Production deep-link fallback | **Passed locally** | Missing project URL returns the same production app shell; route tests separately verify the branded React 404 |
| Cloudflare SPA build condition | **Passed** | `dist/index.html` exists; no top-level `dist/404.html` |
| Test-content isolation | **Passed** | Synthetic fixture titles/email absent from production JavaScript bundles |
| Social preview artwork | **Passed** | Original 1200×630 PNG generated and visually inspected |
| Real-browser visual/console QA | **Not run** | Browser inventory was empty; attempting to open an in-app preview returned `Browser is not available: iab` |
| Lighthouse | **Not run** | No browser available in this session |
| Hosted GitHub Actions / Cloudflare verification | **Not run** | Workflow and instructions prepared; no push/deployment authorized |

The owned local servers were stopped after verification. Start `npm run dev` to use the app again. Port numbers are observations from this session, not hard-coded promises.

The build contains a roughly **136.72 kB gzip** application bundle, **10.24 kB gzip** CSS, and a separately loaded **2.56 kB gzip** lab chunk. No remote fonts or heavyweight hero media are needed. These are build measurements, not Lighthouse scores.

## Test coverage

- Actual home rendering and transparent project/contact placeholders.
- Published-project name/technology search, combined category filtering, restored URL state, clear/reset, and preserving scroll while searching.
- Draft exclusion from results, categories, and direct case-study routes.
- Published detail sections/links, omitted optional sections, next/previous navigation, route focus, and unknown paths/slugs.
- Direct links to the lazy-loaded lab and focus on home sections reached from another route.
- Mobile disclosure Escape handling and restoring trigger focus.
- Keyboard switch activation, save/undo, expandable content, reset, timing selection, and reduced-motion control behavior.
- System reduced motion taking precedence over local controls.
- Theme persistence across mounts, live operating-system changes, listener cleanup, and blocked localStorage.
- Configured email links, clipboard success, and useful failure feedback.

Project and email fixtures exist only in tests. The real content arrays stay empty until the owner supplies approved information.

## Remaining review

### Follow-up: pnpm runtime selection

The user subsequently reproduced the `node:util` / `styleText` error by starting Vite under system Node 20.10.0. Added `devEngines.runtime` to pin Node 24.22.1 with pnpm-managed download, and updated the pnpm lockfile. Verified from a terminal using system Node 20.10.0 that `pnpm exec node --version` reports 24.22.1 and `pnpm dev` starts Vite successfully. Manual activation remains relevant only for npm commands. This supersedes the earlier per-terminal activation requirement for pnpm.

There is no known installation, type, lint, test, or build blocker. Real projects, public contact/social links, employment entries, confirmed personal skills, optional portrait/resume, and a production domain are intentionally pending. The README contains the full content checklist.

Before publishing, inspect the actual app at 320px/mobile, tablet, and desktop; test both themes, keyboard navigation, system reduced motion, the browser console, and Lighthouse. After an approved deployment, repeat direct-navigation/refresh checks on the actual Pages URL. No hosted behavior is claimed as verified by the local HTTP checks.
