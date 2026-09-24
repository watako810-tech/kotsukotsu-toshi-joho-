import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Clock } from "lucide-react";
import { StaticPage } from "@/components/StaticPage";
import { SITE_NAME, getContactFormUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${SITE_NAME}へのご質問・記事内容へのご指摘などはこちらからお送りください。`,
};

export default function ContactPage() {
  const formUrl = getContactFormUrl();

  const highlight = formUrl ? (
    <div className="rounded-card border border-line bg-white p-6 text-center shadow-card">
      <p className="mb-4 text-sm text-muted">Googleフォームが別のタブで開きます。</p>
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-bold text-navy transition hover:bg-emerald-dark hover:text-white"
      >
        お問い合わせフォームを開く
        <ExternalLink size={16} />
      </a>
    </div>
  ) : (
    <div className="flex items-start gap-3 rounded-card border border-line bg-slate-50 p-5 text-sm text-muted">
      <Clock size={18} className="mt-0.5 shrink-0" />
      <p>お問い合わせフォームは現在準備中です。公開までしばらくお待ちください。</p>
    </div>
  );

  return (
    <StaticPage
      title="お問い合わせ"
      lead="当サイトへのご質問、記事内容の誤りのご指摘、その他のご連絡は、以下のお問い合わせフォームからお送りください。"
      highlight={highlight}
    >
      <h2>お問い合わせにあたって</h2>
      <ul>
        <li>内容を確認のうえ、必要に応じてご入力いただいたメールアドレス宛てにご返信します。</li>
        <li>返信までにお時間をいただく場合や、内容によってはお返事を差し上げられない場合があります。</li>
        <li>個別の銘柄の売買判断や、投資に関する個別のご相談にはお答えできません。</li>
      </ul>
      <p>
        いただいた個人情報の取り扱いについては、<Link href="/privacy">プライバシーポリシー</Link>をご確認ください。
      </p>
    </StaticPage>
  );
}
