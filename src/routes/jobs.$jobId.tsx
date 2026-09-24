import { useEffect, useRef, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Volume2, Sparkles, Square, CheckCircle2, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { getJob } from "@/data/jobs";
import { getSavedJobs, toggleSavedJob } from "@/lib/applications";
import { Button, ButtonLink, Card, DemoBadge, Pill } from "@/components/ui-kit";
import { speak, stopSpeaking, useA11y } from "@/lib/a11y";
import { useVoiceCommands } from "@/lib/voice";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const job = getJob(params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Job not found — AccessApply" }, { name: "robots", content: "noindex" }],
      };
    }
    const { job } = loaderData;
    const title = `${job.title} at ${job.company} — AccessApply`;
    const description = `${job.summary} Demo listing with plain-language explanation and required versus preferred skills.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: JobDetails,
});

function JobDetails() {
  const { job } = Route.useLoaderData();
  const { announce } = useA11y();
  const [explained, setExplained] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [saved, setSaved] = useState(false);
  const explainRef = useRef<HTMLDivElement>(null);

  useEffect(() => setSaved(getSavedJobs().includes(job.id)), [job.id]);

  const toggleSave = () => {
    const nowSaved = toggleSavedJob(job.id);
    setSaved(nowSaved);
    announce(nowSaved ? "Job saved. Find it on your dashboard." : "Job removed from saved jobs.");
  };

  const readAloudText = [
    `${job.title} at ${job.company}.`,
    `Location: ${job.location}. ${job.type}. ${job.experience} of experience. Salary ${job.salary}.`,
    job.description,
    `Responsibilities: ${job.responsibilities.join(" ")}`,
    `Requirements: ${job.requirements.join(" ")}`,
  ].join(" ");

  const explain = () => {
    setExplained(true);
    announce("Plain language explanation opened below the job description.");
    window.setTimeout(() => explainRef.current?.focus(), 80);
  };

  const readAloud = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const ok = speak(readAloudText);
    if (!ok) {
      setSpeechError(
        "Read aloud is not supported in this browser. The full job text is on this page and works with your screen reader.",
      );
      announce("Read aloud is not available in this browser.");
      return;
    }
    setSpeaking(true);
    window.setTimeout(() => setSpeaking(false), 1000);
  };

  useVoiceCommands({ readJob: readAloud, explain, next: explain });

  return (
    <article className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link to="/jobs" className="inline-block min-h-11 py-2 text-primary hover:underline">
          ← Back to all jobs
        </Link>
      </nav>

      <header className="space-y-4">
        <DemoBadge />
        <h1 className="text-3xl font-semibold sm:text-4xl">{job.title}</h1>
        <p className="text-lg text-muted-foreground">
          {job.company} · {job.location}
        </p>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Job type", job.type],
            ["Work mode", job.workMode],
            ["Experience", job.experience],
            ["Salary", job.salary],
          ].map(([term, value]) => (
            <div key={term} className="rounded-xl border border-border bg-card p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {term}
              </dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          <Button onClick={explain}>
            <Sparkles aria-hidden="true" className="size-4" /> Explain This Job
          </Button>
          <Button variant="secondary" onClick={readAloud}>
            {speaking ? (
              <Square aria-hidden="true" className="size-4" />
            ) : (
              <Volume2 aria-hidden="true" className="size-4" />
            )}
            {speaking ? "Stop reading" : "Read Job Aloud"}
          </Button>
          <ButtonLink to="/apply/$jobId" params={{ jobId: job.id }} variant="outline">
            Start Accessible Application
          </ButtonLink>
          <Button variant="ghost" onClick={toggleSave} aria-pressed={saved}>
            {saved ? (
              <BookmarkCheck aria-hidden="true" className="size-4" />
            ) : (
              <Bookmark aria-hidden="true" className="size-4" />
            )}
            {saved ? "Saved" : "Save job"}
          </Button>
        </div>
        {speechError ? (
          <p role="status" className="text-sm text-muted-foreground">
            {speechError}
          </p>
        ) : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold">Job description</h2>
            <p className="mt-3 text-muted-foreground">{job.description}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold">Responsibilities</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {job.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold">Requirements</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold">Benefits</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {job.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Card>

          {explained ? (
            <Card
              ref={explainRef}
              tabIndex={-1}
              className="border-primary bg-lavender"
              aria-labelledby="explain-title"
            >
              <h2 id="explain-title" className="text-xl font-semibold">
                This job in plain language
              </h2>
              <p className="mt-2 text-sm text-secondary-foreground">
                Nothing new has been added. This only restates what the listing above already says.
              </p>
              <dl className="mt-4 space-y-4">
                {[
                  ["What will I actually do?", job.plain.doWhat],
                  ["What skills are required?", job.plain.requiredSkills],
                  ["What skills are preferred?", job.plain.preferredSkills],
                  ["What experience is required?", job.plain.experience],
                  ["Is this role suitable for a beginner?", job.plain.beginnerFriendly],
                ].map(([q, a]) => (
                  <div key={q} className="rounded-xl bg-card p-4">
                    <dt className="font-semibold">{q}</dt>
                    <dd className="mt-1 text-muted-foreground">{a}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ) : null}
        </div>

        <aside aria-labelledby="skills-title" className="space-y-4">
          <h2 id="skills-title" className="sr-only">
            Skills breakdown
          </h2>
          <Card>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 aria-hidden="true" className="size-5 text-success" /> Required
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The employer expects you to have these.
            </p>
            <ul className="mt-3 space-y-2">
              {job.required.map((s) => (
                <li key={s} className="rounded-lg bg-muted px-3 py-2 text-sm font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Star aria-hidden="true" className="size-5 text-primary" /> Preferred
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Nice to have. You can still apply without these.
            </p>
            <ul className="mt-3 space-y-2">
              {job.preferred.map((s) => (
                <li key={s} className="rounded-lg bg-softblue px-3 py-2 text-sm font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Accessibility support listed</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {job.accessibility.map((a) => (
                <li key={a}>
                  <Pill tone="blue">{a}</Pill>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </article>
  );
}
