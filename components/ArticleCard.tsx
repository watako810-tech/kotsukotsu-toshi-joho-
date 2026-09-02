import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { ArticleMeta } from "@/lib/types";
import { formatDateLabel } from "@/lib/format";
import { Badge } from "./Badge";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block h-full rounded-card border border-line bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        {article.category && <Badge tone="emerald">{article.category}</Badge>}
        <span className="flex items-center gap-1 text-xs text-muted">
          <Calendar size={12} />
          {formatDateLabel(article.date)}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-bold leading-snug text-navy group-hover:text-emerald-dark">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      )}
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-dark">
        続きを読む
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
