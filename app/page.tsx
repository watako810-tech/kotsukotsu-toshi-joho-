import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { MarketSummary } from "@/components/MarketSummary";
import { ScreenerTable } from "@/components/ScreenerTable";
import { ArticleCard } from "@/components/ArticleCard";
import { NoteBanner } from "@/components/NoteBanner";
import { getMarketSummary, getScreenerComparison } from "@/lib/api";
import { getAllArticleMeta } from "@/lib/articles";

// 静的書き出し（output: "export"）のため、市況データはビルド時点の値で表示される。
// 平日の自動投稿でpushされるたびに再ビルドされるので、少なくとも1日1回は更新される。

export default async function HomePage() {
  const [{ indices, isLive: marketLive, asOf }, { jp, us, isLive: screenerLive }] = await Promise.all([
    getMarketSummary(),
    getScreenerComparison(),
  ]);

  const articles = getAllArticleMeta().slice(0, 6);

  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14">
        <MarketSummary indices={indices} isLive={marketLive} asOf={asOf} />

        <ScreenerTable jp={jp} us={us} isLive={screenerLive} />

        <section aria-labelledby="latest-articles-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <h2 id="latest-articles-heading" className="text-xl font-bold text-navy sm:text-2xl">
              最新記事
            </h2>
            <Link
              href="/articles"
              className="flex items-center gap-1 text-sm font-semibold text-emerald-dark hover:underline"
            >
              記事一覧を見る
              <ArrowRight size={14} />
            </Link>
          </div>

          {articles.length === 0 ? (
            <p className="rounded-card border border-dashed border-line bg-slate-50 p-6 text-sm text-muted">
              まだ記事がありません。<code className="font-mono">content/articles/</code> にMarkdown記事を追加すると、ここに一覧表示されます。
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>

        <NoteBanner />
      </div>
    </div>
  );
}
