import { KEYS, readJSON, writeJSON } from "./storage";

export type FormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  experience: string;
  projects: string;
  skills: string[];
  otherSkills: string;
  whyRole: string;
  pythonExperience: string;
  availability: string;
};

export const emptyForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  education: "",
  experience: "",
  projects: "",
  skills: [],
  otherSkills: "",
  whyRole: "",
  pythonExperience: "",
  availability: "",
};

export type Draft = { jobId: string; step: number; data: FormData; savedAt: string };

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: "Submitted" | "Draft" | "Under Review";
  submittedAt: string;
  data: FormData;
};

export function getDrafts(): Record<string, Draft> {
  return readJSON<Record<string, Draft>>(KEYS.drafts, {});
}

export function saveDraft(draft: Draft) {
  const drafts = getDrafts();
  drafts[draft.jobId] = draft;
  writeJSON(KEYS.drafts, drafts);
}

export function clearDraft(jobId: string) {
  const drafts = getDrafts();
  delete drafts[jobId];
  writeJSON(KEYS.drafts, drafts);
}

const seedApplications: Application[] = [
  {
    id: "AA-2026-00088",
    jobId: "frontend-developer-technova",
    jobTitle: "Frontend Developer",
    company: "TechNova",
    status: "Under Review",
    submittedAt: "2026-09-02",
    data: { ...emptyForm, fullName: "Demo Candidate", email: "demo@example.com" },
  },
  {
    id: "AA-2026-00091",
    jobId: "python-developer-cloudcore",
    jobTitle: "Python Developer",
    company: "CloudCore",
    status: "Draft",
    submittedAt: "2026-09-10",
    data: { ...emptyForm, fullName: "Demo Candidate" },
  },
];

export function getApplications(): Application[] {
  const stored = readJSON<Application[] | null>(KEYS.applications, null);
  if (stored) return stored;
  writeJSON(KEYS.applications, seedApplications);
  return seedApplications;
}

export function addApplication(app: Application) {
  const all = getApplications();
  writeJSON(KEYS.applications, [app, ...all.filter((a) => a.id !== app.id)]);
}

export function getApplication(id: string) {
  return getApplications().find((a) => a.id === id);
}

export function nextApplicationId() {
  const count = getApplications().length + 124;
  return `AA-2026-${String(count).padStart(5, "0")}`;
}

export function getSavedJobs(): string[] {
  return readJSON<string[]>(KEYS.savedJobs, []);
}

export function toggleSavedJob(jobId: string): boolean {
  const saved = getSavedJobs();
  const next = saved.includes(jobId) ? saved.filter((id) => id !== jobId) : [...saved, jobId];
  writeJSON(KEYS.savedJobs, next);
  return next.includes(jobId);
}
