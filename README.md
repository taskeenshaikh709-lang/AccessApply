# Access Apply

MASTER PROMPT — ACCESSIBLE JOB APPLICATION PLATFORM

Build a complete, modern, fully functional web application for the hackathon problem statement:

“Accessible Job Applications for People with Disabilities”

PROJECT GOAL
Create an accessibility-first job application platform that helps people with different disabilities move through the complete journey:

Discover Job → Understand Job → Start Application → Fill Form → Get Guidance → Review → User Confirmation → Submit

IMPORTANT:
This is NOT just another job portal.
This is NOT another screen reader.
This is NOT just a chatbot.
The main idea is to make the complete job application journey easier to understand, navigate and complete.

The website should be a polished hackathon-ready working prototype with realistic interactions, sample jobs and a simulated application system.

==================================================
1. DESIGN DIRECTION
==================================================

Create a professional, modern, premium accessibility-focused UI.

Style:
- Clean
- Minimal
- Friendly
- Trustworthy
- Technology-focused
- Inclusive
- Professional enough for a hackathon demo

Color palette:
- Background: #F8F7FC
- Primary text: #17152B
- Purple: #6C4AB6
- Lavender: #E9E1F7
- Soft blue: #DCEBFA
- Secondary text: #555264
- White cards
- Subtle borders
- Soft shadows

Avoid:
- Dark cyberpunk design
- Neon colors
- Excessive gradients
- Excessive 3D
- Clutter
- Tiny text
- Decorative elements behind important text

Use:
- Rounded cards
- Large readable typography
- Strong visual hierarchy
- Plenty of whitespace
- Clear buttons
- Accessible contrast
- Simple icons
- Subtle animations

Typography:
- Headings: Poppins or Montserrat
- Body: Inter or Open Sans

Make the design responsive for:
- Desktop
- Tablet
- Mobile

==================================================
2. CORE ACCESSIBILITY REQUIREMENTS
==================================================

Accessibility is the MAIN feature of the website.

Implement:

1. Keyboard navigation
- Entire website should be usable with keyboard
- Visible focus indicators
- Logical tab order
- No keyboard traps
- Enter/Space should activate appropriate controls

2. Screen-reader friendly structure
- Semantic HTML
- Proper headings
- Proper labels
- Accessible buttons
- ARIA only where necessary
- Meaningful alt text
- Proper form labels
- Status messages for dynamic content

3. Visual accessibility
Provide an Accessibility Settings panel with:

- Font size: Small / Medium / Large / Extra Large
- High contrast mode
- Reduced motion
- Increased text spacing
- Dyslexia-friendly font option
- Focus highlight
- Reset accessibility settings

4. Application accessibility
- One-question-at-a-time option
- Clear progress indicator
- Simple instructions
- Required fields clearly identified
- Friendly error messages
- Error summary
- Focus automatically moves to relevant errors
- Save progress
- Back/Next navigation
- Review before submission

5. Optional voice interaction
Voice assistance should be OPTIONAL.

Do NOT make voice control mandatory.

Provide:
“Enable Voice Assistance”

Possible commands:
- “Read this job”
- “Next”
- “Previous”
- “Explain this”
- “Help”
- “Go to skills”
- “Read error”
- “Save application”

If browser speech APIs are unavailable, provide a graceful fallback.

==================================================
3. WEBSITE STRUCTURE
==================================================

Create these main pages:

1. Landing Page
2. Job Search
3. Job Details
4. Application Assistant
5. Application Form
6. Review & Confirmation
7. Application Submitted
8. Accessibility Settings
9. Candidate Dashboard
10. About / How It Works

Use a consistent navbar.

Navbar:

LOGO:
AccessApply

Navigation:
- Home
- Find Jobs
- My Applications
- Accessibility
- How It Works

Right side:
- Accessibility button
- Profile

Mobile:
Use a clean hamburger menu.

==================================================
4. LANDING PAGE
==================================================

Hero heading:

“Accessible Job Applications for Everyone.”

Subtitle:

“Find opportunities, understand requirements, and complete applications with accessibility support built into every step.”

Primary CTA:
“Find Accessible Jobs”

Secondary CTA:
“How It Works”

