/** サイト全体で共通して使う基本情報 */
export const SITE_NAME = "コツコツ投資情報部";
export const OPERATOR_NAME = "コツコツ投資情報部 運営事務局";
export const POLICY_ESTABLISHED_AT = "2026年9月23日";

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
