import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Accessibility, Menu, UserRound, X } from "lucide-react";
import { useA11y } from "@/lib/a11y";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/dashboard", label: "My Applications" },
  { to: "/accessibility", label: "Accessibility" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const { setPanelOpen } = useA11y();
  const [open, setOpen] = useState(false);

  const navLink = (to: (typeof links)[number]["to"], label: string) => (
    <Link
      key={to}
      to={to}
      onClick={() => setOpen(false)}
      activeOptions={{ exact: to === "/" }}
      activeProps={{ className: "text-primary font-semibold underline underline-offset-8" }}
      inactiveProps={{ className: "text-foreground" }}
      className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 hover:bg-muted"
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 rounded-lg px-1 py-2 text-xl font-semibold">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"
          >
            A
          </span>
          <span className="font-display">AccessApply</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => navLink(l.to, l.label))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-input bg-card px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            <Accessibility aria-hidden="true" className="size-5" />
            <span className="hidden sm:inline">Accessibility</span>
            <span className="sr-only sm:hidden">Open accessibility settings</span>
          </button>
          <Link
            to="/dashboard"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-input bg-card hover:bg-muted"
            aria-label="Profile and my applications"
          >
            <UserRound aria-hidden="true" className="size-5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-input bg-card hover:bg-muted lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-card lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col p-2">
            {links.map((l) => navLink(l.to, l.label))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
