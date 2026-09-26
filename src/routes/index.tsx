import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  BookOpenText,
  Keyboard,
  ClipboardCheck,
  ShieldCheck,
  ArrowRight,
  Type,
  Contrast,
  Mic,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink, Card, DemoBadge, Pill, SectionHeading } from "@/components/ui-kit";
import { AccessibilityDemo } from "@/components/AccessibilityDemo";
import { useA11y } from "@/lib/a11y";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AccessApply — Accessible Job Applications for Everyone" },
      {
        name: "description",
        content:
          "Find opportunities, understand requirements, and complete applications with accessibility support built into every step.",
      },
      { property: "og:title", content: "AccessApply — Accessible Job Applications for Everyone" },
      {
        property: "og:description",
        content:
          "An accessibility-first layer for the whole job application journey: find, understand, apply, review and confirm.",
      },
    ],
  }),
  component: Home,
});

const EXAMPLE_JOB = "data-analyst-insightworks";

type JourneyItem = {
  n: string;
  title: string;
  text: string;
  icon: LucideIcon;
  to: string;
  params?: Record<string, string> | undefined;
  search?: Record<string, unknown> | undefined;
  hint: string;
};

const journey: JourneyItem[] = [
  {
    n: "01",
    title: "Discover",
    text: "Find suitable jobs.",
    icon: Compass,
    to: "/jobs",
    hint: "Opens the jobs list.",
  },
  {
    n: "02",
    title: "Understand",
    text: "Get job requirements explained clearly.",
    icon: BookOpenText,
    to: "/jobs/$jobId",
    params: { jobId: EXAMPLE_JOB },
    hint: "Opens the Data Analyst job page with a plain-language explanation.",
  },
  {
    n: "03",
    title: "Apply",
    text: "Complete the application with accessibility support.",
    icon: Keyboard,
    to: "/apply/$jobId",
    params: { jobId: EXAMPLE_JOB },
    hint: "Opens the accessible demo application at step 1.",
  },
  {
    n: "04",
    title: "Review",
    text: "Check your answers before submitting.",
    icon: ClipboardCheck,
    to: "/apply/$jobId",
    params: { jobId: EXAMPLE_JOB },
    search: { step: 5 },
    hint: "Opens the review step of the accessible demo application.",
  },
  {
    n: "05",
    title: "Confirm",
    text: "You stay in control of the final submission.",
    icon: ShieldCheck,
    to: "/dashboard",
    hint: "Opens My Applications, where you track what you submitted.",
  },
];

function JourneyCardLink({
  to,
  params,
  search,
  children,
}: {
  to: string;
  params?: Record<string, string> | undefined;
  search?: Record<string, unknown> | undefined;
  children: ReactNode;
}) {
  // Generic wrapper: callers supply concrete route paths/params, so narrow here.
  return (
    <Link
      to={to as never}
      params={params as never}
      search={search as never}
      className="card-link group block h-full p-6"
    >
      {children}
    </Link>
  );
}

function Home() {
  const { setPanelOpen } = useA11y();
  const journeyRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = journeyRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".reveal"));
    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-24">
      <section
        aria-labelledby="hero-title"
        className="hero-surface grid items-center gap-10 rounded-3xl border border-border/70 px-6 py-10 sm:px-10 lg:grid-cols-2"
      >
        <div>
          <DemoBadge />
          <h1 id="hero-title" className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Accessible Job Applications for Everyone.
          </h1>
          <p className="mt-4 inline-flex max-w-md items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-sm font-semibold text-success">
            <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
            No medical or disability information ever required
          </p>
          <p className="mt-5 text-lg text-muted-foreground">
            Find opportunities, understand requirements, and complete applications with
            accessibility support built into every step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/jobs">Find Accessible Jobs</ButtonLink>
            <ButtonLink to="/how-it-works" variant="secondary">
              How It Works
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Find. Understand. Apply. Review. Confirm.
          </p>
        </div>

        <Card aria-label="Preview of the accessible application interface" className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-lg font-semibold">Data Analyst — InsightWorks</p>
            <Pill tone="blue">Step 3 of 5</Pill>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label="Application progress: step 3 of 5"
          >
            <div className="h-full w-3/5 rounded-full bg-primary" />
          </div>
          <div className="rounded-xl border border-border bg-muted/60 p-4">
            <p className="text-sm font-semibold">Which of these skills have you used?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Select all that apply. Coursework and personal projects count.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>SQL</Pill>
              <Pill>Python</Pill>
              <Pill tone="muted">JavaScript</Pill>
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-3">
            {[
              { icon: Type, label: "Text size" },
              { icon: Contrast, label: "High contrast" },
              { icon: Mic, label: "Optional voice" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl border border-border bg-softblue px-3 py-2 text-sm text-accent-foreground"
              >
                <Icon aria-hidden="true" className="size-4" /> {label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="min-h-11 w-full rounded-xl border border-input px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Open Accessibility Settings
          </button>
        </Card>
      </section>

      <section aria-labelledby="journey-title">
        <SectionHeading
          id="journey-title"
          eyebrow="The journey"
          title="One Journey. Fewer Barriers."
          description="Every stage of applying for a job, with support built into the step itself rather than bolted on afterwards. Select any step to open it."
        />
        <ol ref={journeyRef} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map(({ n, title, text, icon: Icon, to, params, search, hint }, i) => (
            <li key={n} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <JourneyCardLink to={to} params={params} search={search}>
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <p className="mt-4 text-sm font-semibold text-primary">{n}</p>
                <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-4 size-4 text-primary transition-transform duration-200 group-hover:translate-x-1"
                />
                <span className="sr-only">{hint}</span>
              </JourneyCardLink>
            </li>
          ))}
        </ol>
      </section>

      <AccessibilityDemo />

      <section aria-labelledby="usp-title">
        <SectionHeading
          id="usp-title"
          eyebrow="Why it is different"
          title="More Than Accessibility. A Complete Application Journey."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Understand",
              text: "Simplify job descriptions and clearly separate required skills from preferred ones.",
            },
            {
              title: "Navigate",
              text: "Support keyboard, screen reader, visual adjustments and optional voice interaction.",
            },
            {
              title: "Complete",
              text: "Guide people through forms, errors, review and confirmation without taking over.",
            },
          ].map((c) => (
            <Card key={c.title}>
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.text}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-6 bg-lavender">
          <ul className="space-y-1 text-lg font-medium">
            <li>Not another job portal.</li>
            <li>Not another screen reader.</li>
            <li>Not just another chatbot.</li>
          </ul>
          <p className="mt-4 text-xl font-semibold text-primary">
            An accessibility-first layer for the job application journey.
          </p>
        </Card>
      </section>
    </div>
  );
}
