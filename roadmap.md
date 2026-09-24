# AccessApply roadmap — prototype → working demo conversion

Audit existing app against the conversion brief, fill gaps, keep design.

- [ ] Audit all existing routes/components vs brief (preserve working pieces)
- [ ] Expand demo jobs to 8–10 realistic listings
- [ ] Verify/repair: search, filters, clear filters, empty states
- [ ] Verify accessibility settings work globally (font size, contrast, motion, spacing, large buttons, voice)
- [ ] Verify apply flow: prefs onboarding, 5 steps, validation+error explanation, save/restore draft, review with edit, confirm, submit
- [ ] Dashboard: applications with status, saved jobs, drafts, preferences section
- [ ] Add /about page if missing
- [ ] Demo mode indicator everywhere relevant
- [ ] Error handling: missing job, invalid route, storage failures, voice unsupported
- [ ] Full end-to-end demo run (Playwright): home → search Data Analyst → explain → apply → error → draft → review → confirm → success → dashboard
- [ ] Mobile/responsive check, no dead buttons, no console errors
