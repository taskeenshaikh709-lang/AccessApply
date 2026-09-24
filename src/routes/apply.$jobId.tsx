import { useEffect, useRef, useState } from "react";
import { createFileRoute, notFound, useNavigate, Link } from "@tanstack/react-router";
import { AlertCircle, Save, HelpCircle } from "lucide-react";
import { getJob } from "@/data/jobs";
import { Button, Card, DemoBadge, Pill } from "@/components/ui-kit";
import { useA11y, speak } from "@/lib/a11y";
import { useVoiceCommands } from "@/lib/voice";
import {
  addApplication,
  clearDraft,
  emptyForm,
  getDrafts,
  nextApplicationId,
  saveDraft,
  type FormData,
} from "@/lib/applications";

export const Route = createFileRoute("/apply/$jobId")({
  loader: ({ params }) => {
    const job = getJob(params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Application — AccessApply" }, { name: "robots", content: "noindex" }] };
    const title = `Apply: ${loaderData.job.title} — AccessApply`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Complete the demo application for ${loaderData.job.title} at ${loaderData.job.company} with accessibility support at every step.`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "A five-step accessible application with guidance, clear errors and user-controlled submission.",
        },
      ],
    };
  },
  component: ApplyPage,
});

const STEPS = ["Personal Information", "Experience", "Skills", "Questions", "Review"];
const ASSIST_OPTIONS = [
  "Keyboard",
  "Screen Reader",
  "Visual Assistance",
  "Voice Assistance",
  "Simplified Reading",
  "Standard Mode",
];
const SKILL_OPTIONS = ["Python", "SQL", "JavaScript"];

type Errors = Record<string, { message: string; fix: string }>;

function Field({
  id,
  label,
  description,
  required,
  error,
  children,
  onExplain,
}: {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  error?: { message: string; fix: string } | undefined;
  children: (props: { id: string; describedBy: string; invalid: boolean }) => React.ReactNode;
  onExplain: (message: string) => void;
}) {
  const describedBy = `${id}-desc${error ? ` ${id}-error` : ""}`;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block font-semibold">
        {label}{" "}
        <span className={required ? "text-primary" : "text-muted-foreground"}>
          ({required ? "Required" : "Optional"})
        </span>
      </label>
      <p id={`${id}-desc`} className="text-sm text-muted-foreground">
        {description}
      </p>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <div id={`${id}-error`} className="rounded-xl border border-destructive bg-card p-3">
          <p className="flex items-start gap-2 text-sm font-medium text-destructive">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {error.message}
          </p>
          <button
            type="button"
            onClick={() => onExplain(`${error.message} ${error.fix}`)}
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg border border-input px-3 py-1.5 text-sm hover:bg-muted"
          >
            <HelpCircle aria-hidden="true" className="size-4" /> Explain this error
          </button>
        </div>
      ) : null}
    </div>
  );
}

const inputClass = (invalid: boolean) =>
  `min-h-11 w-full rounded-xl border bg-card px-3 py-2 ${invalid ? "border-destructive" : "border-input"}`;

function ApplyPage() {
  const { job } = Route.useLoaderData();
  const navigate = useNavigate();
  const { announce } = useA11y();

  const [onboarded, setOnboarded] = useState(false);
  const [assist, setAssist] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState("");
  const [explanation, setExplanation] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const draft = getDrafts()[job.id];
    if (draft) {
      setData(draft.data);
      setStep(draft.step);
    }
  }, [job.id]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const explainError = (message: string) => {
    setExplanation(message);
    announce(message);
    speak(message);
  };

  const validate = (current: number): Errors => {
    const e: Errors = {};
    if (current === 0) {
      if (!data.fullName.trim())
        e["fullName"] = {
          message: "Please enter your full name.",
          fix: "Type the name you would like the employer to use, for example: Priya Sharma.",
        };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
        e["email"] = {
          message: "Please enter a valid email address, for example: name@example.com",
          fix: "An email address needs one @ sign and a dot in the part after it.",
        };
      if (!/^[0-9+\s-]{8,15}$/.test(data.phone.trim()))
        e["phone"] = {
          message: "Please enter a phone number with 8 to 15 digits, for example: 9876543210",
          fix: "Digits, spaces, plus signs and hyphens are allowed. Remove any letters.",
        };
      if (!data.location.trim())
        e["location"] = {
          message: "Please enter the city or region where you are based.",
          fix: "For example: Pune, or Remote from Kochi.",
        };
    }
    if (current === 1) {
      if (!data.education.trim())
        e["education"] = {
          message: "Please describe your education.",
          fix: "One line is enough, for example: B.Sc. Computer Science, 2025.",
        };
      if (!data.experience.trim())
        e["experience"] = {
          message: "Please describe your experience.",
          fix: "If you have not worked yet, write about coursework, volunteering or internships.",
        };
    }
    if (current === 2) {
      if (data.skills.length === 0 && !data.otherSkills.trim())
        e["skills"] = {
          message: "Please select at least one skill, or list your skills in the other skills box.",
          fix: "Tick any skill you have used, including in college projects.",
        };
    }
    if (current === 3) {
      if (data.whyRole.trim().length < 20)
        e["whyRole"] = {
          message: "Please write at least 20 characters about why this role interests you.",
          fix: "One or two sentences is enough. Mention what part of the job appeals to you.",
        };
      if (!data.availability.trim())
        e["availability"] = {
          message: "Please tell the employer when you could start.",
          fix: "For example: Immediately, or from 1 November 2026.",
        };
    }
    return e;
  };

  const goNext = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      announce(`${Object.keys(e).length} items need your attention before you can continue.`);
      window.setTimeout(() => summaryRef.current?.focus(), 60);
      return;
    }
    setExplanation("");
    setStep((s) => Math.min(s + 1, 4));
    announce(`Step ${Math.min(step + 2, 5)} of 5: ${STEPS[Math.min(step + 1, 4)]}`);
    window.setTimeout(() => headingRef.current?.focus(), 60);
  };

  const goPrev = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    window.setTimeout(() => headingRef.current?.focus(), 60);
  };

  const save = () => {
    saveDraft({ jobId: job.id, step, data, savedAt: new Date().toISOString() });
    setSaved("Your application has been saved. You can return to it from My Applications.");
    announce("Your application has been saved.");
  };

  const submit = () => {
    if (!confirmChecked) {
      setConfirmError("Please tick the box to confirm you have reviewed your application.");
      return;
    }
    const id = nextApplicationId();
    addApplication({
      id,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: "Submitted",
      submittedAt: new Date().toISOString().slice(0, 10),
      data,
    });
    clearDraft(job.id);
    navigate({ to: "/success/$appId", params: { appId: id } });
  };

  useVoiceCommands({
    next: goNext,
    previous: goPrev,
    save,
    skills: () => setStep(2),
    readError: () => {
      const list = Object.values(errors);
      const text = list.length
        ? list.map((e) => `${e.message} ${e.fix}`).join(" ")
        : "There are no errors on this step.";
      announce(text);
      speak(text);
    },
    help: () => announce("Use next, previous, go to skills, read error or save application."),
  });

  if (!onboarded) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <DemoBadge />
        <h1 className="text-3xl font-semibold">Let’s make this application work for you.</h1>
        <p className="text-muted-foreground">
          You are applying for {job.title} at {job.company}. This is a demo employer.
        </p>
        <Card>
          <fieldset className="border-0 p-0">
            <legend className="text-lg font-semibold">
              How would you like to use the application?
            </legend>
            <p className="mt-2 text-sm text-muted-foreground">
              You can choose the assistance that works best for you. You do not need to provide
              medical or disability information. Select as many as you like, or none at all.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {ASSIST_OPTIONS.map((opt) => {
                const id = `assist-${opt.replace(/\s+/g, "-").toLowerCase()}`;
                const checked = assist.includes(opt);
                return (
                  <div key={opt} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <input
                      id={id}
                      type="checkbox"
                      className="size-5"
                      checked={checked}
                      onChange={(e) =>
                        setAssist((prev) =>
                          e.target.checked ? [...prev, opt] : prev.filter((p) => p !== opt),
                        )
                      }
                    />
                    <label htmlFor={id}>{opt}</label>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                setOnboarded(true);
                announce("Step 1 of 5: Personal Information");
              }}
            >
              Continue
            </Button>
            <Link to="/jobs/$jobId" params={{ jobId: job.id }} className="inline-flex min-h-11 items-center px-3 text-primary hover:underline">
              Back to the job
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const errorList = Object.entries(errors);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <DemoBadge />
      <div>
        <p className="text-sm font-semibold text-primary">
          Step {step + 1} of 5
        </p>
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold">
          {STEPS[step]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {job.title} at {job.company}
        </p>
        <div
          className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
          role="img"
          aria-label={`Application progress: step ${step + 1} of 5`}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((step + 1) / 5) * 100}%` }}
          />
        </div>
      </div>

      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border-2 border-destructive bg-card p-4"
        >
          <h2 className="text-lg font-semibold text-destructive">
            {errorList.length} {errorList.length === 1 ? "item needs" : "items need"} your attention
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([key, e]) => (
              <li key={key}>
                <a href={`#${key}`} className="text-destructive underline">
                  {e.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {explanation ? (
        <Card className="bg-softblue" role="status">
          <h2 className="font-semibold">AccessGuide explains</h2>
          <p className="mt-1 text-sm">{explanation}</p>
        </Card>
      ) : null}

      {saved ? (
        <p role="status" className="rounded-xl border border-success bg-card p-3 text-sm">
          {saved}
        </p>
      ) : null}

      <Card className="space-y-6">
        {step === 0 ? (
          <>
            <Field id="fullName" label="Full name" description="The name the employer should use when replying to you." required error={errors["fullName"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <input id={id} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.fullName} onChange={(e) => set("fullName", e.target.value)} maxLength={100} />
              )}
            </Field>
            <Field id="email" label="Email address" description="Use an address you check often, for example name@example.com." required error={errors["email"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <input id={id} type="email" aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.email} onChange={(e) => set("email", e.target.value)} maxLength={255} />
              )}
            </Field>
            <Field id="phone" label="Phone number" description="Digits only, 8 to 15 characters. Spaces and plus signs are allowed." required error={errors["phone"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <input id={id} type="tel" aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.phone} onChange={(e) => set("phone", e.target.value)} maxLength={20} />
              )}
            </Field>
            <Field id="location" label="Location" description="The city or region you would work from." required error={errors["location"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <input id={id} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.location} onChange={(e) => set("location", e.target.value)} maxLength={100} />
              )}
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field id="education" label="Education" description="Your highest or most relevant qualification, and the year." required error={errors["education"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <textarea id={id} rows={3} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.education} onChange={(e) => set("education", e.target.value)} maxLength={500} />
              )}
            </Field>
            <Field id="experience" label="Work experience" description="Jobs, internships or volunteering. Write “No paid experience yet” if that is the case." required error={errors["experience"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <textarea id={id} rows={4} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.experience} onChange={(e) => set("experience", e.target.value)} maxLength={1000} />
              )}
            </Field>
            <Field id="projects" label="Projects" description="Any project you built or helped with, including college work." error={errors["projects"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <textarea id={id} rows={3} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.projects} onChange={(e) => set("projects", e.target.value)} maxLength={1000} />
              )}
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <fieldset id="skills" className="border-0 p-0">
              <legend className="font-semibold">
                Which of these skills have you used? <span className="text-primary">(Required)</span>
              </legend>
              <p className="text-sm text-muted-foreground">
                Select all that apply. Coursework and personal projects count.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {SKILL_OPTIONS.map((s) => {
                  const id = `skill-${s.toLowerCase()}`;
                  return (
                    <div key={s} className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <input
                        id={id}
                        type="checkbox"
                        className="size-5"
                        checked={data.skills.includes(s)}
                        onChange={(e) =>
                          set(
                            "skills",
                            e.target.checked
                              ? [...data.skills, s]
                              : data.skills.filter((x) => x !== s),
                          )
                        }
                      />
                      <label htmlFor={id}>{s}</label>
                    </div>
                  );
                })}
              </div>
              {errors["skills"] ? (
                <div role="alert" className="mt-3 rounded-xl border border-destructive p-3">
                  <p className="text-sm font-medium text-destructive">{errors["skills"].message}</p>
                  <button
                    type="button"
                    onClick={() => explainError(`${errors["skills"]!.message} ${errors["skills"]!.fix}`)}
                    className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg border border-input px-3 py-1.5 text-sm hover:bg-muted"
                  >
                    <HelpCircle aria-hidden="true" className="size-4" /> Explain this error
                  </button>
                </div>
              ) : null}
            </fieldset>
            <Field id="otherSkills" label="Other skills" description="Anything else you would like the employer to know about, separated by commas." onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <input id={id} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.otherSkills} onChange={(e) => set("otherSkills", e.target.value)} maxLength={300} />
              )}
            </Field>
            <div className="rounded-xl bg-muted p-4 text-sm">
              <p className="font-semibold">For this role</p>
              <p className="mt-1 text-muted-foreground">
                Required: {job.required.join(", ")}. Preferred: {job.preferred.join(", ")}.
                Preferred means the employer would like it, but it may not be mandatory.
              </p>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <Field id="whyRole" label={`Why are you interested in this ${job.title} role?`} description="One or two sentences. Mention what part of the job appeals to you." required error={errors["whyRole"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <textarea id={id} rows={4} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.whyRole} onChange={(e) => set("whyRole", e.target.value)} maxLength={1000} />
              )}
            </Field>
            <Field id="pythonExperience" label="Describe your experience using Python" description="College projects, internships and personal projects all count. Write “None yet” if you have not used it." error={errors["pythonExperience"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <textarea id={id} rows={3} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.pythonExperience} onChange={(e) => set("pythonExperience", e.target.value)} maxLength={1000} />
              )}
            </Field>
            <Field id="availability" label="When could you start?" description="For example: Immediately, or from 1 November 2026." required error={errors["availability"]} onExplain={explainError}>
              {({ id, describedBy, invalid }) => (
                <input id={id} aria-describedby={describedBy} aria-invalid={invalid} className={inputClass(invalid)} value={data.availability} onChange={(e) => set("availability", e.target.value)} maxLength={120} />
              )}
            </Field>
          </>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <div className="rounded-xl bg-lavender p-4">
              <h2 className="text-xl font-semibold">Review Your Application</h2>
              <p className="mt-1 text-sm">Please review your answers before submitting.</p>
            </div>
            {[
              { title: "Personal Information", to: 0, rows: [["Full name", data.fullName], ["Email", data.email], ["Phone", data.phone], ["Location", data.location]] },
              { title: "Experience", to: 1, rows: [["Education", data.education], ["Work experience", data.experience], ["Projects", data.projects || "Not provided"]] },
              { title: "Skills", to: 2, rows: [["Selected skills", data.skills.join(", ") || "None selected"], ["Other skills", data.otherSkills || "Not provided"]] },
              { title: "Application Questions", to: 3, rows: [["Why this role", data.whyRole], ["Python experience", data.pythonExperience || "Not provided"], ["Availability", data.availability]] },
            ].map((section) => (
              <section key={section.title} aria-labelledby={`review-${section.to}`} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 id={`review-${section.to}`} className="text-lg font-semibold">
                    {section.title}
                  </h3>
                  <Button variant="outline" onClick={() => setStep(section.to)}>
                    Edit<span className="sr-only"> {section.title}</span>
                  </Button>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  {section.rows.map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-semibold">{k}</dt>
                      <dd className="text-muted-foreground">{v || "Not provided"}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => { setConfirmOpen(true); setConfirmError(""); }}>
                Confirm &amp; Submit Application
              </Button>
              <Button variant="outline" onClick={save}>
                <Save aria-hidden="true" className="size-4" /> Save &amp; Continue Later
              </Button>
            </div>
          </div>
        ) : null}

        {step < 4 ? (
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <Button variant="outline" onClick={goPrev} disabled={step === 0}>
              Back
            </Button>
            <Button onClick={goNext}>Next</Button>
            <Button variant="ghost" onClick={save}>
              <Save aria-hidden="true" className="size-4" /> Save &amp; Continue Later
            </Button>
            <Pill tone="muted">Nothing is submitted until you confirm at step 5</Pill>
          </div>
        ) : null}
      </Card>

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-foreground/50" aria-hidden="true" onClick={() => setConfirmOpen(false)} />
          <div role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="relative w-full max-w-md card-surface p-6">
            <h2 id="confirm-title" className="text-xl font-semibold">
              You are about to submit this application to the demo employer.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {job.title} at {job.company}. This is sample data and is not sent to a real employer.
            </p>
            <div className="mt-4 flex items-start gap-3">
              <input
                id="confirm-check"
                type="checkbox"
                className="mt-1 size-5"
                checked={confirmChecked}
                onChange={(e) => { setConfirmChecked(e.target.checked); setConfirmError(""); }}
              />
              <label htmlFor="confirm-check">
                I have reviewed my application and want to submit it.
              </label>
            </div>
            {confirmError ? (
              <p role="alert" className="mt-3 text-sm font-medium text-destructive">
                {confirmError}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={submit}>Confirm Submission</Button>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
