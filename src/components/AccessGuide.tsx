import { useEffect, useRef, useState } from "react";
import { MessageCircleQuestion, Send, X } from "lucide-react";
import { Button } from "./ui-kit";

type Message = { id: number; from: "user" | "guide"; text: string };

const SUGGESTED = [
  "What does this job require?",
  "Explain this question",
  "Why am I getting this error?",
  "What should I enter here?",
];

const KNOWLEDGE: { match: string[]; answer: string }[] = [
  {
    match: ["preferred"],
    answer:
      "Preferred means the employer would like this skill or experience, but it may not be mandatory. You can still apply without it.",
  },
  {
    match: ["required", "mandatory"],
    answer:
      "Required means the employer expects you to already have this. On each demo job page, required items are listed in the green REQUIRED box and preferred items in the blue PREFERRED box.",
  },
  {
    match: ["this job require", "job require", "what does this job"],
    answer:
      "Open the job you are interested in and press “Explain This Job”. It rewrites the listing in plain language and separates required skills from preferred ones. Nothing is invented — only what the listing already says.",
  },
  {
    match: ["python"],
    answer:
      "This question asks about your previous experience using Python. You can mention college projects, internships or personal projects. If you have not used Python, say so honestly — it is treated as preferred on some of these roles.",
  },
  {
    match: ["error", "invalid", "wrong"],
    answer:
      "Errors appear in a summary box at the top of the step and next to the field itself. Each one says what is wrong and how to fix it. Select the link in the summary to jump straight to that field.",
  },
  {
    match: ["email"],
    answer:
      "Enter an address you check regularly, in the form name@example.com. The employer would use it to reply to you. This is a demo, so nothing is actually sent.",
  },
  {
    match: ["experience", "fresher", "beginner"],
    answer:
      "If you have no paid work experience, write about coursework, volunteering, freelance work or personal projects. Two of the demo jobs are open to beginners.",
  },
  {
    match: ["enter here", "what should i"],
    answer:
      "Every field has a short description under its label explaining what to write. Fields marked “Required” must be filled before you can move to the next step; anything marked “Optional” can be left empty.",
  },
  {
    match: ["submit", "submitted", "send"],
    answer:
      "Nothing is submitted until you tick the confirmation checkbox and press “Confirm Submission” yourself. I never submit an application for you.",
  },
  {
    match: ["save", "later"],
    answer:
      "Press “Save & Continue Later” on any step. Your answers are stored on this device and the job appears as a Draft in My Applications.",
  },
  {
    match: ["voice", "microphone"],
    answer:
      "Voice assistance is optional. Turn it on in Accessibility Settings, then press “Start listening” each time you want to speak a command. It never listens on its own.",
  },
  {
    match: ["help", "hi", "hello"],
    answer:
      "I can explain job requirements, form questions, error messages and the difference between required and preferred skills. Try one of the suggested questions below.",
  },
];

function answerFor(question: string) {
  const q = question.toLowerCase();
  const hit = KNOWLEDGE.find((k) => k.match.some((m) => q.includes(m)));
  return (
    hit?.answer ??
    "I can help with job requirements, form questions and error messages. Try asking “What does preferred mean?”, “Explain this question” or “Why am I getting this error?”."
  );
}

export function AccessGuide() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "guide",
      text: "Hello, I am AccessGuide. I explain jobs, questions and errors. I will never submit an application for you.",
    },
  ]);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("input")?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length, from: "user", text },
      { id: prev.length + 1, from: "guide", text: answerFor(text) },
    ]);
    setInput("");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        aria-label="Open AccessGuide"
        className="fixed bottom-4 right-4 z-40 inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:bg-primary/90 hover:scale-105 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:font-medium sm:hover:scale-none"
      >
        <MessageCircleQuestion aria-hidden="true" className="size-5" />
        <span className="hidden sm:inline">Ask AccessGuide</span>
      </button>
    );
  }

  return (
    <section
      ref={panelRef}
      aria-labelledby="guide-title"
      className="fixed bottom-4 right-4 z-40 flex max-h-[80dvh] w-[min(24rem,calc(100vw-2rem))] flex-col card-surface p-0"
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 id="guide-title" className="text-base font-semibold">
          AccessGuide — Application Guide
        </h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close AccessGuide"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-input hover:bg-muted"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with AccessGuide"
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((m) => (
          <p
            key={m.id}
            className={
              m.from === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                : "w-fit max-w-[90%] rounded-2xl bg-muted px-3 py-2 text-sm"
            }
          >
            <span className="sr-only">{m.from === "user" ? "You said: " : "AccessGuide said: "}</span>
            {m.text}
          </p>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Suggested questions
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="rounded-full border border-input px-3 py-2 text-left text-xs hover:bg-muted"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <label htmlFor="guide-input" className="sr-only">
            Ask AccessGuide a question
          </label>
          <input
            id="guide-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="min-h-11 flex-1 rounded-xl border border-input bg-card px-3 text-sm placeholder:text-muted-foreground"
          />
          <Button type="submit" aria-label="Send question">
            <Send aria-hidden="true" className="size-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
