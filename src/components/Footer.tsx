import { Link } from "@tanstack/react-router";
import { DemoBadge } from "./ui-kit";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">AccessApply</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Making every step of the job application journey more accessible.
          </p>
          <DemoBadge className="mt-4" />
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Explore</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link to="/jobs" className="inline-block min-h-11 py-2 hover:underline">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="inline-block min-h-11 py-2 hover:underline">
                My Applications
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="inline-block min-h-11 py-2 hover:underline">
                Accessibility Settings
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="inline-block min-h-11 py-2 hover:underline">
                How It Works
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">About this prototype</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            All jobs, employers and applications on this site are sample data created for a
            hackathon demo. Nothing you enter is sent to a real employer, and no medical or
            disability information is ever requested.
          </p>
        </div>
      </div>
    </footer>
  );
}
