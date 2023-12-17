// `npx vsce package` => make vsix

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	//console.log('"vscode-multilang-md" is now active.');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let activate_ja = vscode.commands.registerCommand('vscode-multilang-md.activate_ja', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'markdown') {
			const selection = editor.selection;
			const text = editor.document.getText(selection);

			var replacedText = text.replace(/<!--en:-->/g, '<!--en:');
			replacedText = replacedText.replace(/<!--:en-->/g, ':en-->');
			replacedText = replacedText.replace(/<!--ja:(?!-)/g, '<!--ja:-->');
			replacedText = replacedText.replace(/(?<!-):ja-->/g, '<!--:ja-->');
			replacedText = replacedText.replace(/<!--ja:$/g, '<!--ja:-->');
			replacedText = replacedText.replace(/^:ja-->/g, '<!--:ja-->');

			if (text !== replacedText) {
				editor.edit(editBuilder => {
					editBuilder.replace(selection, replacedText);
				});
			}
		}
	});
	context.subscriptions.push(activate_ja);

	let activate_en = vscode.commands.registerCommand('vscode-multilang-md.activate_en', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'markdown') {
			const selection = editor.selection;
			const text = editor.document.getText(selection);

			var replacedText = text.replace(/<!--ja:-->/g, '<!--ja:');
			replacedText = replacedText.replace(/<!--:ja-->/g, ':ja-->');
			replacedText = replacedText.replace(/<!--en:(?!-)/g, '<!--en:-->');
			replacedText = replacedText.replace(/(?<!-):en-->/g, '<!--:en-->');
			replacedText = replacedText.replace(/<!--en:$/g, '<!--en:-->');
			replacedText = replacedText.replace(/^:en-->/g, '<!--:en-->');

			if (text !== replacedText) {
				editor.edit(editBuilder => {
					editBuilder.replace(selection, replacedText);
				});
			}
		}
	});
	context.subscriptions.push(activate_en);

	let activate_detail = vscode.commands.registerCommand('vscode-multilang-md.activate_detail', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'markdown') {
			const selection = editor.selection;
			const text = editor.document.getText(selection);

			var replacedText = text.replace(/<!--details:(?!-)/g, '<!--details:-->');
			replacedText = replacedText.replace(/(?<!-):details-->/g, '<!--:details-->');
			replacedText = replacedText.replace(/<!--details:$/g, '<!--details:-->');
			replacedText = replacedText.replace(/^:details-->/g, '<!--:details-->');

			if (text !== replacedText) {
				editor.edit(editBuilder => {
					editBuilder.replace(selection, replacedText);
				});
			}
		}
	});
	context.subscriptions.push(activate_detail);

	let deactivate_detail = vscode.commands.registerCommand('vscode-multilang-md.deactivate_detail', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'markdown') {
			const selection = editor.selection;
			const text = editor.document.getText(selection);

			var replacedText = text.replace(/<!--details:-->/g, '<!--details:');
			replacedText = replacedText.replace(/<!--:details-->/g, ':details-->');

			if (text !== replacedText) {
				editor.edit(editBuilder => {
					editBuilder.replace(selection, replacedText);
				});
			}
		}
	});
	context.subscriptions.push(deactivate_detail);

	let insert_lang_snippet = vscode.commands.registerCommand('vscode-multilang-md.insert_lang_snippet', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'markdown') {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, "<!--ja:-->\nFIXME: \n<!--:ja-->\n<!--en:\nFIXME: \n:en-->\n");
			});
		}
	});
	context.subscriptions.push(insert_lang_snippet);

	let insert_details_snippet = vscode.commands.registerCommand('vscode-multilang-md.insert_details_snippet', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document.languageId === 'markdown') {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, "<!--details:-->\nFIXME: \n<!--:details-->\n");
			});
		}
	});
	context.subscriptions.push(insert_details_snippet);
}

// This method is called when your extension is deactivated
export function deactivate() { }
