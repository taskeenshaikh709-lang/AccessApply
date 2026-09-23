import { useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useA11y, speak } from "@/lib/a11y";
import { runCommand } from "@/lib/voice";
import { Button } from "./ui-kit";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

const COMMANDS = [
  "Read this job",
  "Next",
  "Previous",
  "Explain this",
  "Help",
  "Go to skills",
  "Read error",
  "Save application",
];

export function VoiceAssistant() {
  const { settings, announce } = useA11y();
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("Voice assistance is ready. Nothing is recorded until you press Start listening.");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  if (!settings.voice) return null;

  const getRecognition = () => {
    if (typeof window === "undefined") return null;
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    return Ctor ? new Ctor() : null;
  };

  const start = () => {
    const recognition = getRecognition();
    if (!recognition) {
      const message =
        "Speech recognition is not available in this browser. You can still use every command with the buttons on the page or with the keyboard.";
      setStatus(message);
      announce(message);
      return;
    }
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const reply = runCommand(transcript);
      setStatus(`Heard: "${transcript}". ${reply}`);
      announce(reply);
      speak(reply);
    };
    recognition.onerror = () => {
      setStatus("I could not hear that. Press Start listening and try again.");
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setStatus("Listening… say a command.");
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setStatus("Stopped listening.");
  };

  return (
    <section
      aria-labelledby="voice-title"
      className="fixed bottom-4 left-4 z-40 w-[min(22rem,calc(100vw-2rem))] card-surface p-4"
    >
      <h2 id="voice-title" className="flex items-center gap-2 text-base font-semibold">
        <Mic aria-hidden="true" className="size-4 text-primary" /> Voice Assistance
      </h2>
      <p aria-live="polite" className="mt-2 text-sm text-muted-foreground">
        {listening ? "Listening…" : status}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {listening ? (
          <Button variant="outline" onClick={stop}>
            <MicOff aria-hidden="true" className="size-4" /> Stop listening
          </Button>
        ) : (
          <Button onClick={start}>
            <Mic aria-hidden="true" className="size-4" /> Start listening
          </Button>
        )}
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-medium">Commands you can use</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {COMMANDS.map((c) => (
            <li key={c}>“{c}”</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
