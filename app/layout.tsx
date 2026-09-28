import type { Metadata } from "next";
import { Noto_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAdsenseId } from "@/lib/adsense";
import { getSiteUrl } from "@/lib/site";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const adsenseId = getAdsenseId();
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "コツコツ投資情報部｜堅実なデータ分析と日米優良株のコツコツ投資ガイド",
    template: "%s｜コツコツ投資情報部",
  },
  description:
    "堅実なデータ分析と日米優良株のコツコツ投資ガイド。日経平均・S&P500など毎日のマーケット情報を初心者にもわかりやすく発信します。",
  ...(adsenseId ? { other: { "google-adsense-account": adsenseId } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        {/*
          AdSenseの読み込みタグ。<body>の外（<html>の直下）に置くと、ブラウザが自動で
          <body>内へ移動させてしまい、Reactの表示の照合（ハイドレーション）でエラーになるため、
          <body>の中に置く。beforeInteractive を指定しているので、実際の読み込みは他の処理より先に行われる。
        */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </body>
    </html>
  );
}
