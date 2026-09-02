import { Lock, ArrowRight } from "lucide-react";
import { Badge } from "./Badge";

interface Props {
  href?: string;
}

export function NoteBanner({ href = "https://note.com/" }: Props) {
  return (
    <section id="note" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-card bg-navy px-6 py-10 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(420px circle at 90% 10%, rgba(16,185,129,0.25), transparent 60%)",
          }}
        />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <Badge tone="emerald" className="mb-3">
              <Lock size={11} />
              有料マガジン
            </Badge>
            <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl">
              もう一歩踏み込んだ銘柄分析は、noteの有料マガジンで
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              セクター別の詳細レポートや、注目銘柄の深掘り解説を配信中。
              無料記事だけでは物足りない方はぜひチェックしてみてください。
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5 hover:bg-emerald-dark hover:text-white"
          >
            noteマガジンを見る
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
