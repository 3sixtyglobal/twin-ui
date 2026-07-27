// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
	{
		ignores: [
			'coverage',
			'dist',
			'storybook-static',
			'node_modules',
			'rollup.config.mjs',
			'tailwind.config.ts',
			'scripts/coverage.mjs'
		]
	},
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				project: './tsconfig.eslint.json',
				tsconfigRootDir: __dirname
			}
		},
		plugins: {
			'react-hooks': reactHooks,
			import: importPlugin
		},
		settings: {
			'import/resolver': {
				typescript: {}
			}
		},
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allow'
				},
				{
					selector: 'function',
					format: ['camelCase', 'PascalCase']
				},
				{
					selector: 'typeLike',
					format: ['PascalCase'],
					leadingUnderscore: 'allow'
				}
			],
			eqeqeq: ['error', 'always'],
			'no-var': 'error',
			'no-empty': ['error', { allowEmptyCatch: false }],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-nested-ternary': 'warn',
			'prefer-const': 'error',
			'prefer-template': 'warn',
			'object-shorthand': 'warn',
			// Tree-shaking related rules
			'import/no-default-export': 'off',
			'import/exports-last': 'off',
			'import/no-anonymous-default-export': 'error',
			'import/no-extraneous-dependencies': 'error'
		}
	}
);
