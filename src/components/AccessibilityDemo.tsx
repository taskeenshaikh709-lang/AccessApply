import { useEffect, useState } from "react";
import { Contrast, Mic, Type } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink, Card, SectionHeading } from "@/components/ui-kit";
import { speak, stopSpeaking, useA11y } from "@/lib/a11y";

const SAMPLE_TEXT =
  "This job mainly needs Python and SQL skills. You should also be comfortable creating charts and reports. Coursework and personal projects count as experience.";

type DemoToggleKey = "large" | "contrast" | "voice";

const toggles: { key: DemoToggleKey; label: string; description: string; icon: LucideIcon }[] = [
  {
    key: "large",
    label: "Larger text",
    description: "Increases the size of the sample text.",
    icon: Type,
  },
  {
    key: "contrast",
    label: "High contrast",
    description: "Switches the sample to maximum-contrast colours.",
    icon: Contrast,
  },
  {
    key: "voice",
    label: "Voice reading",
    description: "Reads the sample text aloud using your browser's speech.",
    icon: Mic,
  },
];

/**
 * Live demo of the accessibility controls on the homepage. Each toggle changes
 * the sample text block immediately; it never touches the site-wide settings.
 */
export function AccessibilityDemo() {
  const { announce } = useA11y();
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [voice, setVoice] = useState(false);

  useEffect(() => () => stopSpeaking(), []);

  const toggle = (key: DemoToggleKey) => {
    if (key === "large") {
      const next = !large;
      setLarge(next);
      announce(next ? "Larger text applied to the sample." : "Larger text removed from the sample.");
    } else if (key === "contrast") {
      const next = !contrast;
      setContrast(next);
      announce(next ? "High contrast applied to the sample." : "High contrast removed from the sample.");
    } else if (!voice) {
      const started = speak(SAMPLE_TEXT);
      setVoice(started);
      announce(
        started
          ? "Reading the sample text aloud."
          : "Voice reading is not supported in this browser.",
      );
    } else {
      stopSpeaking();
      setVoice(false);
      announce("Voice reading stopped.");
    }
  };

  const status = voice
    ? "Reading the sample text aloud…"
    : large && contrast
      ? "Larger text and high contrast applied to the sample."
      : large
        ? "Larger text applied to the sample."
        : contrast
          ? "High contrast applied to the sample."
          : "Sample shown with standard styling.";

  return (
    <section aria-labelledby="try-title">
      <SectionHeading
        id="try-title"
        eyebrow="Try it live"
        title="See the Support Work Before You Apply"
        description="These toggles change the sample text on this page right now. The same settings, and more, are available site-wide from Accessibility Settings."
      />
      <Card className="mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-[22rem_1fr]">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">Sample controls</legend>
          {toggles.map(({ key, label, description, icon: Icon }) => {
            const on = key === "large" ? large : key === "contrast" ? contrast : voice;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(key)}
                className={`min-h-11 w-full rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-card hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {label}
                  <span className="ml-auto text-xs font-semibold uppercase tracking-wide">
                    {on ? "On" : "Off"}
                  </span>
                </span>
                <span className="sr-only"> — {description}</span>
              </button>
            );
          })}
        </fieldset>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Sample text</p>
          <div
            className={
              contrast
                ? "rounded-xl border-2 border-foreground bg-foreground px-5 py-4 text-background"
                : "rounded-xl border border-border bg-softblue px-5 py-4 text-accent-foreground"
            }
          >
            <p className={`font-display font-semibold ${large ? "text-2xl" : "text-lg"}`}>
              Data Analyst — what this job needs
            </p>
            <p className={`mt-2 leading-relaxed ${large ? "text-xl" : "text-base"}`}>{SAMPLE_TEXT}</p>
          </div>
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {status}
          </p>
          <div>
            <ButtonLink to="/accessibility" variant="secondary">
              Open Accessibility Settings
            </ButtonLink>
          </div>
        </div>
      </Card>
    </section>
  );
}
