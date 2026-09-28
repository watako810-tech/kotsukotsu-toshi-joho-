import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { OPERATOR_NAME, SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description: `${SITE_NAME}の運営者情報とサイトの運営方針について。`,
};

const siteUrl = getSiteUrl();

export default function AboutPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "サイト名", value: SITE_NAME },
    { label: "運営者", value: OPERATOR_NAME },
    { label: "URL", value: siteUrl },
    {
      label: "サイトの内容",
      value: "日経平均・S&P500などのマーケット概況、日米の代表的な銘柄の比較、投資初心者向けの解説",
    },
    { label: "お問い合わせ", value: <Link href="/contact">お問い合わせページ</Link> },
  ];

  return (
    <StaticPage
      title="運営者情報"
      lead="当サイトの運営者と、情報発信にあたっての方針をご紹介します。"
    >
      <table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="w-32 whitespace-nowrap bg-slate-50 text-navy">
                {row.label}
              </th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>サイトについて</h2>
      <p>
        {SITE_NAME}は、「堅実なデータ分析と日米優良株のコツコツ投資ガイド」をコンセプトに、
        毎日のマーケットの動きを、投資を始めたばかりの方にもわかりやすくお伝えする情報サイトです。
        短期的な値動きに振り回されず、数字の意味を理解しながら長くコツコツと投資を続けるための材料をお届けすることを目指しています。
      </p>

      <h2>情報発信の方針</h2>
      <ul>
        <li>株価・指数・為替などの数値は、外部のデータソースから取得したデータをもとに掲載しています。</li>
        <li>ニュースや市況の解説では、参照した情報源を記事内に明記するよう努めています。</li>
        <li>
          特定の銘柄・金融商品の売買を推奨する表現は用いず、判断材料となる事実と考え方の整理に徹します。
        </li>
        <li>内容に誤りを見つけた場合は、確認のうえ速やかに訂正します。</li>
      </ul>

      <h2>広告の掲載について</h2>
      <p>
        当サイトは、運営費用をまかなうためにGoogle AdSenseによる広告を掲載しています。
        広告配信とCookieの取り扱いについては、<Link href="/privacy">プライバシーポリシー・免責事項</Link>
        をご確認ください。
      </p>
    </StaticPage>
  );
}
