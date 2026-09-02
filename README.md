# コツコツ投資情報部

堅実なデータ分析と日米優良株のコツコツ投資ガイド。Next.js（App Router）+ TypeScript + Tailwind CSSで構築した、
株式・投資解説メディアサイトです。

## 特徴

- **デザイン**: ディープネイビー（`#0F172A`）× エメラルドグリーン（`#10B981`）を基調にしたモダンなトーン
- **記事カード**: ホバー時に浮き上がるアニメーション（`hover:-translate-y-1` + シャドウ）
- **レスポンシブ**: モバイルファースト。ヘッダーはコンパクトなハンバーガーメニュー
- **記事コンテンツ**: `content/articles/*.md` をMarkdownで管理し、目次(TOC)を自動生成
- **市況データ**: `stock-platform/backend`（FastAPI + yfinance）を共有バックエンドとして利用。未接続時は `data/*-seed.json` のフォールバック値を表示
- **Google AdSense**: 広告表示用コンポーネント（`AdSlot`）を実装済み。`stock-platform/frontend` と同じ仕組みで、Publisher ID未設定時はプレースホルダー表示

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000` で表示されます。

市況サマリー・スクリーニング比較表を実データで表示したい場合は、`stock-platform/backend` を
別ターミナルで起動してください（`http://localhost:8000`）。起動していない場合も、
`data/market-summary-seed.json` / `data/screener-seed.json` の参考値で正常に表示されます。

```bash
# 別ターミナルで（stock-platformフォルダ内）
cd ../stock-platform/backend
uvicorn main:app --reload --port 8000
```

## ディレクトリ構成

```
app/                     ページ（App Router）
  page.tsx                トップページ（ヒーロー・市況サマリー・比較表・記事一覧・noteバナー）
  articles/page.tsx       記事一覧ページ
  articles/[slug]/page.tsx 記事詳細ページ（TOC・広告枠・免責事項を含む）
  robots.ts, sitemap.ts   クローラー対応
  ads.txt/route.ts        AdSense用ads.txtを動的生成
components/              UIコンポーネント（Header, Hero, MarketSummary, ScreenerTable, ArticleCard 等）
content/articles/*.md    記事本文（Markdown + frontmatter）
data/*.json              市況・銘柄データのフォールバック（seed）
lib/                     Markdown変換、API取得、フォーマット関数
```

## 新しい記事を追加する

`content/articles/` に `YYYY-MM-DD-スラッグ.md` という名前でMarkdownファイルを追加してください。
frontmatterの形式は以下の通りです（`scripts/generate_daily_content.py` の出力する
`output/site_article.md` をベースに、先頭のH1見出しを除いてそのまま貼り付けられる形式です）。

```md
---
title: "記事タイトル"
date: 2026-09-02
category: マーケット概況
tags: [タグ1, タグ2]
excerpt: "記事一覧カードに表示される1〜2文の要約"
---

本文（Markdown）...
```

- `##` 見出しが自動的に目次(TOC)に反映されます
- 引用ブロック（`>`）はアナウンス風の装飾ボックスとして表示されます
- 記事末尾には `DisclaimerBlock` コンポーネントによる投資免責事項が自動で付与されます（本文側に重複して書く必要はありません）

## Google AdSenseを有効にする

`stock-platform/frontend` と同じ仕組みです。`.env.local` の `NEXT_PUBLIC_ADSENSE_ID` に
審査承認後のPublisher ID（`ca-pub-...`）を設定するだけで、広告タグ・`/ads.txt`・
サイト所有権確認メタタグがすべて自動的に有効化されます。詳細は
`stock-platform/README.md` の「Google AdSenseを有効にする手順」を参照してください。

## 本番デプロイの目安

- Vercel（`NEXT_PUBLIC_API_BASE_URL` に `stock-platform/backend` の本番URLを、`NEXT_PUBLIC_SITE_URL` に
  このサイトの独自ドメインを設定）

## 今後の拡張ポイント

- `content/articles/` への日次追加を `scripts/generate_daily_content.py`（stock-platformプロジェクト側）と連携し、自動化する
- noteマガジンの実際のリンク（`NoteBanner` の `href`）を設定する
- プライバシーポリシー・免責事項の独立ページ（`stock-platform/frontend/app/privacy` 等）を移植する
