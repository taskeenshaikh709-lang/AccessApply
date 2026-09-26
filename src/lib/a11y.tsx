import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { KEYS, readJSON, writeJSON } from "./storage";

export type Settings = {
  fontSize: "sm" | "md" | "lg" | "xl";
  contrast: "standard" | "high";
  motion: "standard" | "reduced";
  spacing: "standard" | "wide";
  font: "standard" | "dyslexic";
  focusHighlight: boolean;
  voice: boolean;
  screenReaderMode: boolean;
};

export const defaultSettings: Settings = {
  fontSize: "md",
  contrast: "standard",
  motion: "standard",
  spacing: "standard",
  font: "standard",
  focusHighlight: true,
  voice: false,
  screenReaderMode: false,
};

type Ctx = {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  announce: (message: string) => void;
  announcement: string;
};

const A11yContext = createContext<Ctx | null>(null);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [panelOpen, setPanelOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setSettings({ ...defaultSettings, ...readJSON<Partial<Settings>>(KEYS.settings, {}) });
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.dataset["fontsize"] = settings.fontSize;
    el.dataset["contrast"] = settings.contrast;
    el.dataset["motion"] = settings.motion;
    el.dataset["spacing"] = settings.spacing;
    el.dataset["font"] = settings.font;
    el.dataset["focus"] = settings.focusHighlight ? "strong" : "standard";
    el.dataset["sr"] = settings.screenReaderMode ? "on" : "off";
  }, [settings]);

  const update = useCallback<Ctx["update"]>((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      writeJSON(KEYS.settings, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(defaultSettings);
    writeJSON(KEYS.settings, defaultSettings);
    setAnnouncement("Accessibility settings reset to defaults.");
  }, []);

  const announce = useCallback((message: string) => {
    setAnnouncement("");
    window.setTimeout(() => setAnnouncement(message), 60);
  }, []);

  const value = useMemo(
    () => ({ settings, update, reset, panelOpen, setPanelOpen, announce, announcement }),
    [settings, update, reset, panelOpen, announce, announcement],
  );

  return (
    <A11yContext.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used inside A11yProvider");
  return ctx;
}

/** Speak text aloud when the browser supports speech synthesis. */
export function speak(text: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
