import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, DemoBadge, Pill, SectionHeading, ButtonLink } from "@/components/ui-kit";
import {
  getApplications,
  getDrafts,
  getSavedJobs,
  toggleSavedJob,
  type Application,
} from "@/lib/applications";
import { jobs } from "@/data/jobs";
import { useA11y } from "@/lib/a11y";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Applications — AccessApply" },
      {
        name: "description",
        content: "Track your demo applications, continue saved drafts and check the status of each one.",
      },
      { property: "og:title", content: "My Applications — AccessApply" },
      { property: "og:description", content: "A candidate dashboard for the AccessApply prototype." },
    ],
  }),
  component: Dashboard,
});

const tone = (status: Application["status"]) =>
  status === "Submitted" ? "blue" : status === "Draft" ? "muted" : "lavender";

const FONT_SIZE_LABELS = { sm: "Small", md: "Medium", lg: "Large", xl: "Extra large" } as const;

function Dashboard() {
  const { settings, announce } = useA11y();
  const [apps, setApps] = useState<Application[]>([]);
  const [draftIds, setDraftIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setApps(getApplications());
    setDraftIds(Object.keys(getDrafts()));
    setSavedIds(getSavedJobs());
  }, []);

  const savedJobs = savedIds
    .map((id) => jobs.find((j) => j.id === id))
    .filter((j): j is NonNullable<typeof j> => Boolean(j));

  const removeSaved = (jobId: string) => {
    toggleSavedJob(jobId);
    setSavedIds(getSavedJobs());
    announce("Job removed from saved jobs.");
  };

  const prefRows: [string, string][] = [
    ["Text size", FONT_SIZE_LABELS[settings.fontSize]],
    ["High contrast", settings.contrast === "high" ? "Enabled" : "Off"],
    ["Reduced motion", settings.motion === "reduced" ? "Enabled" : "Off"],
    ["Increased text spacing", settings.spacing === "wide" ? "Enabled" : "Off"],
    ["Dyslexia-friendly font", settings.font === "dyslexic" ? "Enabled" : "Off"],
    ["Voice assistance", settings.voice ? "Enabled" : "Off"],
  ];

  return (
    <div className="space-y-8">
      <div>
        <DemoBadge />
        <SectionHeading
          title="My Applications"
          description="Everything here is sample data stored in this browser. Nothing has been sent to a real employer."
        />
      </div>

      {apps.length === 0 ? (
        <Card>
          <p className="font-medium">You have no applications yet.</p>
          <Link to="/jobs" className="mt-3 inline-block min-h-11 py-2 text-primary hover:underline">
            Find a job to apply for
          </Link>
        </Card>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {apps.map((a) => {
            const hasDraft = draftIds.includes(a.jobId) || a.status === "Draft";
            return (
              <li key={a.id}>
                <Card className="h-full">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">{a.jobTitle}</h2>
                      <p className="text-muted-foreground">{a.company}</p>
                    </div>
                    <Pill tone={tone(a.status)}>{a.status}</Pill>
                  </div>
                  <dl className="mt-4 space-y-1 text-sm">
                    <div className="flex gap-2">
                      <dt className="font-semibold">Application ID:</dt>
                      <dd className="text-muted-foreground">{a.id}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold">Last updated:</dt>
                      <dd className="text-muted-foreground">{a.submittedAt}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/jobs/$jobId"
                      params={{ jobId: a.jobId }}
                      className="inline-flex min-h-11 items-center rounded-xl border border-input px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      View job<span className="sr-only">: {a.jobTitle}</span>
                    </Link>
                    <Link
                      to="/apply/$jobId"
                      params={{ jobId: a.jobId }}
                      className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {hasDraft ? "Continue draft" : "Track status"}
                      <span className="sr-only"> for {a.jobTitle}</span>
                    </Link>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <section aria-labelledby="saved-title" className="space-y-4">
        <h2 id="saved-title" className="text-2xl font-semibold">
          Saved Jobs
        </h2>
        {savedJobs.length === 0 ? (
          <Card>
            <p className="font-medium">No saved jobs yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Save jobs here to easily return to them later. Use the Save job button on any job
              page.
            </p>
            <ButtonLink to="/jobs" variant="outline" className="mt-4">
              Browse demo jobs
            </ButtonLink>
          </Card>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {savedJobs.map((job) => (
              <li key={job.id}>
                <Card className="flex h-full flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId: job.id }}
                        className="rounded hover:underline"
                      >
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/apply/$jobId"
                      params={{ jobId: job.id }}
                      className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Apply<span className="sr-only"> to {job.title}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeSaved(job.id)}
                      className="inline-flex min-h-11 items-center rounded-xl border border-input px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Remove<span className="sr-only"> {job.title} from saved jobs</span>
                    </button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="prefs-title" className="space-y-4">
        <h2 id="prefs-title" className="text-2xl font-semibold">
          Accessibility Preferences
        </h2>
        <Card>
          <dl className="grid gap-3 sm:grid-cols-2">
            {prefRows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3">
                <dt className="text-sm font-semibold">{k}</dt>
                <dd>
                  <Pill tone={v === "Off" ? "muted" : "blue"}>{v}</Pill>
                </dd>
              </div>
            ))}
          </dl>
          <ButtonLink to="/accessibility" variant="outline" className="mt-5">
            Change accessibility settings
          </ButtonLink>
        </Card>
      </section>
    </div>
  );
}
