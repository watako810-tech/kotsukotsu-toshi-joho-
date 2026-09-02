import { List } from "lucide-react";
import type { TocItem } from "@/lib/types";

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-card border border-line bg-surface p-5 shadow-card lg:sticky lg:top-24"
    >
      <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-navy">
        <List size={15} className="text-emerald-dark" />
        目次
      </p>
      <ol className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : undefined}>
            <a
              href={`#${item.id}`}
              className="block leading-snug text-muted transition-colors hover:text-emerald-dark"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
