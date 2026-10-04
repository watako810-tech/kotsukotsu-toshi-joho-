import { ExternalLink, Info } from "lucide-react";
import { TradingViewWidget } from "./TradingViewWidget";

const US_STOCKS = [
  { symbol: "NASDAQ:AAPL", name: "Apple" },
  { symbol: "NASDAQ:MSFT", name: "Microsoft" },
  { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
  { symbol: "NYSE:JPM", name: "JPMorgan Chase" },
  { symbol: "NYSE:JNJ", name: "Johnson & Johnson" },
  { symbol: "NYSE:V", name: "Visa" },
];

const JP_STOCKS = [
  { code: "7203", name: "トヨタ自動車", sector: "自動車" },
  { code: "6758", name: "ソニーグループ", sector: "電機・エンタメ" },
  { code: "9984", name: "ソフトバンクグループ", sector: "情報・通信" },
  { code: "8306", name: "三菱UFJフィナンシャル・グループ", sector: "銀行" },
  { code: "9432", name: "NTT", sector: "情報・通信" },
  { code: "8035", name: "東京エレクトロン", sector: "半導体製造装置" },
];

/**
 * トップページの「日米の代表的な銘柄」。
 * 米国株はTradingViewのウィジェットで株価を表示する。
 * 日本株（東証）はTradingViewの無料ウィジェットでは表示できないため、
 * 銘柄の紹介とTradingViewの銘柄ページへのリンクにとどめる。
 */
export function StockWatchlist({ id }: { id?: string }) {
  return (
    <section id={id} aria-labelledby="watchlist-heading" className="scroll-mt-24">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <h2 id="watchlist-heading" className="text-xl font-bold text-navy sm:text-2xl">
          日米の代表的な銘柄
        </h2>
      </div>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">
        日本と米国を代表する企業の一覧です。値動きの確認や、企業を調べるきっかけにご活用ください
        （特定の銘柄の売買をおすすめするものではありません）。
      </p>

      <h3 className="mb-3 text-base font-bold text-navy">米国株</h3>
      <div className="mb-10 rounded-card border border-line bg-surface p-3 shadow-card">
        <TradingViewWidget
          widget="market-quotes"
          height={380}
          config={{
            width: "100%",
            height: 380,
            locale: "ja",
            colorTheme: "light",
            isTransparent: true,
            showSymbolLogo: true,
            symbolsGroups: [
              {
                name: "米国株",
                symbols: US_STOCKS.map((s) => ({ name: s.symbol, displayName: s.name })),
              },
            ],
          }}
        />
      </div>

      <h3 className="mb-3 text-base font-bold text-navy">日本株</h3>
      <p className="mb-4 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
        <Info size={14} className="mt-0.5 shrink-0" />
        日本株の株価は、データ提供元の都合でこのサイト上には表示できません。各銘柄のリンクから、TradingViewのページで確認できます。
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {JP_STOCKS.map((stock) => (
          <a
            key={stock.code}
            href={`https://jp.tradingview.com/symbols/TSE-${stock.code}/`}
            target="_blank"
            rel="noopener nofollow"
            className="group flex items-center justify-between gap-3 rounded-card border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{stock.name}</p>
              <p className="font-mono text-xs text-muted">
                {stock.code} ・ {stock.sector}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-dark group-hover:underline">
              株価を見る
              <ExternalLink size={13} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
