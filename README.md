# コツコツ投資情報部

堅実なデータ分析と日米優良株のコツコツ投資ガイド。Next.js（App Router）+ TypeScript + Tailwind CSSで構築した、
株式・投資解説メディアサイトです。

## 特徴

- **デザイン**: ディープネイビー（`#0F172A`）× エメラルドグリーン（`#10B981`）を基調にしたモダンなトーン
- **記事カード**: ホバー時に浮き上がるアニメーション（`hover:-translate-y-1` + シャドウ）
- **レスポンシブ**: モバイルファースト。ヘッダーはコンパクトなハンバーガーメニュー
- **記事コンテンツ**: `content/articles/*.md` をMarkdownで管理し、目次(TOC)を自動生成
- **市況データ**: `stock-platform/backend`（FastAPI + yfinance）を共有バックエンドとして利用。未接続時は `data/*-seed.json` のフォールバック値を表示
- **Google AdSense**: 広告タグ・`ads.txt`・所有権確認メタタグを実装済み。広告の配置はAdSenseの「自動広告」に任せる方針（手動の広告枠は置いていない）
- **固定ページ**: 運営者情報（`/about`）・プライバシーポリシー・免責事項（`/privacy`）・お問い合わせ（`/contact`、Googleフォームへのリンク）

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
  articles/[slug]/page.tsx 記事詳細ページ（TOC・免責事項を含む）
  about/ privacy/ contact/  運営者情報・プライバシーポリシー・お問い合わせ
  robots.ts, sitemap.ts   クローラー対応
  ads.txt/route.ts        AdSense用ads.txtを動的生成
components/              UIコンポーネント（Header, Hero, MarketSummary, ScreenerTable, ArticleCard 等）
content/articles/*.md    記事本文（Markdown + frontmatter）
data/*.json              市況・銘柄データのフォールバック（seed）
lib/                     Markdown変換、API取得、フォーマット関数、サイト共通情報（site.ts）
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

`NEXT_PUBLIC_ADSENSE_ID` にPublisher ID（`ca-pub-...`）を設定するだけで、広告タグ・`/ads.txt`・
サイト所有権確認メタタグがすべて自動的に有効化されます。

広告の表示位置は、AdSense管理画面の「広告」→「サイトごと」で**自動広告をオン**にして、Googleに任せます。
記事Markdown内に古い形式の広告枠（`<!-- AD_SLOT: ... -->` 〜 `<!-- /AD_SLOT -->`）が残っていても、
表示時に自動で取り除かれます。特定の位置に広告を固定したい場合は、AdSenseで広告ユニットを作成し、
発行された番号を `components/AdSlot.tsx` に渡して配置してください。

## お問い合わせフォームを設定する

1. Googleフォームで「お名前」「メールアドレス」「お問い合わせ内容」などの項目を持つフォームを作成する
2. 右上の「送信」→ リンクのアイコンからURL（`https://forms.gle/...`）をコピーする
3. Vercelの環境変数 `NEXT_PUBLIC_CONTACT_FORM_URL` にそのURLを設定して再デプロイする

未設定の間は、お問い合わせページに「準備中」と表示されます。

## 本番デプロイ

`next.config.mjs` で `output: "export"`（静的書き出し）を指定しているため、`npm run build` で
`out/` フォルダに静的なHTML一式が出力されます。広告を載せる本番サイトは、無料プランでも商用利用できる
Cloudflare Pagesで公開します（Vercelの無料プランは広告掲載が禁止）。手順は `DEPLOY_CLOUDFLARE.md` を参照してください。

ローカルで書き出し結果を確認したい場合は、`npm run build` のあと `npx serve out` で表示できます
（`npm run start` は静的書き出しでは使えません）。

## 今後の拡張ポイント

- noteマガジンの実際のリンク（`NoteBanner` の `href`）を設定する
- アクセス解析ツールを導入する場合は、`/privacy` の「アクセス解析ツールについて」を更新する
- （記事の日次自動追加は `AI投資情報/scripts/publish_daily_article.py` と `AUTOMATION.md` を参照）
