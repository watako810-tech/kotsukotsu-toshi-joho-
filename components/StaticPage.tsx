import type { ReactNode } from "react";

interface StaticPageProps {
  title: string;
  lead?: string;
  updatedAt?: string;
  /** 本文の前に、記事用タイポグラフィ（.article-prose）の影響を受けずに表示したい要素（ボタン等） */
  highlight?: ReactNode;
  children: ReactNode;
}

/**
 * プライバシーポリシー・運営者情報・お問い合わせなど、記事以外の固定ページ用の共通レイアウト。
 * 本文は記事ページと同じ .article-prose のタイポグラフィで表示する。
 */
export function StaticPage({ title, lead, updatedAt, highlight, children }: StaticPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="mb-8 border-b border-line pb-6">
        <h1 className="text-2xl font-black leading-tight text-navy sm:text-3xl">{title}</h1>
        {lead && <p className="mt-3 text-sm leading-relaxed text-muted">{lead}</p>}
        {updatedAt && <p className="mt-2 text-xs text-muted">最終更新日: {updatedAt}</p>}
      </header>
      {highlight && <div className="mb-10">{highlight}</div>}
      <div className="article-prose max-w-none">{children}</div>
    </div>
  );
}
