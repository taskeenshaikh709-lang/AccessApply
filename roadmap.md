# AccessApply — quality pass (polished, production-ready)

Open items are ordered; work top to bottom and keep this list accurate.

## In progress
- [x] Journey cards clickable (Discover→/jobs, Understand→job page, Apply→apply form, Review→?step=5 review step, Confirm→/dashboard), hover lift + shadow, keyboard/screen-reader accessible links, arrow affordance
- [ ] Verify journey card links in browser (click each, review step deep-link, hover visuals)

## Visual polish
- [ ] 1a Homepage hero: cohesive gradient/badge/headline + subtle load fade-in on hero text and badge (respect reduced motion)
- [ ] 1b Journey section: verify reveal-on-scroll still works after link conversion
- [ ] 1c Job cards: hover lift (shadow + slight translateY) + skeleton loading placeholders before job cards render
- [ ] 1d Buttons/CTAs: consistent variants, hover/active/focus states, ≥44px tap targets
- [ ] 1e Spacing/consistency audit across home, jobs, job detail, apply flow
- [ ] 1f Jobs empty state: icon + "No jobs match your filters — try adjusting them" + working Clear filters

## Functionality
- [ ] 2a/2b Full apply flow e2e verify (Next/Back preserves data, review shows entered data, submit, dashboard status)
- [ ] 2c Verify every filter + Clear filters actually filter
- [ ] 2d Homepage interactive accessibility demo: live toggles (Larger text, High contrast, Voice reading) acting on a sample text block; site-wide settings persist across pages (verify)
- [ ] 2e Full button/link sweep: no dead ends, broken routes, or console errors

## Accessibility
- [ ] 3a Keyboard-only pass across home, jobs, filters, apply flow with visible focus
- [ ] 3b Screen-reader semantics audit (headings, labels, announcements)
- [ ] 3c WCAG AA contrast audit incl. high-contrast mode
- [ ] 3d Reduced motion honored everywhere

## Mobile & performance
- [ ] 4a Mobile pass (390px): home, jobs, filters, apply flow
- [ ] 4b Image optimization (assets used, compressed; likely none to fix)

## Final verification
- [ ] 5a Typecheck: zero errors
- [ ] 5b Simulated full user journey end-to-end (browser) with screenshots
- [ ] 5c No runtime errors/broken links
- [ ] 5d Short change summary + anything left for the user to check
