# 開発者ガイド (Developer Guide)

## プロジェクト構造 (Project Structure)

```
Munipulation/
├── main.ts              # メインプラグインファイル (Main plugin file)
├── manifest.json        # プラグインマニフェスト (Plugin manifest)
├── package.json         # npm依存関係 (npm dependencies)
├── tsconfig.json        # TypeScript設定 (TypeScript config)
├── esbuild.config.mjs   # ビルド設定 (Build configuration)
├── version-bump.mjs     # バージョン管理 (Version management)
├── versions.json        # バージョン履歴 (Version history)
└── README.md            # ドキュメント (Documentation)
```

## 開発セットアップ (Development Setup)

### 必要条件 (Requirements)

- Node.js 16以上
- npm 7以上
- Obsidian (テスト用)

### インストール (Installation)

```bash
# 依存関係をインストール
npm install
```

### ビルド (Building)

```bash
# 開発ビルド（ウォッチモード）
npm run dev

# プロダクションビルド
npm run build
```

## 開発ワークフロー (Development Workflow)

### 1. Obsidianプラグインフォルダにリンク

```bash
# macOS/Linux
ln -s /path/to/Munipulation /path/to/vault/.obsidian/plugins/munipulation

# Windows
mklink /D "C:\path\to\vault\.obsidian\plugins\munipulation" "C:\path\to\Munipulation"
```

### 2. 開発モードで実行

```bash
npm run dev
```

### 3. Obsidianでテスト

1. Obsidianを開く
2. 設定 → コミュニティプラグイン → 更新
3. Munipulationプラグインを有効化
4. 変更を加えた後、Ctrl/Cmd + R でリロード

## コード構造 (Code Structure)

### MunipulationPlugin クラス

メインのプラグインクラス。Obsidianの `Plugin` クラスを継承。

**主要メソッド:**

- `onload()`: プラグイン読み込み時の初期化
- `processOutlinerInstructions()`: アウトライナー指示を処理
- `executeInstruction()`: 特定の指示を実行
- `moveWithBacklink()`: バックリンク付き移動を実行
- `addToTodoist()`: Todoistタスク追加を実行

### ユーティリティメソッド

- `getIndentLevel()`: 行のインデントレベルを計算
- `extractInstruction()`: 行から指示を抽出
- `collectSubItems()`: サブアイテムを収集

## 新しい指示の追加方法 (Adding New Instructions)

1. `executeInstruction()` メソッドに新しい条件を追加
2. 対応する実行メソッドを実装
3. README とEXAMPLES.md を更新

例:

```typescript
async executeInstruction(instruction: string, subItems: string[], editor: Editor, view: MarkdownView) {
    const upperInstruction = instruction.toUpperCase();
    
    if (upperInstruction === 'MYCMD') {
        await this.myCustomCommand(subItems);
    }
    // ... 既存のコード
}

async myCustomCommand(items: string[]) {
    // カスタムロジックを実装
}
```

## テスト (Testing)

### 手動テスト

1. テスト用のObsidian vaultを作成
2. サンプルノートを作成:

```markdown
- ~~>[[]]
  - [[Test Note]] テストアイテム

- ~~>TODOIST
  - テストタスク
```

3. コマンドパレットから "Process outliner instructions" を実行
4. 結果を確認

## デバッグ (Debugging)

### コンソールログ

Obsidianの開発者ツール（Ctrl/Cmd + Shift + I）を開いて、console.logの出力を確認できます。

```typescript
console.log('Debug info:', value);
```

### ブレークポイント

開発者ツールのSourcesタブで、ブレークポイントを設定できます。

## リリース (Releasing)

### バージョンアップ

```bash
# package.jsonのバージョンを更新
npm version patch  # or minor, major

# ビルド
npm run build
```

### GitHubリリース

1. タグを作成: `git tag -a 1.0.0 -m "Release 1.0.0"`
2. プッシュ: `git push origin 1.0.0`
3. GitHubでリリースを作成
4. `main.js` と `manifest.json` を添付

## トラブルシューティング (Troubleshooting)

### ビルドエラー

```bash
# node_modulesをクリーンアップ
rm -rf node_modules package-lock.json
npm install
```

### Obsidianでプラグインが表示されない

1. プラグインフォルダのパスを確認
2. manifest.jsonが正しいか確認
3. Obsidianを再起動

## コーディング規約 (Coding Standards)

- TypeScript strict モードを使用
- 英語と日本語の両方でコメントを記述
- インデント: タブ使用
- 命名: camelCase for variables/functions, PascalCase for classes

## 貢献 (Contributing)

1. Issueを作成して議論
2. フォークしてブランチを作成
3. 変更を実装
4. プルリクエストを作成

## リソース (Resources)

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [Obsidian Plugin Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Todoist API](https://developer.todoist.com/rest/v2/)
