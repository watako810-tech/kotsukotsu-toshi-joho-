import Link from "next/link";
import { TrendingUp } from "lucide-react";

const SITE_LINKS = [
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー・免責事項" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy">
      <div className="mx-auto max-w-6xl px-4 py-12 text-slate-300">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald text-navy">
                <TrendingUp size={16} strokeWidth={2.5} />
              </span>
              <span className="font-bold text-white">コツコツ投資情報部</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              堅実なデータ分析と日米優良株のコツコツ投資ガイド。
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">コンテンツ</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-slate-300 hover:text-emerald">
                  記事一覧
                </Link>
              </li>
              <li>
                <Link href="/#screener" className="text-slate-300 hover:text-emerald">
                  日米の代表的な銘柄
                </Link>
              </li>
              <li>
                <Link href="/#note" className="text-slate-300 hover:text-emerald">
                  有料マガジン（note）
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">サイトについて</p>
            <ul className="space-y-2 text-sm">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-emerald">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              当サイトの情報は投資勧誘を目的としたものではありません。
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} コツコツ投資情報部. 掲載情報は特定の金融商品の売買を推奨するものではありません。
        </p>
      </div>
    </footer>
  );
}
