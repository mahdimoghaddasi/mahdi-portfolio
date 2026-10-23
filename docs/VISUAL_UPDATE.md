# Premium visual and motion update

This implements the owner's revised Phase 2 visual brief, rather than the earlier optional localization/PWA milestone. It improves the existing React architecture and retains all routes, content models, theme behavior, lab controls, and transparent placeholders.

- `KineticText`: staggered word reveals for the hero and section headings. A single screen-reader text preserves each heading's accessible name; visual word spans are hidden from assistive technology. Layout is reserved before the reveal.
- `Reveal`: shared one-time scroll entrances with reduced-motion timing, plus coordinated featured-card delays. Once revealed, content stays visible when scrolling back.
- `usePointerMotion`: fine-mouse/hover/no-reduced-motion gating, bounds measured on entry, spring rotation and Motion-value spotlight coordinates. Movement does not update React state or remeasure layout on each event. Touch events are ignored even on hybrid devices.
- `InteractiveSurface`: shared hero/card depth and local pointer lighting. Hero layers use different depths for parallax; project artwork separates subtly on hover. Both draft slots and published cards retain their original content/status.
- `Magnetic`: a small, spring-return displacement for the primary hero CTA; the native link and keyboard focus remain intact. No global custom cursor is introduced.
- `RouteEntrance`: short page entrances keyed by pathname, preserving filter/query state. Anchor navigation and reduced-motion preferences skip the entrance, and the existing focus/scroll behavior is retained. There is no delayed outgoing page competing for keyboard focus.
- Hero ambient loops use transforms/opacity, have an explicit pause/resume button, pause outside the viewport, and are disabled by the OS reduced-motion preference. Decorative orbit/shape motion is contained in the illustration.
- Typography, artwork lighting, section spacing, navigation underline/active states, button feedback, and card information transitions share the existing navy/turquoise identity. About, toolkit, and contact use more open compositions instead of repeating bordered panels. Light-theme tokens and mobile overrides remain supported.

## Validation

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`: passed after implementation. **24 tests in 7 files**, including new accessible headline/pause controls, pointer gating, cached measurement, and no React rerenders during movement.
- Existing route, filtering, keyboard focus, theme, lab, draft exclusion and clipboard tests remain passing.
- Production build: approximately **139.63 kB gzip** main JavaScript, **12.45 kB gzip** CSS, **2.56 kB gzip** lab chunk. No animation dependency was added. This is about 2.9 kB more gzipped application JavaScript than the prior implementation.
- Browser inventory is empty in this session. Real viewport screenshots, hover feel, touch-device behavior, screen-reader output, console inspection and frame/paint profiling remain unverified. Test coverage and source inspection do not substitute for those checks.

Before publishing, inspect 320px/mobile, tablet and desktop in both themes; exercise pointer entry/exit, keyboard links, anchors, project filtering, the pause control and OS reduced motion. Profile the local spotlight's paint cost on a slower device. Nothing has been pushed or deployed.
