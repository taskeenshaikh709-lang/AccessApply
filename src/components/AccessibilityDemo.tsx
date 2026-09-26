import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Contrast, Sparkles, Type, Volume2, VolumeX } from "lucide-react";
import { Button, Card, SectionHeading } from "@/components/ui-kit";
import { speak, stopSpeaking, useA11y, type Settings } from "@/lib/a11y";
import { cn } from "@/lib/utils";

const SAMPLE =
  "This job mainly needs Python and SQL skills. You should also be comfortable creating charts and reports. Required: Python, SQL and basic statistics. Preferred: Power BI, Tableau and machine learning.";

const SIZES: Settings["fontSize"][] = ["sm", "md", "lg", "xl"];

/** Homepage demo: switches that change a real sample text block live. */
export function AccessibilityDemo() {
  const { settings, update, announce } = useA11y();
  const [big, setBig] = useState(false);
  const [high, setHigh] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [note, setNote] = useState("");
  const [applied, setApplied] = useState(false);

  const toggleVoice = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      setNote("Stopped reading.");
      return;
    }
    const ok = speak(SAMPLE, () => setSpeaking(false));
    if (!ok) {
      setNote("Voice reading is not available in this browser. The text stays fully readable and selectable.");
      announce("Voice reading is not available in this browser.");
      return;
    }
    setSpeaking(true);
    setNote("Reading the sample text aloud.");
  };

  const applyToSite = () => {
    if (big) {
      const next =
        SIZES[Math.min(SIZES.indexOf(settings.fontSize) + 1, SIZES.length - 1)] ??
        settings.fontSize;
      if (next !== settings.fontSize) update("fontSize", next);
    }
    if (high) update("contrast", "high");
    setApplied(true);
    const message =
      big || high
        ? "Your demo choices are now applied across the whole site and will stay on when you move between pages."
        : "Turn on a switch above first, then apply it to the whole site.";
    setNote(message);
    announce(message);
  };

  return (
    <section aria-labelledby="demo-title" className="space-y-6">
      <SectionHeading
        id="demo-title"
        eyebrow="Try it now"
        title="See Accessibility Working on Real Text"
        description="Turn a switch on and the sample below changes straight away. This is the same kind of job information you read on a job page."
      />
      <div className="grid gap-4 lg:grid-cols-[22rem_1fr]">
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold">Sample controls</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={big ? "primary" : "outline"}
              aria-pressed={big}
              onClick={() => setBig((v) => !v)}
            >
              <Type aria-hidden="true" className="size-4" /> Larger text
            </Button>
            <Button
              variant={high ? "primary" : "outline"}
              aria-pressed={high}
              onClick={() => setHigh((v) => !v)}
            >
              <Contrast aria-hidden="true" className="size-4" /> High contrast
            </Button>
            <Button
              variant={speaking ? "primary" : "outline"}
              aria-pressed={speaking}
              onClick={toggleVoice}
            >
              {speaking ? (
                <VolumeX aria-hidden="true" className="size-4" />
              ) : (
                <Volume2 aria-hidden="true" className="size-4" />
              )}
              Voice reading
            </Button>
          </div>
          {note ? (
            <p role="status" className="text-sm text-muted-foreground">
              {note}
            </p>
          ) : null}
          <div className="border-t border-border pt-4">
            <Button variant="secondary" onClick={applyToSite}>
              <Sparkles aria-hidden="true" className="size-4" /> Apply these to the whole site
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Or choose from every option in{" "}
              <Link to="/accessibility" className="font-medium text-primary hover:underline">
                accessibility settings
              </Link>
              . Choices are stored in this browser only.
            </p>
          </div>
        </Card>

        <Card
          className={cn(
            "transition-colors duration-200",
            high && "demo-high-contrast",
          )}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Data Analyst — InsightWorks
          </p>
          <p
            className={cn(
              "mt-3 transition-all duration-200",
              big ? "text-xl leading-relaxed" : "text-base",
            )}
          >
            {SAMPLE}
          </p>
        </Card>
      </div>
      {applied ? (
        <p role="status" className="text-sm font-medium text-success">
          Applied. Browse any page to see the change site-wide, or reset it in accessibility settings.
        </p>
      ) : null}
    </section>
  );
}
