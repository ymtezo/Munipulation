# Munipulation

Obsidian plugin for executing instructions in outliner sub-levels.

アウトライナーのサブレベルで指示を実行するためのObsidianプラグインです。

## 概要 (Overview)

このプラグインでは、アウトライナーの第一レベルに指示を書き、そのサブレベルがその指示を実行します。

In this plugin, you write an instruction in the first level of the outliner, and the sub-levels execute that instruction.

### サポートされている指示 (Supported Instructions)

#### `~~>[[]]` - バックリンク付き移動 (Move with Backlink)

サブアイテムを指定したノートに移動し、元のノートへのバックリンクを保持します。

Moves sub-items to specified notes while keeping a backlink to the original note.

**例 (Example):**

```markdown
- ~~>[[]]
  - [[Project Ideas]] 新しい機能のアイデア
  - [[Meeting Notes]] 議論したポイント
```

実行すると:
- "新しい機能のアイデア" が Project Ideas ノートに追加され、バックリンク付きで保存されます
- "議論したポイント" が Meeting Notes ノートに追加され、バックリンク付きで保存されます

#### `~~>TODOIST` - Todoistタスク追加 (Add to Todoist)

サブアイテムをTodoistのタスクとして追加します。

Adds sub-items as tasks to Todoist.

**例 (Example):**

```markdown
- ~~>TODOIST
  - コードレビューを完了する
  - ドキュメントを更新する
  - テストを実行する
```

実行すると、各サブアイテムがTodoistのタスクとして追加されます。

## インストール (Installation)

### 手動インストール (Manual Installation)

1. 最新リリースから `main.js` と `manifest.json` をダウンロード
2. Obsidianのプラグインフォルダに `munipulation` フォルダを作成
3. ダウンロードしたファイルをそのフォルダにコピー
4. Obsidianの設定でプラグインを有効化

### 開発版 (Development)

```bash
# リポジトリをクローン
git clone https://github.com/ymtezo/Munipulation.git

# 依存関係をインストール
npm install

# ビルド
npm run build
```

## 使い方 (Usage)

1. Obsidianで任意のノートを開く
2. アウトライナー形式で指示とサブアイテムを記述
3. 指示行にカーソルを置く
4. コマンドパレット (Ctrl/Cmd + P) を開く
5. "Process outliner instructions" を実行

## 設定 (Settings)

### Todoist API Token

Todoist統合を使用する場合は、設定でTodoist APIトークンを設定してください。

APIトークンは [Todoist Settings](https://todoist.com/prefs/integrations) から取得できます。

## 開発 (Development)

```bash
# 開発モードで実行
npm run dev

# ビルド
npm run build
```

## ライセンス (License)

MIT

## 作者 (Author)

ymtezo
