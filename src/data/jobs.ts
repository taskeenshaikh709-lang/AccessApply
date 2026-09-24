export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  type: "Full-time" | "Part-time" | "Internship";
  experience: string;
  experienceBand: "0-2" | "1-3" | "3+";
  salary: string;
  salaryBand: "low" | "mid" | "high";
  skills: string[];
  accessibility: string[];
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  required: string[];
  preferred: string[];
  plain: {
    doWhat: string;
    requiredSkills: string;
    preferredSkills: string;
    experience: string;
    beginnerFriendly: string;
  };
};

export const jobs: Job[] = [
  {
    id: "frontend-developer-technova",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Mumbai / Remote",
    workMode: "Remote",
    type: "Full-time",
    experience: "0–2 years",
    experienceBand: "0-2",
    salary: "₹5,00,000 – ₹8,00,000 per year",
    salaryBand: "mid",
    skills: ["JavaScript", "React", "HTML", "CSS", "Accessibility"],
    accessibility: ["Screen reader friendly tools", "Flexible hours", "Remote friendly"],
    summary: "Build accessible web interfaces for a product team that ships weekly.",
    description:
      "TechNova is looking for a Frontend Developer to build and maintain user interfaces for our customer portal. You will work with designers and backend engineers to turn designs into accessible, responsive pages.",
    responsibilities: [
      "Build pages and components using React and CSS.",
      "Fix bugs reported by users and the support team.",
      "Test pages with a keyboard and a screen reader before release.",
      "Take part in weekly team reviews.",
    ],
    requirements: [
      "Working knowledge of JavaScript, HTML and CSS.",
      "Familiarity with React or a similar component library.",
      "Understanding of responsive layouts.",
      "Interest in web accessibility. Formal experience is preferred but not mandatory.",
    ],
    benefits: [
      "Health insurance for you and one dependent",
      "Assistive technology budget",
      "Flexible start and finish times",
      "Paid learning days",
    ],
    required: ["JavaScript", "HTML and CSS", "React basics"],
    preferred: ["Web accessibility (WCAG)", "TypeScript", "Testing tools"],
    plain: {
      doWhat:
        "You would build the screens people see and use on TechNova's website, and fix problems that users report.",
      requiredSkills:
        "You need JavaScript, HTML and CSS, and you should be able to build simple screens with React.",
      preferredSkills:
        "Knowing about web accessibility rules, TypeScript or testing tools is a bonus, but the listing says these are preferred, not mandatory.",
      experience: "Zero to two years. Internships, college projects and personal projects count.",
      beginnerFriendly:
        "Yes. This listing is open to people with no formal work experience as long as you can show your own projects.",
    },
  },
  {
    id: "data-analyst-insightworks",
    title: "Data Analyst",
    company: "InsightWorks",
    location: "Remote",
    workMode: "Remote",
    type: "Full-time",
    experience: "0–2 years",
    experienceBand: "0-2",
    salary: "₹4,50,000 – ₹7,00,000 per year",
    salaryBand: "mid",
    skills: ["SQL", "Excel", "Python", "Data visualisation"],
    accessibility: ["Screen reader friendly tools", "Captioned meetings", "Flexible hours"],
    summary: "Turn raw product data into clear reports the whole company can read.",
    description:
      "InsightWorks helps small businesses understand their sales data. As a Data Analyst you will prepare reports, answer questions from other teams, and keep our dashboards accurate.",
    responsibilities: [
      "Write SQL queries to pull data for reports.",
      "Build simple dashboards and charts.",
      "Check numbers for mistakes before they are shared.",
      "Explain findings in writing to people who are not analysts.",
    ],
    requirements: [
      "Basic SQL, including SELECT, JOIN and GROUP BY.",
      "Comfort working with spreadsheets.",
      "Clear written communication.",
      "Proficiency in Python and experience with data visualisation tools preferred.",
    ],
    benefits: [
      "Fully remote role",
      "Home workstation allowance",
      "Captioned and recorded meetings by default",
      "Mentor assigned for the first six months",
    ],
    required: ["Basic SQL", "Spreadsheets", "Written communication"],
    preferred: ["Python", "Data visualisation tools", "Statistics coursework"],
    plain: {
      doWhat:
        "You would pull numbers out of a database, check that they are correct, and turn them into simple reports and charts for other teams.",
      requiredSkills:
        "You need basic SQL, comfort with spreadsheets, and the ability to explain findings in plain writing.",
      preferredSkills:
        "Python skills are useful for this job. Experience with data visualisation tools is preferred but may not be mandatory.",
      experience: "Zero to two years. College coursework and internships count.",
      beginnerFriendly:
        "Yes. A mentor is assigned for the first six months, which suggests the team expects to train a newer analyst.",
    },
  },
  {
    id: "python-developer-cloudcore",
    title: "Python Developer",
    company: "CloudCore",
    location: "Bengaluru / Hybrid",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "1–3 years",
    experienceBand: "1-3",
    salary: "₹8,00,000 – ₹12,00,000 per year",
    salaryBand: "high",
    skills: ["Python", "SQL", "REST APIs", "Git"],
    accessibility: ["Step-free office", "Assistive tech support", "Hybrid schedule"],
    summary: "Write and maintain backend services for a cloud storage product.",
    description:
      "CloudCore runs a storage platform used by mid-size companies. You will work on the services that handle uploads, permissions and billing events.",
    responsibilities: [
      "Write and maintain Python services.",
      "Design and document API endpoints.",
      "Write tests for the code you ship.",
      "Review pull requests from teammates.",
    ],
    requirements: [
      "One to three years writing Python.",
      "Basic SQL for reading and updating records.",
      "Proficiency in Python and experience with RESTful APIs preferred.",
      "Cloud platform experience is an advantage.",
    ],
    benefits: [
      "Hybrid schedule: two days in the office",
      "Step-free office with accessible restrooms",
      "Assistive technology provided on request",
      "Annual conference budget",
    ],
    required: ["Python", "Basic SQL"],
    preferred: ["REST APIs", "Cloud experience", "Automated testing"],
    plain: {
      doWhat:
        "You would write the behind-the-scenes code that stores files, checks who is allowed to see them, and records billing events.",
      requiredSkills: "You need Python and basic SQL. Those two are listed as needed for the role.",
      preferredSkills:
        "Experience working with APIs and cloud platforms is preferred but may not be mandatory.",
      experience: "One to three years of Python work is asked for here.",
      beginnerFriendly:
        "Not really. This listing asks for at least one year of experience, so it suits someone who has already worked or interned with Python.",
    },
  },
  {
    id: "ui-ux-designer-pixelcraft",
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    workMode: "Remote",
    type: "Full-time",
    experience: "0–2 years",
    experienceBand: "0-2",
    salary: "₹4,00,000 – ₹7,50,000 per year",
    salaryBand: "low",
    skills: ["Figma", "Wireframing", "User research", "Accessibility"],
    accessibility: ["Flexible hours", "Async-first team", "Screen reader friendly tools"],
    summary: "Design clear, inclusive product screens for a small remote studio.",
    description:
      "PixelCraft designs software for healthcare and education clients. You will create wireframes and finished screens, and check them against accessibility guidelines.",
    responsibilities: [
      "Create wireframes and high-fidelity screens in Figma.",
      "Check colour contrast and text size in your designs.",
      "Join user interviews and write short summaries.",
      "Keep the shared component library tidy.",
    ],
    requirements: [
      "A portfolio with at least two interface projects.",
      "Working knowledge of Figma.",
      "Understanding of layout, spacing and type hierarchy.",
      "Experience with accessibility guidelines preferred.",
    ],
    benefits: [
      "Fully remote and async-first",
      "Four-day design review week",
      "Software and hardware budget",
      "Paid portfolio time",
    ],
    required: ["Figma", "Portfolio with 2 interface projects", "Layout and typography basics"],
    preferred: ["Accessibility guidelines", "User research", "Design systems"],
    plain: {
      doWhat:
        "You would draw and refine the screens of apps before they are built, and make sure the text and colours are easy to read.",
      requiredSkills:
        "You need Figma, a portfolio with two interface projects, and a good grasp of layout and typography.",
      preferredSkills:
        "Knowing accessibility guidelines, running user research, or maintaining design systems is preferred but may not be mandatory.",
      experience: "Zero to two years. Student and freelance projects can make up the portfolio.",
      beginnerFriendly:
        "Yes, as long as you can show two interface projects of any kind in your portfolio.",
    },
  },
  {
    id: "software-engineer-nexapay",
    title: "Software Engineer",
    company: "NexaPay",
    location: "Bengaluru / Hybrid",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "1–3 years",
    experienceBand: "1-3",
    salary: "₹9,00,000 – ₹14,00,000 per year",
    salaryBand: "high",
    skills: ["Java", "Spring Boot", "SQL", "Git"],
    accessibility: ["Step-free office", "Assistive tech support", "Flexible hours", "Captioned meetings"],
    summary: "Build reliable payment services used by thousands of small shops.",
    description:
      "NexaPay processes payments for small businesses across India. As a Software Engineer you will work on the services that move money safely and keep clear records of every transaction.",
    responsibilities: [
      "Build and maintain Java services for payments.",
      "Write tests and documentation for your code.",
      "Investigate and fix production issues with the team.",
      "Take part in planning and code reviews.",
    ],
    requirements: [
      "One to three years of backend or full-stack development.",
      "Working knowledge of Java or a similar language.",
      "Basic SQL and version control with Git.",
      "Experience with payment systems preferred but not mandatory.",
    ],
    benefits: [
      "Hybrid schedule with step-free office",
      "Health and accident insurance",
      "Assistive technology budget",
      "Learning allowance every quarter",
    ],
    required: ["Java or similar language", "SQL", "Git"],
    preferred: ["Spring Boot", "Payment systems", "Cloud deployment"],
    plain: {
      doWhat:
        "You would write and look after the code that moves money between shops and banks, and fix it when something goes wrong.",
      requiredSkills:
        "You need one to three years of programming, Java or a similar language, basic SQL, and Git.",
      preferredSkills:
        "Knowing Spring Boot, payment systems or cloud deployment is preferred but may not be mandatory.",
      experience: "One to three years. Internship experience counts towards this.",
      beginnerFriendly:
        "Partly. It suits someone with at least a year of real coding experience, including internships.",
    },
  },
  {
    id: "data-scientist-medmetrics",
    title: "Data Scientist",
    company: "MedMetrics",
    location: "Remote",
    workMode: "Remote",
    type: "Full-time",
    experience: "3+ years",
    experienceBand: "3+",
    salary: "₹15,00,000 – ₹22,00,000 per year",
    salaryBand: "high",
    skills: ["Python", "Machine learning", "Statistics", "SQL"],
    accessibility: ["Fully remote", "Async-first team", "Screen reader friendly tools"],
    summary: "Build models that help clinics predict appointment demand.",
    description:
      "MedMetrics builds forecasting tools for healthcare clinics. You will design models, test them carefully, and explain what they can and cannot do to non-technical teams.",
    responsibilities: [
      "Build and evaluate prediction models.",
      "Write clean, reviewed Python code.",
      "Document model limits in plain language.",
      "Work with engineers to put models into the product.",
    ],
    requirements: [
      "Three or more years working with data and statistics.",
      "Strong Python and SQL.",
      "Experience with machine learning methods.",
      "Healthcare data experience is an advantage.",
    ],
    benefits: [
      "Fully remote with async communication",
      "Conference and training budget",
      "Home workstation allowance",
      "Four-week minimum leave policy",
    ],
    required: ["Python", "Statistics", "Machine learning", "SQL"],
    preferred: ["Healthcare data", "Model deployment", "Deep learning"],
    plain: {
      doWhat:
        "You would use past data to build programs that predict future demand for clinics, and explain clearly how reliable those predictions are.",
      requiredSkills:
        "You need strong Python and SQL, solid statistics, and real experience with machine learning.",
      preferredSkills:
        "Healthcare data experience or deep learning knowledge is preferred but may not be mandatory.",
      experience: "Three or more years. This is a senior-level listing.",
      beginnerFriendly:
        "No. This role expects several years of experience and suits someone who has already worked as a data scientist or analyst.",
    },
  },
  {
    id: "backend-developer-fleetix",
    title: "Backend Developer",
    company: "Fleetix",
    location: "Mumbai / On-site",
    workMode: "On-site",
    type: "Full-time",
    experience: "1–3 years",
    experienceBand: "1-3",
    salary: "₹7,00,000 – ₹10,00,000 per year",
    salaryBand: "mid",
    skills: ["Node.js", "PostgreSQL", "REST APIs", "Docker"],
    accessibility: ["Step-free office", "Quiet workspace available", "Flexible start times"],
    summary: "Keep the systems behind a delivery-tracking product fast and reliable.",
    description:
      "Fleetix helps delivery companies track their vehicles in real time. You will maintain the APIs and databases that power live maps and driver apps.",
    responsibilities: [
      "Maintain Node.js services and PostgreSQL databases.",
      "Improve API performance and reliability.",
      "Write tests and monitor errors after releases.",
      "Support the mobile team with new endpoints.",
    ],
    requirements: [
      "One to three years of backend development.",
      "Node.js and a relational database such as PostgreSQL.",
      "Understanding of REST API design.",
      "Docker experience preferred but not mandatory.",
    ],
    benefits: [
      "Step-free office near a metro station",
      "Quiet rooms for focused work",
      "Health insurance",
      "Monthly remote Fridays",
    ],
    required: ["Node.js", "PostgreSQL or similar", "REST APIs"],
    preferred: ["Docker", "Caching", "Monitoring tools"],
    plain: {
      doWhat:
        "You would look after the server code and databases that let delivery apps show vehicles moving on a map.",
      requiredSkills:
        "You need Node.js, a relational database like PostgreSQL, and an understanding of how APIs are designed.",
      preferredSkills:
        "Docker, caching and monitoring experience is preferred but may not be mandatory.",
      experience: "One to three years of backend work.",
      beginnerFriendly:
        "Partly. It suits someone with about a year of real backend experience.",
    },
  },
  {
    id: "qa-engineer-brightbank",
    title: "QA Engineer",
    company: "BrightBank",
    location: "Remote",
    workMode: "Remote",
    type: "Full-time",
    experience: "0–2 years",
    experienceBand: "0-2",
    salary: "₹4,00,000 – ₹6,50,000 per year",
    salaryBand: "low",
    skills: ["Testing", "JavaScript", "Playwright", "Bug reporting"],
    accessibility: ["Fully remote", "Screen reader friendly tools", "Flexible hours"],
    summary: "Test a banking app carefully and write clear reports when things break.",
    description:
      "BrightBank is a small digital bank. As a QA Engineer you will test new features, reproduce bugs, and write reports that developers can act on quickly.",
    responsibilities: [
      "Test new features on web and mobile.",
      "Write clear bug reports with steps to reproduce.",
      "Maintain automated tests in Playwright.",
      "Check accessibility basics on every release.",
    ],
    requirements: [
      "Careful, methodical approach to testing software.",
      "Basic JavaScript for reading and writing test scripts.",
      "Clear written communication.",
      "Experience with test automation tools preferred.",
    ],
    benefits: [
      "Fully remote",
      "Flexible working hours",
      "Training budget for testing certifications",
      "Screen-reader-friendly internal tools",
    ],
    required: ["Careful manual testing", "Basic JavaScript", "Clear bug reports"],
    preferred: ["Playwright or Cypress", "Accessibility testing", "API testing"],
    plain: {
      doWhat:
        "You would try out new features of a banking app, find what is broken, and describe each problem clearly so developers can fix it.",
      requiredSkills:
        "You need a careful testing mindset, basic JavaScript, and clear writing for bug reports.",
      preferredSkills:
        "Knowing Playwright, accessibility testing or API testing is preferred but may not be mandatory.",
      experience: "Zero to two years. Coursework and personal testing projects count.",
      beginnerFriendly:
        "Yes. This is an entry-level listing and training budget is included.",
    },
  },
  {
    id: "business-analyst-greengrid",
    title: "Business Analyst",
    company: "GreenGrid",
    location: "Bengaluru / Hybrid",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "1–3 years",
    experienceBand: "1-3",
    salary: "₹6,50,000 – ₹9,50,000 per year",
    salaryBand: "mid",
    skills: ["Excel", "SQL", "Documentation", "Stakeholder communication"],
    accessibility: ["Captioned meetings", "Step-free office", "Hybrid schedule"],
    summary: "Turn business questions into clear requirements for the product team.",
    description:
      "GreenGrid builds energy-saving software for offices. You will talk to clients, write clear requirement documents, and help the product team understand what to build.",
    responsibilities: [
      "Interview clients and write requirement documents.",
      "Analyse data in Excel and SQL to support decisions.",
      "Keep project documentation up to date.",
      "Present findings to technical and non-technical teams.",
    ],
    requirements: [
      "One to three years in an analytical or coordination role.",
      "Strong Excel skills; basic SQL.",
      "Excellent written and spoken communication.",
      "Experience with requirement-gathering methods preferred.",
    ],
    benefits: [
      "Hybrid schedule",
      "Captioned and recorded meetings",
      "Health insurance",
      "Paid certification support",
    ],
    required: ["Excel", "Basic SQL", "Clear documentation"],
    preferred: ["Requirement methods (user stories)", "Energy sector knowledge", "Presentation tools"],
    plain: {
      doWhat:
        "You would talk to clients about what they need, write it down clearly, and help engineers understand exactly what to build.",
      requiredSkills:
        "You need strong Excel, basic SQL, and very clear writing and speaking.",
      preferredSkills:
        "Experience with user stories or the energy sector is preferred but may not be mandatory.",
      experience: "One to three years in any analytical or coordination role.",
      beginnerFriendly:
        "Partly. A year of relevant work or internships is expected.",
    },
  },
  {
    id: "product-designer-carepath",
    title: "Product Designer",
    company: "CarePath",
    location: "Remote",
    workMode: "Remote",
    type: "Part-time",
    experience: "0–2 years",
    experienceBand: "0-2",
    salary: "₹3,00,000 – ₹5,00,000 per year (part-time)",
    salaryBand: "low",
    skills: ["Figma", "Prototyping", "Accessibility", "User research"],
    accessibility: ["Fully remote", "Async-first team", "Flexible hours", "Screen reader friendly tools"],
    summary: "Design calm, accessible screens for a patient-appointment app, part-time.",
    description:
      "CarePath helps patients book and manage clinic appointments. This is a part-time role where you will design new screens and improve the accessibility of existing ones.",
    responsibilities: [
      "Design new screens and prototypes in Figma.",
      "Audit existing screens for accessibility issues.",
      "Join monthly user calls and summarise feedback.",
      "Maintain the design library.",
    ],
    requirements: [
      "A portfolio with interface design work.",
      "Working knowledge of Figma.",
      "Interest in accessible design.",
      "Experience with user research preferred.",
    ],
    benefits: [
      "Part-time, roughly 20 hours per week",
      "Fully remote and async",
      "Design software budget",
      "Flexible deadline planning",
    ],
    required: ["Figma", "Interface design portfolio"],
    preferred: ["User research", "Accessibility audits", "Design systems"],
    plain: {
      doWhat:
        "You would design screens for an app that helps patients book clinic visits, working about twenty hours a week from home.",
      requiredSkills: "You need Figma and a portfolio showing interface design work.",
      preferredSkills:
        "User research or accessibility audit experience is preferred but may not be mandatory.",
      experience: "Zero to two years. Student and freelance work counts.",
      beginnerFriendly:
        "Yes. This part-time role is open to newer designers with a portfolio.",
    },
  },
];

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}
