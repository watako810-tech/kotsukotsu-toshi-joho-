# Cloudflare Pagesへの引っ越し手順

Vercelの無料プラン（Hobby）は非商用利用に限られ、Google AdSenseなどの広告を載せることは
商用利用として禁止されています。そのため、広告を載せる本番サイトは、無料プランでも
商用利用できる **Cloudflare Pages** で公開します。

このサイトは `next.config.mjs` の `output: "export"` により、ビルドすると `out/` フォルダに
静的なHTMLファイル一式が書き出されます。Cloudflare Pagesはそれをそのまま配信します。
平日12時の自動投稿は今までどおりGitHubにpushするだけで、Cloudflareが自動で再ビルド・公開します。

## 1. Cloudflare Pagesのプロジェクトを作る

1. https://dash.cloudflare.com/sign-up でアカウントを作る（無料）
2. ダッシュボードの左メニュー「Workers & Pages」→「作成（Create）」を開き、**Pages** のタブで
   「Gitに接続（Connect to Git / Import an existing Git repository）」を選ぶ
3. GitHubと連携し、リポジトリ `watako810-tech/kotsukotsu-toshi-joho-` を選ぶ
4. ビルドの設定を次のようにする

   | 項目 | 設定値 |
   | --- | --- |
   | プロジェクト名 | `kotsukotsu-toshi-joho`（`https://kotsukotsu-toshi-joho.pages.dev` になる） |
   | 本番ブランチ | `main` |
   | フレームワーク プリセット | `Next.js (Static HTML Export)` |
   | ビルドコマンド | `npm run build` |
   | ビルド出力ディレクトリ | `out` |

5. 「環境変数（Environment variables）」に次の3つを追加する（すべて通常の変数でOK。暗号化は不要）

   | 変数名 | 値 |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | 最初は `https://kotsukotsu-toshi-joho.pages.dev`（独自ドメイン取得後に変更） |
   | `NEXT_PUBLIC_ADSENSE_ID` | `ca-pub-2074473180822833` |
   | `NEXT_PUBLIC_CONTACT_FORM_URL` | お問い合わせ用Googleフォームの回答用URL（`.../viewform`） |

6. 「保存してデプロイ」を押す。Node.jsのバージョンはリポジトリの `.node-version`（20）が使われる

## 2. 独自ドメインを取得してつなぐ

1. ダッシュボードの「ドメインの登録（Domain Registration）」→「ドメインを登録」で、
   `kotsukotsu-toshi.com` などを検索して購入する（クレジットカードが必要）
2. Pagesのプロジェクト →「カスタムドメイン（Custom domains）」→「カスタムドメインを設定」で、
   購入したドメインを追加する（Cloudflareで買ったドメインなら、DNSの設定は自動）
3. 環境変数 `NEXT_PUBLIC_SITE_URL` を `https://（取得したドメイン）` に変更し、
   「デプロイ」タブから最新のデプロイを再実行（Retry deployment）する

## 3. Vercel側を止める

Cloudflareで独自ドメインの表示が確認できたら、Vercelのプロジェクトを削除する
（Settings → 一番下の「Delete Project」）。

- 同じ内容のサイトが2か所にあると、検索エンジンで評価が分散してしまうため
- Vercelの無料プランの規約（広告の掲載は商用利用）に触れないようにするため

## 4. AdSenseに登録する

AdSense管理画面の「サイト」→「新しいサイトを追加」で取得したドメインを登録し、
所有権の確認方法で「メタタグ」を選んで「確認」→「審査をリクエスト」する。
確認用のメタタグ・広告タグ・`/ads.txt` はビルド時に自動で埋め込まれる。

## 補足: 静的書き出しにしたことによる違い

- トップページの市況サマリー・銘柄比較表は、**ビルドした時点のデータ**で表示される
  （平日12時の自動投稿のたびに再ビルドされるので、1日1回は更新される）
- 将来「ページを開くたびに最新の株価を表示する」機能を足す場合は、ブラウザ側で
  データを取得する作りに変える必要がある
