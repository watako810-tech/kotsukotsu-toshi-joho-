import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import { formatDateLabel } from "@/lib/format";
import { TableOfContents } from "@/components/TableOfContents";
import { DisclaimerBlock } from "@/components/DisclaimerBlock";
import { Badge } from "@/components/Badge";
import { MarketOverview } from "@/components/MarketOverview";

// 相場を扱う記事では、本文の下にTradingViewの値動きを表示する。
// 記事本文には細かい数値を書かず、正確な数値はこの表示で確認してもらう。
const MARKET_CATEGORIES = ["マーケット解説", "マーケット概況"];

interface Props {
  params: { slug: string };
}

// 静的書き出しのため、ビルド時に存在する記事のページだけを生成する
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "記事が見つかりません" };
  return {
    title: article.title,
    description: article.excerpt ?? article.title,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const showMarket = !!article.category && MARKET_CATEGORIES.includes(article.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Link
        href="/articles"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-emerald-dark"
      >
        <ArrowLeft size={14} />
        記事一覧に戻る
      </Link>

      <header className="mb-8 max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {article.category && <Badge tone="emerald">{article.category}</Badge>}
          {article.tags?.map((tag) => (
            <Badge key={tag} tone="muted">
              #{tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-black leading-tight text-navy sm:text-4xl">{article.title}</h1>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <Calendar size={14} />
          {formatDateLabel(article.date)}
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-10">
        <article
          className="article-prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        <aside className="mt-10 lg:mt-0">
          <TableOfContents toc={article.toc} />
        </aside>
      </div>

      {showMarket && (
        <div className="mt-12">
          <MarketOverview
            heading="いまの値動きをチェック"
            note="記事を書いた時点ではなく、現在の値動きです"
          />
        </div>
      )}

      <DisclaimerBlock />
    </div>
  );
}
