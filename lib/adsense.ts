const ADSENSE_ID_PATTERN = /^ca-pub-\d{10,}$/;

/**
 * 有効なGoogle AdSense Publisher ID（例: ca-pub-1234567890123456）が
 * 設定されている場合のみ返す。未設定、またはプレースホルダー値の場合は
 * undefined を返し、広告タグ・ads.txt・サイト所有権確認メタタグを
 * 無効化する（stock-platform/frontend/lib/adsense.ts と同じ方針）。
 */
export function getAdsenseId(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_ID;
  return raw && ADSENSE_ID_PATTERN.test(raw) ? raw : undefined;
}
