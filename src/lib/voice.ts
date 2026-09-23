import { useEffect } from "react";

export type VoiceHandlers = Record<string, () => void>;

const registry: { handlers: VoiceHandlers } = { handlers: {} };

/** Register voice/keyboard command handlers for the current page. */
export function useVoiceCommands(handlers: VoiceHandlers) {
  useEffect(() => {
    registry.handlers = handlers;
    return () => {
      registry.handlers = {};
    };
  });
}

export function runCommand(transcript: string): string {
  const text = transcript.toLowerCase().trim();
  const h = registry.handlers;
  const match = (...keys: string[]) => keys.find((k) => text.includes(k));

  if (match("read job", "read this job")) return call(h, "readJob", "Reading the job aloud.");
  if (match("explain this", "explain")) return call(h, "explain", "Opening the explanation.");
  if (match("go to skills", "skills")) return call(h, "skills", "Going to the skills step.");
  if (match("read error", "error")) return call(h, "readError", "Reading the errors.");
  if (match("save application", "save")) return call(h, "save", "Saving your application.");
  if (match("previous", "back", "go back")) return call(h, "previous", "Going back.");
  if (match("next", "continue")) return call(h, "next", "Moving to the next step.");
  if (match("help")) return call(h, "help", "Opening help.");
  return `Sorry, I did not recognise "${transcript}". Try: read job, next, previous, explain this, help, go to skills, read error, or save application.`;
}

function call(h: VoiceHandlers, key: string, ok: string) {
  const fn = h[key];
  if (!fn) return "That command is not available on this page.";
  fn();
  return ok;
}
