/** サイト全体で共通して使う基本情報 */
export const SITE_NAME = "コツコツ投資情報部";
export const OPERATOR_NAME = "コツコツ投資情報部 運営事務局";
export const POLICY_ESTABLISHED_AT = "2026年9月23日";

const DEFAULT_SITE_URL = "http://localhost:3000";

/**
 * サイトの本番URL（例: https://kotsukotsu-toshi.com）。
 * 環境変数 NEXT_PUBLIC_SITE_URL の入力ミスでビルドが止まらないよう、
 * 前後の空白・末尾のスラッシュを取り除き、https:// が無ければ補う。
 * それでもURLとして読めない値の場合は、ローカル用の既定値を使う。
 */
export function getSiteUrl(): string {
  let raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/^[`'"「]+|[`'"」]+$/g, "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  raw = raw.replace(/\/+$/, "");
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const CONTACT_FORM_URL_PATTERN = /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/;

/**
 * お問い合わせ用GoogleフォームのURL。
 * NEXT_PUBLIC_CONTACT_FORM_URL が未設定、またはGoogleフォーム以外のURLの場合は undefined を返す
 * （その場合、お問い合わせページには「準備中」の案内が表示される）。
 */
export function getContactFormUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
  return raw && CONTACT_FORM_URL_PATTERN.test(raw) ? raw : undefined;
}
