import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, MapPin, Search, Wallet, GraduationCap } from "lucide-react";
import { jobs, type Job } from "@/data/jobs";
import { ButtonLink, Card, DemoBadge, Pill, SectionHeading, Button } from "@/components/ui-kit";
import { useA11y } from "@/lib/a11y";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Find Jobs — AccessApply" },
      {
        name: "description",
        content:
          "Browse sample accessible job listings and filter by location, work mode, experience, skills, salary and accessibility support.",
      },
      { property: "og:title", content: "Find Jobs — AccessApply" },
      {
        property: "og:description",
        content: "Search demo job listings with accessibility support shown on every card.",
      },
    ],
  }),
  component: JobsPage,
});

const allSkills = Array.from(new Set(jobs.flatMap((j) => j.skills))).sort();

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">
            <Link
              to="/jobs/$jobId"
              params={{ jobId: job.id }}
              className="rounded hover:underline"
            >
              {job.title}
            </Link>
          </h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
        <Pill tone="blue">{job.workMode}</Pill>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="size-4 text-primary" />
          <dt className="sr-only">Location</dt>
          <dd>{job.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase aria-hidden="true" className="size-4 text-primary" />
          <dt className="sr-only">Job type</dt>
          <dd>{job.type}</dd>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap aria-hidden="true" className="size-4 text-primary" />
          <dt className="sr-only">Experience</dt>
          <dd>{job.experience}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Wallet aria-hidden="true" className="size-4 text-primary" />
          <dt className="sr-only">Salary</dt>
          <dd>{job.salary}</dd>
        </div>
      </dl>

      <h4 className="mt-4 text-sm font-semibold">Skills</h4>
      <ul className="mt-2 flex flex-wrap gap-2">
        {job.skills.map((s) => (
          <li key={s}>
            <Pill>{s}</Pill>
          </li>
        ))}
      </ul>

      <h4 className="mt-4 text-sm font-semibold">Accessibility support</h4>
      <ul className="mt-2 flex flex-wrap gap-2">
        {job.accessibility.map((a) => (
          <li key={a}>
            <Pill tone="blue">{a}</Pill>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <ButtonLink to="/jobs/$jobId" params={{ jobId: job.id }}>
          View Job<span className="sr-only">: {job.title} at {job.company}</span>
        </ButtonLink>
      </div>
    </Card>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 min-h-11 w-full rounded-xl border border-input bg-card px-3 text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function JobsPage() {
  const { announce } = useA11y();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Any location");
  const [type, setType] = useState("Any type");
  const [mode, setMode] = useState("Any");
  const [exp, setExp] = useState("Any experience");
  const [skill, setSkill] = useState("Any skill");
  const [salary, setSalary] = useState("Any salary");
  const [accessOnly, setAccessOnly] = useState(false);

  const results = useMemo(
    () =>
      jobs.filter((j) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          [j.title, j.company, ...j.skills].some((v) => v.toLowerCase().includes(q));
        const matchesLocation =
          location === "Any location" || j.location.toLowerCase().includes(location.toLowerCase());
        const matchesType = type === "Any type" || j.type === type;
        const matchesMode = mode === "Any" || j.workMode === mode;
        const matchesExp = exp === "Any experience" || j.experienceBand === exp;
        const matchesSkill = skill === "Any skill" || j.skills.includes(skill);
        const matchesSalary = salary === "Any salary" || j.salaryBand === salary;
        const matchesAccess = !accessOnly || j.accessibility.length >= 3;
        return (
          matchesQuery &&
          matchesLocation &&
          matchesType &&
          matchesMode &&
          matchesExp &&
          matchesSkill &&
          matchesSalary &&
          matchesAccess
        );
      }),
    [query, location, type, mode, exp, skill, salary, accessOnly],
  );

  const resetFilters = () => {
    setQuery("");
    setLocation("Any location");
    setType("Any type");
    setMode("Any");
    setExp("Any experience");
    setSkill("Any skill");
    setSalary("Any salary");
    setAccessOnly(false);
    announce("Filters cleared. Showing all demo jobs.");
  };

  return (
    <div className="space-y-8">
      <div>
        <DemoBadge />
        <SectionHeading
          title="Find Accessible Jobs"
          description="These are sample listings created for this prototype. They are not real vacancies and no application is sent to a real employer."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <Card as="div" className="h-fit space-y-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div>
            <label htmlFor="job-search" className="block text-sm font-semibold">
              Search jobs, skills or companies
            </label>
            <div className="relative mt-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="job-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="For example: Data Analyst"
                className="min-h-11 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm"
              />
            </div>
          </div>
          <Select
            label="Location"
            value={location}
            onChange={setLocation}
            options={["Any location", "Remote", "Mumbai", "Bengaluru"]}
          />
          <Select
            label="Job type"
            value={type}
            onChange={setType}
            options={["Any type", "Full-time", "Part-time", "Internship"]}
          />
          <Select
            label="Remote, hybrid or on-site"
            value={mode}
            onChange={setMode}
            options={["Any", "Remote", "Hybrid", "On-site"]}
          />
          <Select
            label="Experience"
            value={exp}
            onChange={setExp}
            options={["Any experience", "0-2", "1-3", "3+"]}
          />
          <Select
            label="Skills"
            value={skill}
            onChange={setSkill}
            options={["Any skill", ...allSkills]}
          />
          <Select
            label="Salary band"
            value={salary}
            onChange={setSalary}
            options={["Any salary", "low", "mid", "high"]}
          />
          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/60 p-3">
            <input
              id="access-only"
              type="checkbox"
              checked={accessOnly}
              onChange={(e) => setAccessOnly(e.target.checked)}
              className="mt-1 size-5"
            />
            <label htmlFor="access-only" className="text-sm">
              Only show jobs listing three or more accessibility supports
            </label>
          </div>
          <Button variant="outline" onClick={resetFilters}>
            Clear filters
          </Button>
        </Card>

        <section aria-labelledby="results-title">
          <h2 id="results-title" className="text-lg font-semibold">
            Results
          </h2>
          <p role="status" aria-live="polite" className="mt-1 text-sm text-muted-foreground">
            Showing {results.length} of {jobs.length} demo jobs.
          </p>
          {results.length === 0 ? (
            <Card className="mt-4">
              <p className="font-medium">No demo jobs match these filters.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try clearing a filter or searching for a different skill.
              </p>
              <Button className="mt-4" variant="outline" onClick={resetFilters}>
                Clear filters
              </Button>
            </Card>
          ) : (
            <ul className="mt-4 grid gap-4 xl:grid-cols-2">
              {results.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
