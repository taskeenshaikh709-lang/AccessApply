import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useA11y, type Settings } from "@/lib/a11y";
import { Button } from "./ui-kit";

function RadioGroup<K extends keyof Settings>({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: K;
  options: { value: Settings[K]; label: string }[];
  value: Settings[K];
  onChange: (v: Settings[K]) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-2 text-base font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const id = `${String(name)}-${String(opt.value)}`;
          const selected = value === opt.value;
          return (
            <span key={id}>
              <input
                type="radio"
                id={id}
                name={String(name)}
                className="peer sr-only"
                checked={selected}
                onChange={() => onChange(opt.value)}
              />
              <label
                htmlFor={id}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-xl border px-4 py-2 text-sm font-medium peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-primary ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-card text-foreground"
                }`}
              >
                {opt.label}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-muted/60 p-4">
      <span className="flex-1">
        <span className="block text-base font-semibold">{label}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`min-h-11 shrink-0 rounded-xl border px-4 py-2 text-sm font-semibold ${
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-card text-foreground"
        }`}
      >
        <span className="sr-only">{label}: </span>
        {checked ? "On" : "Off"}
      </button>
    </div>
  );
}

export function AccessibilitySettingsControls() {
  const { settings, update, reset, announce } = useA11y();

  return (
    <div className="space-y-6">
      <RadioGroup
        label="Text size"
        name="fontSize"
        value={settings.fontSize}
        onChange={(v) => {
          update("fontSize", v);
          announce("Text size updated.");
        }}
        options={[
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra large" },
        ]}
      />
      <RadioGroup
        label="Contrast"
        name="contrast"
        value={settings.contrast}
        onChange={(v) => update("contrast", v)}
        options={[
          { value: "standard", label: "Standard" },
          { value: "high", label: "High contrast" },
        ]}
      />
      <RadioGroup
        label="Motion"
        name="motion"
        value={settings.motion}
        onChange={(v) => update("motion", v)}
        options={[
          { value: "standard", label: "Standard" },
          { value: "reduced", label: "Reduced motion" },
        ]}
      />
      <RadioGroup
        label="Text spacing"
        name="spacing"
        value={settings.spacing}
        onChange={(v) => update("spacing", v)}
        options={[
          { value: "standard", label: "Standard" },
          { value: "wide", label: "Increased" },
        ]}
      />
      <RadioGroup
        label="Font"
        name="font"
        value={settings.font}
        onChange={(v) => update("font", v)}
        options={[
          { value: "standard", label: "Standard" },
          { value: "dyslexic", label: "Dyslexia friendly" },
        ]}
      />
      <Toggle
        label="Focus highlight"
        description="Show a thicker outline around the item you are on."
        checked={settings.focusHighlight}
        onChange={(v) => update("focusHighlight", v)}
      />
      <Toggle
        label="Voice assistance"
        description="Show the microphone and read-aloud controls. Nothing listens until you press start."
        checked={settings.voice}
        onChange={(v) => update("voice", v)}
      />
      <Toggle
        label="Screen reader friendly mode"
        description="Adds extra descriptions and hides decorative visuals."
        checked={settings.screenReaderMode}
        onChange={(v) => update("screenReaderMode", v)}
      />
      <Button variant="outline" onClick={reset}>
        Reset settings
      </Button>
    </div>
  );
}

export function AccessibilityPanel() {
  const { panelOpen, setPanelOpen } = useA11y();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const items = ref.current.querySelectorAll<HTMLElement>(
        'button, [href], input:not([type="radio"]), select, textarea, [tabindex]:not([tabindex="-1"]), input[type="radio"]:checked',
      );
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen, setPanelOpen]);

  if (!panelOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={() => setPanelOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-panel-title"
        className="absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col overflow-y-auto bg-card p-6 shadow-xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id="a11y-panel-title" className="text-2xl font-semibold">
            Accessibility Settings
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setPanelOpen(false)}
            aria-label="Close accessibility settings"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-input hover:bg-muted"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Your choices are saved on this device and apply to every page.
        </p>
        <AccessibilitySettingsControls />
      </div>
    </div>
  );
}
