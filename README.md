# 従業員管理システム (Employee Management System)

従業員管理システム。スキル管理や部署管理など、組織に必要な基本機能を備えています。
（バックエンド実装の勉強用）

## 機能 (Features)

- 👥 従業員情報の管理
  - プロフィール情報（名前、メール、写真）
  - 部署の割り当て
  - スキルセットの管理（得意分野のマーク付き）

- 🔍 高度な検索・フィルター機能
  - 部署別フィルタリング
  - スキルベースの検索
  - ページネーション対応

- 💼 部署管理
  - エンジニアリング
  - プロダクトデザイン
  - データサイエンス
  - プロダクトマネジメント
  - マーケティング

## 技術スタック (Tech Stack)

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand (状態管理)
  - React Router
  - Lucide Icons

- Backend:
  - Supabase
    - データベース
    - 認証
    - ストレージ（プロフィール写真用）

## セットアップ (Setup)

1. リポジトリのクローン:
```bash
git clone https://github.com/hajimesoneda/talent-management
cd talent-management
```

2. 依存関係のインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env`ファイルを作成し、必要な環境変数を設定:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. 開発サーバーの起動:
```bash
npm run dev
```

## 開発ガイドライン (Development Guidelines)

- コンポーネントは小さく、再利用可能に保つ
- TypeScriptの型を適切に活用
- Tailwind CSSクラスは可読性を重視
- データベースアクセスは専用のhooksを通して行う

## 実装予定

- 管理者と従業員ログインを実装
- 管理者と従業員で使える機能を分ける