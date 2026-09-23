import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, DemoBadge, Pill, SectionHeading } from "@/components/ui-kit";
import { getApplications, getDrafts, type Application } from "@/lib/applications";

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

function Dashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [draftIds, setDraftIds] = useState<string[]>([]);

  useEffect(() => {
    setApps(getApplications());
    setDraftIds(Object.keys(getDrafts()));
  }, []);

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
    </div>
  );
}
