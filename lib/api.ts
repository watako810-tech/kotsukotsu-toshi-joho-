import type { IndexInfo, StockInfo } from "./types";
import marketSeed from "@/data/market-summary-seed.json";
import screenerSeed from "@/data/screener-seed.json";

// stock-platform/backend（FastAPI + yfinance）を共有バックエンドとして利用する。
// 未起動・未接続の場合は data/*-seed.json のフォールバック値を表示し、
// サイトが常に完成した見た目で動作するようにしている。
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function apiFetch<T>(path: string, revalidateSeconds = 300): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: revalidateSeconds },
    signal: AbortSignal.timeout(4000),
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }

  return res.json();
}

export interface MarketSummaryResult {
  indices: IndexInfo[];
  isLive: boolean;
  asOf?: string;
}

/** 本日の市況サマリー（日経平均・S&P500）。 */
export async function getMarketSummary(): Promise<MarketSummaryResult> {
  try {
    const indices = await apiFetch<IndexInfo[]>("/api/market/indices?range=1mo", 300);
    if (!indices || indices.length === 0) throw new Error("empty response");
    return { indices, isLive: true };
  } catch {
    return {
      indices: marketSeed.indices as unknown as IndexInfo[],
      isLive: false,
      asOf: marketSeed.asOf,
    };
  }
}

export interface ScreenerResult {
  jp: StockInfo[];
  us: StockInfo[];
  isLive: boolean;
}

const JP_SYMBOLS = screenerSeed.jp.map((s) => s.symbol);
const US_SYMBOLS = screenerSeed.us.map((s) => s.symbol);

/** 日米優良株のスクリーニング比較表。 */
export async function getScreenerComparison(): Promise<ScreenerResult> {
  try {
    const universe = [...JP_SYMBOLS, ...US_SYMBOLS].join(",");
    const results = await apiFetch<StockInfo[]>(
      `/api/stocks/screener?universe=${encodeURIComponent(universe)}`,
      300
    );
    if (!results || results.length === 0) throw new Error("empty response");

    const jp = results.filter((s) => s.symbol.endsWith(".T"));
    const us = results.filter((s) => !s.symbol.endsWith(".T"));
    return { jp, us, isLive: true };
  } catch {
    return {
      jp: screenerSeed.jp as unknown as StockInfo[],
      us: screenerSeed.us as unknown as StockInfo[],
      isLive: false,
    };
  }
}
