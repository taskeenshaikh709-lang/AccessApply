# AccessApply roadmap — prototype → working demo conversion

## Round 2 (user's improvement list, 26 Sep)

- [ ] 1. Journey cards clickable → Discover/Understand/Apply/Review/Confirm (links added; verifying click-through)
- [ ] 2. Full apply flow works end-to-end with real data → submit → dashboard status
- [ ] 3. Job cards: hover lift + shadow, skeleton loading state, View Job opens correct job
- [ ] 4. Filters actually filter (location, type, mode, experience, skills, salary, accessibility count) + Clear filters + friendly empty state with icon
- [ ] 5. Interactive accessibility demo on homepage (Larger text / High contrast / Voice reading on a sample block, live)
- [ ] 6. Accessibility settings persist and apply across all pages
- [ ] 7. Consistent spacing/padding across homepage + jobs page
- [ ] 8. Mobile: homepage, jobs listing, job cards, apply flow clean at phone widths, forms usable
- [ ] 9. No broken links or dead buttons anywhere
- [ ] Each page has a real h1 (jobs + dashboard currently start at h2)
- [ ] Final: re-run full journey browse → filter → job → apply → review → submit → dashboard, no typecheck/runtime errors

## Round 1 (done)

- [x] Audit existing routes/components vs brief (kept design, no rewrites of working pieces)
- [x] 10 realistic demo jobs (added Software Engineer, Data Scientist, Backend Developer, QA Engineer, Business Analyst, Product Designer)
- [x] Search + filters + clear filters + empty state verified
- [x] Accessibility settings verified global (font size xl + high contrast confirmed in browser, persisted)
- [x] Apply flow verified: onboarding, validation + Explain this error, save/restore draft, review with edit, confirm checkbox guard, submission
- [x] Dashboard: applications with status, saved jobs section, accessibility preferences section
- [x] Saved jobs feature (save/unsave on job page, dashboard list, remove)
- [x] /about page + nav link
- [x] Success page shows submission date
- [x] Missing job → proper 404 page
- [x] End-to-end demo run passed, no console errors (only expected 404 on missing-job test)
- [x] Mobile check: no horizontal overflow on any route
