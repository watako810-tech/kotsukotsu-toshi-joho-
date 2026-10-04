import { Info } from "lucide-react";
import { TradingViewWidget } from "./TradingViewWidget";

const MARKETS = [
  { symbol: "INDEX:NKY", label: "日経平均株価" },
  { symbol: "FOREXCOM:SPXUSD", label: "S&P500" },
  { symbol: "FX:USDJPY", label: "ドル円" },
];

/** トップページの「マーケット概況」。値動きはTradingViewのウィジェットで表示する。 */
export function MarketOverview() {
  return (
    <section aria-labelledby="market-overview-heading">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <h2 id="market-overview-heading" className="text-xl font-bold text-navy sm:text-2xl">
          マーケット概況
        </h2>
        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-muted">
          <Info size={13} />
          価格は遅れて表示される場合があります
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {MARKETS.map((market) => (
          <div
            key={market.symbol}
            className="rounded-card border border-line bg-surface p-3 shadow-card"
            aria-label={`${market.label}の値動き`}
          >
            <TradingViewWidget
              widget="mini-symbol-overview"
              height={190}
              config={{
                symbol: market.symbol,
                width: "100%",
                height: 190,
                locale: "ja",
                dateRange: "1M",
                colorTheme: "light",
                isTransparent: true,
                autosize: false,
                largeChartUrl: "",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