Hero visual:
Show an inclusive job application interface with accessibility controls.

Below hero create:

SECTION: “One Journey. Fewer Barriers.”

Show:

01 — Discover
Find suitable jobs.

02 — Understand
Get job requirements explained clearly.

03 — Apply
Complete the application with accessibility support.

04 — Review
Check your answers before submitting.

05 — Confirm
The user remains in control of final submission.

==================================================
5. JOB SEARCH PAGE
==================================================

Create a realistic job-search experience.

Search bar:
“Search jobs, skills or companies”

Filters:
- Location
- Job type
- Remote / Hybrid / On-site
- Experience
- Skills
- Accessibility support
- Salary

Create realistic sample jobs.

Examples:

Frontend Developer
Company: TechNova
Location: Mumbai / Remote
Experience: 0–2 years

Data Analyst
Company: InsightWorks
Location: Remote
Experience: 0–2 years

Python Developer
Company: CloudCore
Location: Bengaluru / Hybrid
Experience: 1–3 years

UI/UX Designer
Company: PixelCraft
Location: Remote
Experience: 0–2 years

Each job card should show:
- Job title
- Company
- Location
- Job type
- Experience
- Skills
- Salary
- Accessibility indicators
- “View Job” button

Do NOT claim that these are real job listings.
Clearly mark them as demo/sample jobs.

==================================================
6. JOB DETAILS PAGE
==================================================

When user clicks “View Job”, show:

- Job title
- Company
- Location
- Job type
- Salary
- Experience
- Skills
- Job description
- Responsibilities
- Requirements
- Benefits

IMPORTANT FEATURE:

Create an:

“Explain This Job”

button.

When clicked, show a simplified explanation:

“What will I actually do?”

“What skills are required?”

“What skills are preferred?”

“What experience is required?”

“Is this role suitable for a beginner?”

Use simple language.

Also provide:

“Read Job Aloud”

button.

“Start Accessible Application”

button.

==================================================
7. JOB REQUIREMENT EXPLANATION
==================================================

Create a dedicated AI-style assistance panel.

Example:

Original:
“Proficiency in Python and experience with RESTful APIs preferred.”

Simplified:
“Python skills are useful for this job. Experience working with APIs is preferred but may not be mandatory.”

IMPORTANT:
Do not invent requirements.

Only simplify the information already present in the demo job.

Clearly distinguish:

REQUIRED
- Python
- Basic SQL

PREFERRED
- REST APIs
- Cloud experience

This distinction is a major feature.

==================================================
8. APPLICATION ASSISTANT
==================================================

When the user clicks:

“Start Accessible Application”

show an onboarding screen.

Title:

“Let’s make this application work for you.”

Ask:

“How would you like to use the application?”

Options:

□ Keyboard
□ Screen Reader
□ Visual Assistance
□ Voice Assistance
□ Simplified Reading
□ Standard Mode

Allow multiple selections.

Do not force the user to disclose a disability.

Text:

“You can choose the assistance that works best for you. You do not need to provide medical or disability information.”

Then:

“Continue”

==================================================
9. APPLICATION FORM
==================================================

Build a realistic multi-step application.

Progress:

Step 1 of 5
Personal Information

Step 2 of 5
Experience

Step 3 of 5
Skills

Step 4 of 5
Questions

Step 5 of 5
Review

Do NOT make one giant form.

Use clear sections.

Personal information:
- Full name
- Email
- Phone
- Location

Experience:
- Education
- Experience
- Projects

Skills:
- Python
- SQL
- JavaScript
- Other skills

Application questions:
Use realistic questions.

Every field must have:
- Proper label
- Helpful description
- Required/optional indicator
- Accessible error message

==================================================
10. AI APPLICATION GUIDANCE
==================================================

Create an assistant panel called:

“Application Guide”

The assistant can explain:

- What this question means
- What information is required
- Why a field is required
- How to fix an error
- Explain difficult terminology

Example:

User:
“What does this question mean?”

Assistant:
“This question asks about your previous experience using Python. You can mention college projects, internships or personal projects.”

IMPORTANT:
The assistant should NOT automatically submit the application.

It should assist the user.

==================================================
11. ERROR HANDLING
==================================================

