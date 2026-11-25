import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

import { isGlobalConfigurationScope } from '../luals';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Workspace settings cannot authorize global Lua configuration', () => {
		assert.strictEqual(isGlobalConfigurationScope({ globalValue: 'User', workspaceValue: 'User' }, 'User'), false);
		assert.strictEqual(isGlobalConfigurationScope({ globalValue: 'User', workspaceFolderValue: 'User' }, 'User'), false);
		assert.strictEqual(isGlobalConfigurationScope({ globalValue: 'User', workspaceLanguageValue: 'User' }, 'User'), false);
		assert.strictEqual(isGlobalConfigurationScope({ globalValue: 'User', workspaceFolderLanguageValue: 'User' }, 'User'), false);
	});

	test('User settings retain explicit configuration scopes', () => {
		assert.strictEqual(isGlobalConfigurationScope({ globalValue: 'User' }, 'User'), true);
		assert.strictEqual(isGlobalConfigurationScope({ globalValue: 'Workspace' }, 'Workspace'), true);
		assert.strictEqual(isGlobalConfigurationScope(undefined, 'User'), false);
	});
});
