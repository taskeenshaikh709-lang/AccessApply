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
];

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}