Do NOT use generic errors like:

“Invalid input.”

Instead use:

“Please enter a valid email address, for example:
name@example.com”

Show:
- What is wrong
- How to fix it
- Focus on the problematic field

Provide:

“Explain this error”

button.

==================================================
12. SAVE PROGRESS
==================================================

Allow:

“Save & Continue Later”

Show:

“Your application has been saved.”

Use localStorage or another simple persistence method for the prototype.

==================================================
13. REVIEW PAGE
==================================================

Before submission show:

“Review Your Application”

Sections:

Personal Information
Experience
Skills
Application Questions

Each section has:

Edit

button.

Show a final accessibility reminder:

“Please review your answers before submitting.”

==================================================
14. USER-CONTROLLED SUBMISSION
==================================================

This is VERY IMPORTANT.

Never automatically submit an application.

Final button:

“Confirm & Submit Application”

Before submission show:

“You are about to submit this application to the demo employer.”

Checkbox:

“I have reviewed my application and want to submit it.”

Button:

“Confirm Submission”

This demonstrates that AI assists the user but does not take control away from them.

==================================================
15. SUCCESS PAGE
==================================================

After submission:

✓ Application Submitted

“Your application has been successfully submitted.”

Show:

Application ID:
AA-2026-00124

Job:
Data Analyst

Company:
InsightWorks

Status:
Submitted

Buttons:

“View My Applications”

“Back to Jobs”

==================================================
16. CANDIDATE DASHBOARD
==================================================

Create:

“My Applications”

Show cards/table:

Data Analyst — InsightWorks
Status: Submitted

Python Developer — CloudCore
Status: Draft

Frontend Developer — TechNova
Status: Under Review

Allow:
- View
- Continue Draft
- Track Status

==================================================
17. ACCESSIBILITY SETTINGS PANEL
==================================================

Create a beautiful accessible settings drawer.

Title:

“Accessibility Settings”

Options:

Text Size
○ Small
● Medium
○ Large
○ Extra Large

Contrast
○ Standard
○ High Contrast

Motion
○ Standard
○ Reduced Motion

Text Spacing
○ Standard
○ Increased

Font
○ Standard
○ Dyslexia Friendly

Focus Highlight
ON/OFF

Voice Assistance
ON/OFF

Screen Reader Friendly Mode
ON/OFF

Button:

“Reset Settings”

Settings should actually change the interface where possible.

Persist preferences using localStorage.

==================================================
18. VOICE ASSISTANCE
==================================================

If supported by the browser, use Web Speech API.

Provide:

🎙 Voice Assistance

Button:
“Start Listening”

Example commands:

“Read job”
“Next”
“Previous”
“Explain this”
“Help”
“Go to skills”
“Read error”

Display:

Listening...

Do not continuously listen without user action.

Provide a visible microphone status.

==================================================
19. AI ASSISTANT UI
==================================================

Create a small assistant panel.

Name:

“AccessGuide”

Purpose:

Help users understand and navigate the application.

Example:

User:
“What does preferred mean?”

AccessGuide:
“Preferred means the employer would like this skill or experience, but it may not be mandatory.”

Include:
- Chat messages
- Input field
- Send button
- Suggested questions

Suggested prompts:

“What does this job require?”
“Explain this question”
“Why am I getting this error?”
“What should I enter here?”

For the hackathon prototype, use predefined intelligent responses or a mock AI layer if no API key is available.

Do not expose API keys in frontend code.

==================================================
20. ABOUT / HOW IT WORKS
==================================================

Create a section:

“How AccessApply Works”

5 steps:

1. Discover
Find a suitable opportunity.

2. Understand
Simplify job requirements.

3. Adapt
Choose accessibility preferences.

4. Apply
Complete the form with guidance.

5. Confirm
Review and submit yourself.

Add:

“Built around user control.”

Text:

“Accessibility assistance should support the user—not replace the user.”

==================================================
21. USP SECTION
==================================================

Create a strong section:

“More Than Accessibility. A Complete Application Journey.”

Three cards:

UNDERSTAND
Simplify job descriptions and distinguish required vs preferred skills.

NAVIGATE
Support keyboard, screen reader, visual and optional voice interaction.

