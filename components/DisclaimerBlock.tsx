import { ShieldAlert } from "lucide-react";

/**
 * 記事末尾に必ず表示する投資免責事項。個別記事のMarkdown本文とは独立した
 * 固定コンポーネントとして扱うことで、どの記事にも漏れなく表示されるようにしている。
 */
export function DisclaimerBlock() {
  return (
    <div className="mt-12 rounded-card border border-line bg-slate-50 p-5">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-navy">
        <ShieldAlert size={15} className="text-muted" />
        投資免責事項
      </p>
      <p className="text-xs leading-relaxed text-muted">
        本記事は、公開されている情報をもとに作成した情報提供を目的としたコンテンツであり、特定の銘柄・金融商品の
        売買を推奨または勧誘するものではありません。将来の運用成果や市場動向を保証するものでもありません。
        投資に関する最終的な判断は、必ずご自身の責任において、最新の一次情報をご確認のうえ行ってください。
        当サイトの情報を利用したことにより生じたいかなる損害についても、運営者は責任を負いかねます。
      </p>
    </div>
  );
}
