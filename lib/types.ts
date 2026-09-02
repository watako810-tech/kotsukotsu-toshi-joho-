// stock-platform/backend が提供するAPIレスポンスと同じ形。
// 同じバックエンド（FastAPI + yfinance）を複数サイトから共有利用する想定。

export interface StockInfo {
  symbol: string;
  short_name?: string | null;
  currency?: string | null;
  current_price?: number | null;
  previous_close?: number | null;
  change?: number | null;
  change_percent?: number | null;
  market_cap?: number | null;
  trailing_pe?: number | null;
  forward_pe?: number | null;
  price_to_book?: number | null;
  return_on_equity?: number | null;
  revenue_growth?: number | null;
  dividend_yield?: number | null;
  sector?: string | null;
  industry?: string | null;
}

export interface HistoryPoint {
  date: string;
  close: number;
}

export interface IndexInfo {
  key: string;
  symbol: string;
  name: string;
  current?: number | null;
  change?: number | null;
  change_percent?: number | null;
  history: HistoryPoint[];
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleMeta {
  html: string;
  toc: TocItem[];
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}
