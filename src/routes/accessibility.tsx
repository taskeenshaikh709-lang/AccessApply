import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading } from "@/components/ui-kit";
import { AccessibilitySettingsControls } from "@/components/AccessibilityPanel";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Settings — AccessApply" },
      {
        name: "description",
        content:
          "Adjust text size, contrast, motion, spacing, font, focus highlight, voice assistance and screen reader mode. Settings are saved on your device.",
      },
      { property: "og:title", content: "Accessibility Settings — AccessApply" },
      {
        property: "og:description",
        content: "Change how AccessApply looks and behaves. Your preferences persist across pages.",
      },
    ],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Settings"
        title="Accessibility Settings"
        description="Every option here changes the interface straight away and is saved on this device. You can open the same settings from the Accessibility button in the header on any page."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <AccessibilitySettingsControls />
        </Card>
        <aside aria-labelledby="keyboard-title" className="space-y-4">
          <Card>
            <h2 id="keyboard-title" className="text-lg font-semibold">
              Keyboard shortcuts
            </h2>
            <dl className="mt-3 space-y-3 text-sm">
              {[
                ["Tab / Shift + Tab", "Move forward and backward through the page."],
                ["Enter or Space", "Activate the button or link you are on."],
                ["Escape", "Close the accessibility panel or a confirmation dialog."],
                ["Skip to main content", "First Tab stop on every page."],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold">{k}</dt>
                  <dd className="text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Privacy</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Preferences are stored only in this browser. AccessApply never asks for medical or
              disability information, and nothing is sent to a server.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
