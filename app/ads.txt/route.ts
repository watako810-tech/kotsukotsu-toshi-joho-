import { NextResponse } from "next/server";
import { getAdsenseId } from "@/lib/adsense";

export const revalidate = 3600;

export function GET() {
  const adsenseId = getAdsenseId();
  const pubId = adsenseId?.replace(/^ca-/, "");

  const lines = pubId
    ? [`google.com, ${pubId}, DIRECT, f08c47fec0942fa0`]
    : [
        "# NEXT_PUBLIC_ADSENSE_ID が未設定のため、広告配信事業者は登録されていません。",
        "# .env.local に実際のPublisher ID (ca-pub-...) を設定すると自動的に更新されます。",
      ];

  return new NextResponse(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
