import type { ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
  children: ReactNode;
  tone?: "emerald" | "navy" | "amber" | "muted";
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<Props["tone"]>, string> = {
  emerald: "bg-emerald-soft text-emerald-dark",
  navy: "bg-navy text-white",
  amber: "bg-amber-100 text-amber-800",
  muted: "bg-slate-100 text-muted",
};

export function Badge({ children, tone = "emerald", className }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
