# Vercelへのデプロイ手順（GitHub経由）

このセッションはお使いのパソコンで直接コマンドを実行できないため、以下の手順はご自身で
実行していただく必要があります。GUI（GitHub Desktop）を使う方法と、コマンドラインを使う方法の
どちらかを選んでください。

## 手順の全体像

1. GitHubに空のリポジトリを作成する
2. `kotsukotsu-toshi-joho` フォルダの中身をそのリポジトリにpushする
3. Vercelでそのリポジトリを「Import」してデプロイする
4. Vercelの環境変数を設定する

---

## ステップ1: GitHubに空のリポジトリを作成する

1. https://github.com/new にアクセス（GitHubアカウントでログイン）
2. Repository name に `kotsukotsu-toshi-joho` と入力
3. Public / Private はお好みで（個人利用ならPrivateで問題ありません）
4. **「Add a README file」等のチェックは全て外したまま**「Create repository」をクリック
   （すでにローカルにファイル一式があるため、空のリポジトリを作る必要があります）
5. 作成後に表示されるリポジトリURL（例: `https://github.com/あなたのユーザー名/kotsukotsu-toshi-joho.git`）を控えておく

## ステップ2: ローカルのフォルダをGitHubにpushする

### 方法A: GitHub Desktop を使う（コマンド操作が苦手な場合はこちら）

1. https://desktop.github.com/ からGitHub Desktopをインストールし、GitHubアカウントでログイン
2. 「File」→「Add Local Repository」で `kotsukotsu-toshi-joho` フォルダを選択
   （まだGitリポジトリではないので「create a repository」を促されたらそのまま作成）
3. 左下のコミットメッセージ欄に適当な文言（例: `Initial commit`）を入力して「Commit to main」
4. 「Publish repository」をクリックし、ステップ1で作成したリポジトリ名を指定して公開
   （すでにGitHub側にリポジトリを作った場合は、先に「Repository」→「Repository Settings」で
   remoteをそのリポジトリに向けてから「Push origin」でも構いません）

### 方法B: コマンドライン（PowerShell / Git Bash）を使う

Gitがインストールされていない場合は https://git-scm.com/download/win から先にインストールしてください。

`kotsukotsu-toshi-joho` フォルダに移動して、以下を順番に実行します
（`あなたのユーザー名` の部分はステップ1で控えたURLに置き換えてください）。

```powershell
cd "C:\Users\PC_User\Desktop\AI投資情報\kotsukotsu-toshi-joho"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/kotsukotsu-toshi-joho.git
git push -u origin main
```

`.gitignore` で `node_modules/` `.next/` `.env.local` は除外済みなので、そのままpushして問題ありません。

## ステップ3: Vercelでインポートする

1. https://vercel.com/new にアクセス
2. GitHubアカウントを連携していない場合は連携し、先ほどのリポジトリ `kotsukotsu-toshi-joho` を選択して「Import」
3. Framework Preset は自動的に「Next.js」と検出されます（変更不要）
4. Root Directory はリポジトリ直下のままでOK（`kotsukotsu-toshi-joho` フォルダそのものをリポジトリにしているため）
5. 「Environment Variables」を以下のように設定（後述のステップ4を参照）
6. 「Deploy」をクリック。数分でビルドが完了し、`https://kotsukotsu-toshi-joho-xxxx.vercel.app` のような
   URLが発行されます

## ステップ4: 環境変数の設定

Vercelの「Settings → Environment Variables」で以下を設定してください（`.env.example` と同じ項目です）。

| Key | 値 | 備考 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 発行された `https://....vercel.app` のURL | 初回デプロイ後にURLが分かってから設定し、再デプロイしてください |
| `NEXT_PUBLIC_API_BASE_URL` | `stock-platform/backend` を別途デプロイした場合はそのURL | 未デプロイの間は設定しなくてOK（市況データは参考値表示になります） |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense審査通過後に発行されるPublisher ID | 未取得の間は設定しなくてOK（プレースホルダー表示になります） |

環境変数を追加・変更した後は、Vercelの「Deployments」タブから最新デプロイを「Redeploy」すると反映されます。

## 補足: 今後の更新について

GitHub経由でデプロイした場合、`main` ブランチに新しいコミットをpushするたびに、Vercelが自動的に
再デプロイしてくれます。`content/articles/` に新しい記事のMarkdownファイルを追加してpushするだけで、
サイトに反映される運用になります。
