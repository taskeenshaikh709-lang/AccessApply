import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink, Card, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How AccessApply Works" },
      {
        name: "description",
        content:
          "Discover, understand, adapt, apply and confirm: the five steps AccessApply supports, built around user control.",
      },
      { property: "og:title", content: "How AccessApply Works" },
      {
        property: "og:description",
        content: "Accessibility assistance should support the user, not replace the user.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { title: "Discover", text: "Find a suitable opportunity using search and filters that describe the accessibility support each employer lists." },
  { title: "Understand", text: "Simplify job requirements into plain language, and separate what is required from what is merely preferred." },
  { title: "Adapt", text: "Choose the accessibility preferences that work for you. You are never asked for medical or disability information." },
  { title: "Apply", text: "Complete a short, clearly labelled form one section at a time, with guidance and friendly error messages." },
  { title: "Confirm", text: "Review every answer, edit anything you want, and submit only when you say so." },
];

function HowItWorks() {
  return (
    <div className="space-y-12">
      <SectionHeading
        eyebrow="About"
        title="How AccessApply Works"
        description="AccessApply is an accessibility-first layer over the job application journey. It explains, adapts and guides — the decisions stay with you."
      />

      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Card className="h-full">
              <p className="text-sm font-semibold text-primary">Step {i + 1}</p>
              <h2 className="mt-1 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </Card>
          </li>
        ))}
      </ol>

      <Card className="bg-lavender">
        <h2 className="text-2xl font-semibold">Built around user control.</h2>
        <p className="mt-3 text-lg">
          Accessibility assistance should support the user—not replace the user.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-secondary-foreground">
          <li>AccessGuide explains, but never fills in an answer on your behalf.</li>
          <li>Voice assistance only listens after you press Start listening.</li>
          <li>No application is submitted until you tick the confirmation box yourself.</li>
          <li>No medical or disability information is collected anywhere on this site.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to="/jobs">Find Accessible Jobs</ButtonLink>
          <ButtonLink to="/accessibility" variant="outline">
            Accessibility Settings
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}
