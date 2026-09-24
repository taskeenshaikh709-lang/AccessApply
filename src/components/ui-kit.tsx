import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium min-h-11 px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-lavender text-secondary-foreground hover:bg-lavender/70 border border-border",
  outline: "border border-input bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
} as const;

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  to,
  params,
  ...props
}: Omit<ComponentProps<typeof Link>, "to" | "params"> & {
  variant?: Variant;
  to: string;
  params?: Record<string, string>;
}) {
  // Generic wrapper: callers supply concrete route paths/params, so narrow here.
  return (
    <Link
      to={to as never}
      params={params as never}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("card-surface p-6", className)} {...props} />;
}

export function Pill({ children, tone = "lavender" }: { children: ReactNode; tone?: "lavender" | "blue" | "muted" }) {
  const tones = {
    lavender: "bg-lavender text-secondary-foreground",
    blue: "bg-softblue text-accent-foreground",
    muted: "bg-muted text-muted-foreground",
  } as const;
  return (
    <span className={cn("rounded-full px-3 py-1 text-sm font-medium", tones[tone])}>{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-lg text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-softblue px-3 py-1 text-sm font-medium text-accent-foreground",
        className,
      )}
    >
      Hackathon Prototype — Demo Data
    </span>
  );
}
