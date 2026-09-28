/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages（無料プラン）で配信するため、ビルド時にすべてのページを
  // 静的なHTMLファイルとして out/ フォルダに書き出す（Static Export）。
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
