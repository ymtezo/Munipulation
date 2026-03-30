import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

interface MunipulationSettings {
	todoistApiToken: string;
}

const DEFAULT_SETTINGS: MunipulationSettings = {
	todoistApiToken: ''
}

export default class MunipulationPlugin extends Plugin {
	settings: MunipulationSettings;

	async onload() {
		await this.loadSettings();

		// コマンド: アウトライナー指示を処理 (Process outliner instructions)
		this.addCommand({
			id: 'process-outliner-instructions',
			name: 'Process outliner instructions',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.processOutlinerInstructions(editor, view);
			}
		});

		// 設定タブを追加 (Add settings tab)
		this.addSettingTab(new MunipulationSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * アウトライナー指示を処理するメイン関数
	 * Process main outliner instructions
	 */
	async processOutlinerInstructions(editor: Editor, view: MarkdownView) {
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);
		
		// 現在の行のインデントレベルを取得
		const currentIndent = this.getIndentLevel(line);
		
		// 現在の行が指示行かチェック
		const instruction = this.extractInstruction(line);
		
		if (!instruction) {
			new Notice('No instruction found on this line. Use ~~>COMMAND format.');
			return;
		}

		// 指示行の下のサブレベルを収集
		const subItems = this.collectSubItems(editor, cursor.line, currentIndent);
		
		if (subItems.length === 0) {
			new Notice('No sub-items found to process.');
			return;
		}

		// 指示に基づいて処理を実行
		await this.executeInstruction(instruction, subItems, editor, view);
	}

	/**
	 * 行のインデントレベルを取得
	 * Get indent level of a line
	 */
	getIndentLevel(line: string): number {
		const match = line.match(/^(\s*)/);
		if (!match) return 0;
		const spaces = match[1];
		// タブを4スペースとして扱う
		return spaces.replace(/\t/g, '    ').length;
	}

	/**
	 * 行から指示を抽出
	 * Extract instruction from line
	 */
	extractInstruction(line: string): string | null {
		const match = line.match(/~~>(.+?)(?:\s|$)/);
		return match ? match[1].trim() : null;
	}

	/**
	 * サブアイテムを収集
	 * Collect sub-items
	 */
	collectSubItems(editor: Editor, startLine: number, parentIndent: number): string[] {
		const subItems: string[] = [];
		const lineCount = editor.lineCount();
		
		for (let i = startLine + 1; i < lineCount; i++) {
			const line = editor.getLine(i);
			
			// 空行はスキップ
			if (line.trim() === '') continue;
			
			const lineIndent = this.getIndentLevel(line);
			
			// 親と同じか浅いインデントなら終了
			if (lineIndent <= parentIndent) break;
			
			// 直接の子アイテムのみ収集
			if (lineIndent === parentIndent + 1 || lineIndent === parentIndent + 2 || lineIndent === parentIndent + 4) {
				// リストマーカーを削除してテキストを抽出
				const text = line.replace(/^\s*[-*]\s*/, '').trim();
				subItems.push(text);
			}
		}
		
		return subItems;
	}

	/**
	 * 指示を実行
	 * Execute instruction
	 */
	async executeInstruction(instruction: string, subItems: string[], editor: Editor, view: MarkdownView) {
		const upperInstruction = instruction.toUpperCase();
		
		if (upperInstruction === '[[]]' || upperInstruction.includes('[[')) {
			// バックリンク付き移動
			await this.moveWithBacklink(subItems, view);
		} else if (upperInstruction === 'TODOIST') {
			// Todoistにタスクを追加
			await this.addToTodoist(subItems);
		} else {
			new Notice(`Unknown instruction: ${instruction}`);
		}
	}

	/**
	 * バックリンクを保持しながらアイテムを移動
	 * Move items while keeping backlinks
	 */
	async moveWithBacklink(items: string[], view: MarkdownView) {
		const currentFile = view.file;
		if (!currentFile) {
			new Notice('No active file.');
			return;
		}

		// 各アイテムについて処理
		for (const item of items) {
			// リンク先を抽出 (例: [[TargetNote]])
			const linkMatch = item.match(/\[\[([^\]]+)\]\]/);
			if (!linkMatch) {
				new Notice(`No link found in: ${item}`);
				continue;
			}

			const targetNoteName = linkMatch[1];
			const itemText = item.replace(/\[\[([^\]]+)\]\]/, '').trim();
			
			// ターゲットノートを見つけるか作成
			const targetFile = this.app.metadataCache.getFirstLinkpathDest(targetNoteName, currentFile.path);
			
			if (targetFile) {
				// 既存ファイルに追加
				const content = await this.app.vault.read(targetFile);
				const backlink = `[[${currentFile.basename}]]`;
				const newLine = `- ${itemText} (from ${backlink})`;
				await this.app.vault.modify(targetFile, content + '\n' + newLine);
				new Notice(`Moved to ${targetNoteName} with backlink`);
			} else {
				// 新しいファイルを作成
				const backlink = `[[${currentFile.basename}]]`;
				const newContent = `# ${targetNoteName}\n\n- ${itemText} (from ${backlink})`;
				await this.app.vault.create(`${targetNoteName}.md`, newContent);
				new Notice(`Created ${targetNoteName} with item and backlink`);
			}
		}
	}

	/**
	 * Todoistにタスクを追加
	 * Add tasks to Todoist
	 */
	async addToTodoist(items: string[]) {
		if (!this.settings.todoistApiToken) {
			new Notice('Please set Todoist API token in settings.');
			return;
		}

		for (const item of items) {
			try {
				const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${this.settings.todoistApiToken}`
					},
					body: JSON.stringify({
						content: item
					})
				});

				if (response.ok) {
					new Notice(`Added to Todoist: ${item}`);
				} else {
					const error = await response.text();
					new Notice(`Failed to add to Todoist: ${error}`);
				}
			} catch (error) {
				new Notice(`Error adding to Todoist: ${error.message}`);
			}
		}
	}
}

class MunipulationSettingTab extends PluginSettingTab {
	plugin: MunipulationPlugin;

	constructor(app: App, plugin: MunipulationPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Todoist API Token')
			.setDesc('Your Todoist API token for task integration')
			.addText(text => text
				.setPlaceholder('Enter your token')
				.setValue(this.plugin.settings.todoistApiToken)
				.onChange(async (value) => {
					this.plugin.settings.todoistApiToken = value;
					await this.plugin.saveSettings();
				}));
	}
}
