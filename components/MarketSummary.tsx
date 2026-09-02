import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import type { IndexInfo } from "@/lib/types";
import { formatChange, formatNumber, formatPercent, changeColorClass } from "@/lib/format";

interface Props {
  indices: IndexInfo[];
  isLive: boolean;
  asOf?: string;
}

export function MarketSummary({ indices, isLive, asOf }: Props) {
  return (
    <section aria-labelledby="market-summary-heading">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <h2 id="market-summary-heading" className="text-xl font-bold text-navy sm:text-2xl">
          本日の市況サマリー
        </h2>
        {!isLive && (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-muted">
            <Info size={13} />
            参考値表示中{asOf ? `（${asOf}時点）` : ""}
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {indices.map((index) => {
          const isPositive = (index.change_percent ?? 0) >= 0;
          const Arrow = isPositive ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={index.key}
              className="rounded-card border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <p className="text-sm font-medium text-muted">{index.name}</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-navy sm:text-3xl">
                  {formatNumber(index.current, index.key === "sp500" ? 2 : 2)}
                </span>
                <span
                  className={`flex items-center gap-0.5 font-mono text-sm font-semibold ${changeColorClass(
                    index.change_percent
                  )}`}
                >
                  <Arrow size={15} />
                  {formatChange(index.change)} ({formatPercent(index.change_percent)})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
