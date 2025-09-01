// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
export function extendConfig(rules, config) {
	const ignoresConfig = config.find(c => c.ignores);
	if (ignoresConfig) {
		ignoresConfig.ignores.push(
			...[
				'**/storybook-static/**',
				'**/.svelte-kit/**',
				'**/.storybook/**',
				'**/vite-env.d.ts',
				'**/svg.d.ts'
			]
		);
	}
	// Svelte files
	config.push({
		files: ['*.svelte'],
		parser: 'svelte-eslint-parser',
		parserOptions: {
			parser: '@typescript-eslint/parser'
		},
		rules: {
			'no-unused-vars': ['off'],
			'max-len': ['off'],
			'no-inner-declarations': ['off'],
			'header/header': ['off'],
			'jsdoc/require-jsdoc': ['off'],
			...rules.tsRules,
			'@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
			'svelte/valid-compile': ['off']
		}
	});

	// Apps
	config.push({
		files: ['**/apps/**/*.ts'],
		rules: {
			'@typescript-eslint/naming-convention': 'off',
			'jsdoc/require-jsdoc': 'off'
		}
	});
}
