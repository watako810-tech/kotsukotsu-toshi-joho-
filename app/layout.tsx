import type { Metadata } from "next";
import { Noto_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAdsenseId } from "@/lib/adsense";

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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
      </body>
      {adsenseId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      )}
    </html>
  );
}
