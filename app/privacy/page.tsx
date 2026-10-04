import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { POLICY_ESTABLISHED_AT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項",
  description: `${SITE_NAME}における個人情報の取り扱い、Cookieと広告配信、免責事項について。`,
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <StaticPage
      title="プライバシーポリシー・免責事項"
      lead={`${SITE_NAME}（以下「当サイト」）における個人情報の取り扱いと、掲載情報に関する免責事項を定めます。`}
      updatedAt={POLICY_ESTABLISHED_AT}
    >
      <h2>個人情報の取り扱いについて</h2>
      <p>
        当サイトでは、<Link href="/contact">お問い合わせ</Link>
        の際に、お名前（ニックネーム可）・メールアドレス等の情報をご入力いただく場合があります。
        これらの情報は、お問い合わせへの回答や必要なご連絡のためにのみ利用し、法令に基づく場合を除き、
        ご本人の同意なく第三者に提供することはありません。
      </p>
      <p>
        お問い合わせはGoogleが提供するGoogleフォームを利用して受け付けており、入力された情報はGoogleのサーバーに保存されます。
        Googleにおける情報の取り扱いについては、
        <ExternalLink href="https://policies.google.com/privacy?hl=ja">Googleのプライバシーポリシー</ExternalLink>
        をご確認ください。
      </p>

      <h2>広告の配信について</h2>
      <p>
        当サイトは、第三者配信の広告サービス「Google AdSense（グーグルアドセンス）」を利用しています。
        Googleなどの第三者配信事業者は、Cookie（クッキー）を使用して、利用者が当サイトや他のサイトに過去にアクセスした際の情報に基づき、
        利用者の興味に応じた広告を表示することがあります。Cookieによって、お名前・住所・メールアドレス・電話番号など、
        個人を特定できる情報が収集されることはありません。
      </p>
      <p>
        Googleによる広告でのCookieの使用については、
        <ExternalLink href="https://policies.google.com/technologies/ads?hl=ja">広告 – ポリシーと規約 – Google</ExternalLink>
        、および
        <ExternalLink href="https://policies.google.com/technologies/partner-sites?hl=ja">
          Googleのサービスを使用するサイトやアプリから収集した情報のGoogleによる使用
        </ExternalLink>
        をご確認ください。
      </p>
      <p>
        パーソナライズ広告は、
        <ExternalLink href="https://adssettings.google.com/">Googleの広告設定</ExternalLink>
        で無効にできます。また、
        <ExternalLink href="https://www.aboutads.info/choices/">www.aboutads.info</ExternalLink>
        にアクセスすると、Google以外の第三者配信事業者のCookieも無効にできます。
      </p>

      <h2>外部サービスの埋め込みについて</h2>
      <p>
        当サイトでは、株価や指数の値動きを表示するために、TradingView社が提供するウィジェット（埋め込み型の表示部品）を
        利用しています。ウィジェットの表示にあたり、TradingView社がCookieなどを使用する場合があります。
        同社における情報の取り扱いについては、
        <ExternalLink href="https://jp.tradingview.com/privacy-policy/">TradingViewのプライバシーポリシー</ExternalLink>
        をご確認ください。ウィジェットに表示される価格は、遅れて表示される場合があります。
      </p>

      <h2>アクセス解析ツールについて</h2>
      <p>
        当サイトでは現在、アクセス解析ツールは使用していません。今後導入する場合は、使用するツールとデータの取り扱いを
        本ポリシーに追記してお知らせします。
      </p>

      <h2>免責事項</h2>
      <p>
        当サイトは、株式市場や個別銘柄に関する情報を、初心者の方にもわかりやすくお伝えすることを目的とした情報提供サイトです。
        掲載している情報は、特定の銘柄・金融商品の売買を推奨または勧誘するものではありません。
        投資に関する最終的な判断は、必ずご自身の責任において行ってください。
      </p>
      <p>
        掲載している株価・指数・為替などのデータは、外部のデータソースや公開情報をもとに取得・作成しています。
        情報の正確性・完全性・最新性には努めていますが、その内容を保証するものではありません。
        データの誤りや遅延、システム障害などを含め、当サイトの情報を利用したことにより生じたいかなる損害についても、
        当サイトは責任を負いかねます。
      </p>
      <p>
        当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報・サービスについて、
        当サイトは一切の責任を負いません。
      </p>

      <h2>著作権について</h2>
      <p>
        当サイトに掲載している文章・画像などの著作物の無断転載は禁止しています。引用される場合は、引用元として
        当サイト名と該当ページへのリンクを明記してください。記事中で紹介しているニュース等の著作権は、各配信元に帰属します。
      </p>

      <h2>本ポリシーの変更について</h2>
      <p>
        当サイトは、法令の変更や運営方針の見直しに応じて、本ポリシーの内容を予告なく変更することがあります。
        変更後の内容は、本ページに掲載した時点から効力を生じるものとします。
      </p>

      <p className="text-xs text-muted">
        制定日: {POLICY_ESTABLISHED_AT}
        <br />
        運営: <Link href="/about">運営者情報</Link>
      </p>
    </StaticPage>
  );
}
