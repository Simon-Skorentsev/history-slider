import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'unused-imports': unusedImportsPlugin,
			prettier: prettierPlugin,
		},
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				project: './tsconfig.json',
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'prettier/prettier': 'error',
			'prefer-const': 'error',
			'no-var': 'error',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'warn',

			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-non-null-assertion': 'warn',

			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	prettierConfig,
	{
		ignores: ['node_modules/', 'dist/', 'build/', 'webpack.config.*.*', 'postcss.config.js'],
	},
];
