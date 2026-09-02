import Link from "next/link";
import { Info } from "lucide-react";
import type { StockInfo } from "@/lib/types";
import { formatPrice, formatPercent, formatNumber, changeColorClass } from "@/lib/format";
import { Badge } from "./Badge";

interface Props {
  jp: StockInfo[];
  us: StockInfo[];
  isLive: boolean;
}

function StockTable({ stocks }: { stocks: StockInfo[] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-navy text-white">
            <th className="px-4 py-3 text-left font-semibold">銘柄</th>
            <th className="px-4 py-3 text-right font-semibold">株価</th>
            <th className="px-4 py-3 text-right font-semibold">前日比</th>
            <th className="px-4 py-3 text-right font-semibold">PER</th>
            <th className="px-4 py-3 text-right font-semibold">PBR</th>
            <th className="px-4 py-3 text-right font-semibold">配当利回り</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, i) => (
            <tr key={s.symbol} className={i % 2 === 1 ? "bg-slate-50" : undefined}>
              <td className="border-t border-line px-4 py-3">
                <p className="font-medium text-ink">{s.short_name ?? s.symbol}</p>
                <p className="font-mono text-xs text-muted">
                  {s.symbol}
                  {s.sector ? ` ・ ${s.sector}` : ""}
                </p>
              </td>
              <td className="border-t border-line px-4 py-3 text-right font-mono">
                {formatPrice(s.current_price, s.currency)}
              </td>
              <td className={`border-t border-line px-4 py-3 text-right font-mono font-medium ${changeColorClass(s.change_percent)}`}>
                {formatPercent(s.change_percent)}
              </td>
              <td className="border-t border-line px-4 py-3 text-right font-mono">
                {formatNumber(s.trailing_pe, 1)}
              </td>
              <td className="border-t border-line px-4 py-3 text-right font-mono">
                {formatNumber(s.price_to_book, 1)}
              </td>
              <td className="border-t border-line px-4 py-3 text-right font-mono">
                {s.dividend_yield != null ? `${s.dividend_yield.toFixed(2)}%` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScreenerTable({ jp, us, isLive }: Props) {
  return (
    <section id="screener" aria-labelledby="screener-heading" className="scroll-mt-24">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 id="screener-heading" className="text-xl font-bold text-navy sm:text-2xl">
          日米優良株スクリーニング比較
        </h2>
        <Badge tone="emerald">厳選ユニバース</Badge>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-muted">
        PER・PBR・配当利回りなどの主要指標で、日本株・米国株の代表的な優良銘柄をまとめて比較できます。
        より詳しい条件でのスクリーニングは
        <Link href="/#note" className="font-medium text-emerald-dark underline underline-offset-2">
          姉妹サイトのスクリーニングツール
        </Link>
        もあわせてご活用ください。
      </p>

      {!isLive && (
        <div className="mb-4 flex items-start gap-2 rounded-card border border-dashed border-line bg-slate-50 px-4 py-3 text-xs leading-relaxed text-muted">
          <Info size={14} className="mt-0.5 shrink-0" />
          現在バックエンドAPIに接続できないため、銘柄名のみの参考表示です。API接続後は株価・PER・PBR等がリアルタイム表示に切り替わります。
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">日本株</h3>
          <StockTable stocks={jp} />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">米国株</h3>
          <StockTable stocks={us} />
        </div>
      </div>
    </section>
  );
}
