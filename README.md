# 今日のToDo

毎日リセットされる、スマホ向けの1日限定 ToDo ウェブアプリです。

## 機能

- タスクの追加・完了切り替え
- 完了タスクは下へ滑らかに移動（Framer Motion）
- 日付・曜日の表示
- 当日分のみ LocalStorage に保存（前日分は引き継がない）
- 5種類のパステルテーマ

## 開発の始め方

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。スマホ実機では同一 Wi‑Fi 上の PC の IP アドレスでアクセスできます。

## ビルド

```bash
npm run build
npm run preview
```

## ディレクトリ構成（初心者向け）

```
src/
├── main.jsx              # エントリーポイント
├── App.jsx               # 画面全体の組み立て
├── index.css             # Tailwind とベーススタイル
├── components/           # 見た目の部品（UI）
│   ├── DateHeader.jsx    # 日付・曜日
│   ├── TaskInput.jsx     # タスク入力
│   ├── TaskList.jsx      # 一覧
│   ├── TaskItem.jsx      # 1行分のタスク
│   ├── ThemePicker.jsx   # テーマ選択
│   └── ...
├── hooks/                # 状態管理のロジック
│   ├── useTasks.js       # タスク操作
│   └── useTheme.js       # テーマ切り替え
├── utils/                # 汎用的な関数
│   ├── date.js           # 日付フォーマット
│   └── storage.js        # LocalStorage
└── constants/            # 定数（テーマ色・キー名など）
    ├── themes.js
    └── storageKeys.js
```

## 技術スタック

- React + Vite
- Tailwind CSS v4
- Framer Motion

## PWA について

`public/manifest.webmanifest` を用意しています。本番デプロイ時は HTTPS 上でホストすると、ホーム画面への追加がしやすくなります。
