import { createFileRoute } from "@tanstack/react-router";
import { Compass, BookOpenText, Keyboard, ClipboardCheck, ShieldCheck } from "lucide-react";
import { ButtonLink, Card, DemoBadge, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AccessApply" },
      {
        name: "description",
        content:
          "AccessApply is an accessibility-first layer for the job application journey: find, understand, apply, review and confirm — with the user always in control.",
      },
      { property: "og:title", content: "About AccessApply" },
      {
        property: "og:description",
        content:
          "Making every step of the job application journey more accessible. A hackathon prototype with demo data.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Understand",
    icon: BookOpenText,
    text: "Job listings are rewritten in plain language on request, and required skills are clearly separated from preferred ones. Nothing is invented — only simplified.",
  },
  {
    title: "Navigate",
    icon: Compass,
    text: "The whole product works with a keyboard, a screen reader, larger text, higher contrast, reduced motion and optional voice commands.",
  },
  {
    title: "Complete",
    icon: Keyboard,
    text: "Applications are broken into short steps with friendly, specific error messages and an explanation for every field.",
  },
  {
    title: "Review",
    icon: ClipboardCheck,
    text: "Before anything is submitted, you see every answer and can jump back to edit any section. Drafts are saved on your device.",
  },
  {
    title: "Confirm",
    icon: ShieldCheck,
    text: "Nothing is ever submitted automatically. The final submission only happens after you read the confirmation and tick the box yourself.",
  },
];

function AboutPage() {
  return (
    <div className="space-y-12">
      <div>
        <DemoBadge />
        <SectionHeading
          eyebrow="About"
          title="Accessibility assistance should support the user — not replace the user."
          description="AccessApply helps candidates understand jobs, navigate applications and complete them with accessibility support, while keeping the user in control. It is a hackathon prototype built with demo data."
        />
      </div>

      <section aria-labelledby="not-title">
        <Card className="bg-lavender">
          <h2 id="not-title" className="text-xl font-semibold">
            What AccessApply is not
          </h2>
          <ul className="mt-3 space-y-1 text-lg font-medium">
            <li>Not another job portal.</li>
            <li>Not another screen reader.</li>
            <li>Not just another chatbot.</li>
          </ul>
          <p className="mt-4 text-xl font-semibold text-primary">
            An accessibility-first layer for the job application journey.
          </p>
        </Card>
      </section>

      <section aria-labelledby="principles-title">
        <h2 id="principles-title" className="text-2xl font-semibold">
          Built around user control
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map(({ title, icon: Icon, text }) => (
            <li key={title}>
              <Card className="h-full">
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="demo-title">
        <Card>
          <h2 id="demo-title" className="text-xl font-semibold">
            Demo mode
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sample job listings and application data are provided for demonstration only. No
            application is sent to a real employer, and everything you enter stays in this browser.
            You never need to provide medical or disability information to use any feature.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/jobs">Find Accessible Jobs</ButtonLink>
            <ButtonLink to="/how-it-works" variant="outline">
              How It Works
            </ButtonLink>
          </div>
        </Card>
      </section>
    </div>
  );
}
