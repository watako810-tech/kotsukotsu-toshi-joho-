import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticleMeta } from "@/lib/articles";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "コツコツ投資情報部が発信するマーケット解説記事の一覧です。",
};

export default function ArticlesPage() {
  const articles = getAllArticleMeta();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="mb-2 text-2xl font-bold text-navy sm:text-3xl">記事一覧</h1>
      <p className="mb-10 text-sm leading-relaxed text-muted">
        日々のマーケット動向を、初心者にもわかりやすく解説しています。
      </p>

      {articles.length === 0 ? (
        <p className="rounded-card border border-dashed border-line bg-slate-50 p-6 text-sm text-muted">
          まだ記事がありません。<code className="font-mono">content/articles/</code> にMarkdown記事を追加してください。
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
