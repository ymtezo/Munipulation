# Munipulation クイックスタートガイド (Quick Start Guide)

## 5分で始める (Get Started in 5 Minutes)

### 1. インストール (Installation)

#### 方法A: 手動インストール（推奨）

1. [最新リリース](https://github.com/ymtezo/Munipulation/releases)から以下をダウンロード:
   - `main.js`
   - `manifest.json`

2. Obsidianのプラグインフォルダに配置:
   ```
   あなたのVault/.obsidian/plugins/munipulation/
   ```

3. Obsidianを再起動

4. 設定 → コミュニティプラグイン → Munipulationを有効化

#### 方法B: 開発版（開発者向け）

```bash
cd あなたのVault/.obsidian/plugins/
git clone https://github.com/ymtezo/Munipulation.git munipulation
cd munipulation
npm install
npm run build
```

### 2. 基本的な使い方 (Basic Usage)

#### 例1: ノート間でアイテムを移動

1. 任意のノートを開く

2. 以下のように記述:
   ```markdown
   - ~~>[[]]
     - [[プロジェクトA]] 新機能のアイデア
     - [[メモ]] 重要な議論ポイント
   ```

3. `~~>[[]]`の行にカーソルを置く

4. コマンドパレット (Ctrl/Cmd + P) を開く

5. "Process outliner instructions" を実行

6. 結果:
   - "新機能のアイデア" が「プロジェクトA」ノートに移動
   - "重要な議論ポイント" が「メモ」ノートに移動
   - 両方に元のノートへのバックリンクが追加される

#### 例2: Todoistにタスクを追加

1. まず、Todoist APIトークンを設定:
   - Obsidian設定 → Munipulation
   - [Todoist Settings](https://todoist.com/prefs/integrations)からAPIトークンを取得
   - トークンを入力して保存

2. ノートに以下のように記述:
   ```markdown
   - ~~>TODOIST
     - 買い物リストを作成する
     - メールを返信する
     - 資料を準備する
   ```

3. `~~>TODOIST`の行にカーソルを置く

4. コマンドパレット (Ctrl/Cmd + P) を開く

5. "Process outliner instructions" を実行

6. 結果: 各アイテムがTodoistにタスクとして追加される

### 3. よくある質問 (FAQ)

#### Q: サブアイテムが認識されない

A: インデントを確認してください。タブまたは2-4スペースでインデントする必要があります。

```markdown
正しい例:
- ~~>[[]]
  - [[Target]] アイテム   ← タブまたは2-4スペース

間違った例:
- ~~>[[]]
- [[Target]] アイテム      ← インデントなし
```

#### Q: 新しいノートは自動的に作成される?

A: はい！リンク先のノートが存在しない場合、自動的に作成されます。

#### Q: エラーメッセージが表示される

A: 一般的なエラー:
- "No instruction found": `~~>`で始まる指示を書いてください
- "No sub-items found": サブアイテムを正しくインデントしてください
- Todoist関連エラー: APIトークンが正しく設定されているか確認

#### Q: 複数の指示を同時に使える?

A: 各指示は個別に実行されます。同じノート内で複数の指示を使えますが、それぞれ個別に実行してください。

### 4. ヒントとトリック (Tips & Tricks)

#### カスタマイズ可能なフォーマット

バックリンク付き移動の際、テキストとリンクの順序は自由です:

```markdown
- ~~>[[]]
  - [[Target]] テキスト
  - テキスト [[Target]]
  - テキスト[[Target]]テキスト
```

すべて動作します！

#### リストマーカー

`-` または `*` どちらも使用可能:

```markdown
- ~~>[[]]
  - アイテム1
  * アイテム2
```

#### インデントレベル

タブと2-4スペースが自動検出されます:

```markdown
タブ使用:
- ~~>[[]]
	- アイテム

スペース使用:
- ~~>[[]]
  - アイテム
```

### 5. トラブルシューティング (Troubleshooting)

#### プラグインが表示されない

1. ファイルが正しいフォルダにあるか確認
2. Obsidianを再起動
3. コミュニティプラグインが有効になっているか確認

#### ビルドエラー（開発版）

```bash
# クリーンインストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 6. サポート (Support)

- 📖 詳細なドキュメント: [README.md](README.md)
- 💡 使用例: [EXAMPLES.md](EXAMPLES.md)
- 🔧 開発者向け: [DEVELOPMENT.md](DEVELOPMENT.md)
- 🐛 問題報告: [GitHub Issues](https://github.com/ymtezo/Munipulation/issues)

### 7. 次のステップ (Next Steps)

プラグインの使い方に慣れたら:

1. 独自のワークフローを作成
2. 他の指示コマンドの追加を提案
3. コミュニティと使い方を共有

楽しくお使いください！🎉