COMPLETE
Guide users through forms, errors, review and confirmation.

Then show:

“Not another job portal.”
“Not another screen reader.”
“Not just another chatbot.”

“An accessibility-first layer for the job application journey.”

==================================================
22. TECHNICAL REQUIREMENTS
==================================================

Preferred stack:

Frontend:
React + Vite

Styling:
Tailwind CSS

Icons:
Lucide React

Animations:
Framer Motion

Storage:
localStorage for prototype persistence

Use reusable components.

Suggested structure:

src/
  components/
    Navbar.jsx
    AccessibilityPanel.jsx
    JobCard.jsx
    JobFilters.jsx
    JobDetails.jsx
    ApplicationProgress.jsx
    ApplicationGuide.jsx
    VoiceAssistant.jsx
    ErrorMessage.jsx
    ReviewSection.jsx
    Footer.jsx

  pages/
    Home.jsx
    Jobs.jsx
    JobDetailsPage.jsx
    Application.jsx
    Review.jsx
    Success.jsx
    Dashboard.jsx
    Accessibility.jsx

  data/
    jobs.js

  utils/
    accessibility.js
    storage.js

==================================================
23. FUNCTIONALITY
==================================================

The prototype MUST actually work.

Implement:

- Navigation
- Job search
- Filters
- Job cards
- Job details
- Simplified job explanation
- Application flow
- Progress tracking
- Form validation
- Error messages
- Save draft
- Review
- Confirmation
- Simulated submission
- Dashboard
- Accessibility settings
- Local persistence
- Responsive design
- Keyboard navigation
- Focus states
- Reduced motion
- High contrast
- Font-size controls
- Optional voice assistance

Do not create buttons that do nothing.

Every visible CTA should either:
- navigate,
- open a panel,
- change state,
- submit demo data,
- or provide meaningful feedback.

==================================================
24. ACCESSIBILITY TESTING
==================================================

Build with WCAG-oriented principles.

Check:

- Color contrast
- Keyboard navigation
- Focus visibility
- Semantic headings
- Form labels
- Button names
- Alt text
- Error identification
- Status messages
- Reduced motion
- Responsive layout

Add meaningful aria-labels where needed.

Avoid unnecessary ARIA.

==================================================
25. DEMO MODE
==================================================

Because this is a hackathon prototype, create:

“Demo Mode”

The entire application should work without:
- Real job portal APIs
- Real employer accounts
- Real ATS integrations
- Real application submission

Clearly label:

“Hackathon Prototype — Demo Data”

Never imply that demo applications are actually sent to employers.

==================================================
26. SECURITY
==================================================

Do not:
- expose API keys
- store sensitive personal information unnecessarily
- automatically submit applications
- collect medical/disability information

Use mock data for the demo.

==================================================
27. FINAL PRESENTATION EXPERIENCE
==================================================

The website should be optimized for a hackathon judge demo.

The ideal demo flow:

HOME
↓
Find Accessible Jobs
↓
Select Data Analyst
↓
View Job
↓
Explain This Job
↓
Show Required vs Preferred
↓
Start Accessible Application
↓
Choose Accessibility Preferences
↓
Fill Application
↓
Trigger an example validation error
↓
Use “Explain This Error”
↓
Continue
↓
Review Application
↓
User Confirmation
↓
Application Submitted
↓
Dashboard

Make this journey smooth and visually impressive.

==================================================
28. FINAL QUALITY CHECK
==================================================

Before finishing:

- Remove placeholder text
- Remove broken links
- Remove unused buttons
- Check all routes
- Check mobile layout
- Check keyboard navigation
- Check focus states
- Check forms
- Check validation
- Check accessibility settings
- Check animations
- Check console errors
- Check responsive design
- Make sure the application can be demonstrated from beginning to end

The final result should feel like a real accessibility-focused product prototype, not a static college project.

PROJECT NAME:

“AccessApply”

TAGLINE:

“Making every step of the job application journey more accessible.”

PRIMARY MESSAGE:

“Find. Understand. Apply. Review. Confirm.”

Build the complete working prototype now.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bridge-apply-flow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/94b324ac-5bb2-41fc-8ec5-3aeb61c86676).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
