import { ExternalLink, Info } from "lucide-react";
import { TradingViewWidget } from "./TradingViewWidget";

interface UsStock {
  /** TradingViewでの銘柄の指定（取引所:ティッカー） */
  symbol: string;
  name: string;
}

interface JpStock {
  /** 証券コード */
  code: string;
  name: string;
  sector: string;
}

// 銘柄を足すときは、この一覧に1行追加するだけでよい。
const US_MAJOR: UsStock[] = [
  { symbol: "NASDAQ:AAPL", name: "Apple" },
  { symbol: "NASDAQ:MSFT", name: "Microsoft" },
  { symbol: "NASDAQ:GOOGL", name: "Alphabet（Google）" },
  { symbol: "NASDAQ:AMZN", name: "Amazon" },
  { symbol: "NASDAQ:META", name: "Meta" },
  { symbol: "NASDAQ:TSLA", name: "Tesla" },
  { symbol: "NYSE:JPM", name: "JPMorgan Chase" },
  { symbol: "NYSE:V", name: "Visa" },
  { symbol: "NYSE:JNJ", name: "Johnson & Johnson" },
];

const US_SEMICONDUCTOR: UsStock[] = [
  { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
  { symbol: "NASDAQ:MU", name: "Micron Technology" },
  { symbol: "NASDAQ:MRVL", name: "Marvell Technology" },
  { symbol: "NASDAQ:AVGO", name: "Broadcom" },
  { symbol: "NASDAQ:AMD", name: "AMD" },
  { symbol: "NYSE:TSM", name: "TSMC" },
  { symbol: "NASDAQ:ASML", name: "ASML" },
  { symbol: "NASDAQ:INTC", name: "Intel" },
  { symbol: "NASDAQ:QCOM", name: "Qualcomm" },
];

const JP_MAJOR: JpStock[] = [
  { code: "7203", name: "トヨタ自動車", sector: "自動車" },
  { code: "6758", name: "ソニーグループ", sector: "電機・エンタメ" },
  { code: "6501", name: "日立製作所", sector: "電機・ITサービス" },
  { code: "9984", name: "ソフトバンクグループ", sector: "情報・通信" },
  { code: "9432", name: "NTT", sector: "情報・通信" },
  { code: "8306", name: "三菱UFJフィナンシャル・グループ", sector: "銀行" },
  { code: "7974", name: "任天堂", sector: "ゲーム" },
  { code: "6861", name: "キーエンス", sector: "電子部品・センサー" },
];

const JP_SEMICONDUCTOR: JpStock[] = [
  { code: "285A", name: "キオクシアホールディングス", sector: "半導体メモリ" },
  { code: "8035", name: "東京エレクトロン", sector: "半導体製造装置" },
  { code: "6857", name: "アドバンテスト", sector: "半導体検査装置" },
  { code: "6146", name: "ディスコ", sector: "半導体製造装置" },
  { code: "6920", name: "レーザーテック", sector: "半導体検査装置" },
  { code: "7735", name: "SCREENホールディングス", sector: "半導体製造装置" },
  { code: "6723", name: "ルネサスエレクトロニクス", sector: "半導体（車載向けなど）" },
  { code: "4063", name: "信越化学工業", sector: "半導体材料" },
];

/** 一覧の行数に合わせた表示エリアの高さ（見出し行 + 1銘柄あたり約45px）。 */
function quotesHeight(rows: number): number {
  return 90 + rows * 45;
}

/** 米国株の一覧。株価はTradingViewのウィジェットが表示する。 */
function UsQuotes({ title, stocks }: { title: string; stocks: UsStock[] }) {
  const height = quotesHeight(stocks.length);
  return (
    <>
      <h3 className="mb-3 text-base font-bold text-navy">{title}</h3>
      <div className="mb-10 rounded-card border border-line bg-surface p-3 shadow-card">
        <TradingViewWidget
          widget="market-quotes"
          height={height}
          config={{
            width: "100%",
            height,
            locale: "ja",
            colorTheme: "light",
            isTransparent: true,
            showSymbolLogo: true,
            symbolsGroups: [
              {
                name: title,
                symbols: stocks.map((s) => ({ name: s.symbol, displayName: s.name })),
              },
            ],
          }}
        />
      </div>
    </>
  );
}

/** 日本株の一覧。TradingViewの銘柄ページへのリンクを並べる。 */
function JpLinks({ title, stocks }: { title: string; stocks: JpStock[] }) {
  return (
    <>
      <h3 className="mb-3 text-base font-bold text-navy">{title}</h3>
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => (
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
    </>
  );
}

/**
 * トップページの「日米の代表的な銘柄」。主要株と半導体関連に分けて並べる。
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
        日本と米国を代表する企業と、注目を集める半導体関連の企業の一覧です。値動きの確認や、企業を調べるきっかけにご活用ください
        （特定の銘柄の売買をおすすめするものではありません）。
      </p>

      <UsQuotes title="米国株：主要銘柄" stocks={US_MAJOR} />
      <UsQuotes title="米国株：半導体関連" stocks={US_SEMICONDUCTOR} />

      <p className="mb-4 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
        <Info size={14} className="mt-0.5 shrink-0" />
        日本株の株価は、データ提供元の都合でこのサイト上には表示できません。各銘柄のリンクから、TradingViewのページで確認できます。
      </p>
      <JpLinks title="日本株：主要銘柄" stocks={JP_MAJOR} />
      <div className="-mb-10">
        <JpLinks title="日本株：半導体関連" stocks={JP_SEMICONDUCTOR} />
      </div>
    </section>
  );
}
