import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink, Card, DemoBadge } from "@/components/ui-kit";
import { getApplication, type Application } from "@/lib/applications";

export const Route = createFileRoute("/success/$appId")({
  head: () => ({
    meta: [
      { title: "Application Submitted — AccessApply" },
      {
        name: "description",
        content: "Your demo application has been submitted. View your application ID and status.",
      },
      { property: "og:title", content: "Application Submitted — AccessApply" },
      { property: "og:description", content: "Confirmation of a demo application in AccessApply." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { appId } = Route.useParams();
  const [app, setApp] = useState<Application | undefined>();

  useEffect(() => setApp(getApplication(appId)), [appId]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <DemoBadge />
      <div role="status">
        <h1 className="flex items-center gap-3 text-3xl font-semibold">
          <CheckCircle2 aria-hidden="true" className="size-8 text-success" /> Application Submitted
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Your application has been successfully submitted to the demo employer.
        </p>
      </div>
      <Card>
        <dl className="space-y-3">
          {[
            ["Application ID", appId],
            ["Job", app?.jobTitle ?? "Demo role"],
            ["Company", app?.company ?? "Demo employer"],
            ["Status", app?.status ?? "Submitted"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-wrap justify-between gap-2 border-b border-border pb-2 last:border-0">
              <dt className="font-semibold">{k}</dt>
              <dd className="text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/dashboard">View My Applications</ButtonLink>
        <ButtonLink to="/jobs" variant="outline">
          Back to Jobs
        </ButtonLink>
      </div>
    </div>
  );
}
