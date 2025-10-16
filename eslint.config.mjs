import { FlatCompat } from '@eslint/eslintrc';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: {
		env: {
			browser: true,
			node: true,
			es2021: true,
		},
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
});

const config = await (async () => {
	return [
		{
			ignores: [
				'node_modules/**',
				'.next/**',
				'build/**',
				'dist/**',
				'out/**',
			],
		},
		...compat.extends(
			'eslint:recommended',
			'next',
			'next/core-web-vitals',
			'plugin:@typescript-eslint/recommended',
			'plugin:react/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:import/typescript',
			'prettier'
		),
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
			ignores: ['node_modules', 'build', 'dist', '.next'],
			languageOptions: {
				parser: (await import('@typescript-eslint/parser')).default,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
				},
			},
			plugins: {
				react: pluginReact,
				'react-hooks': pluginReactHooks,
				prettier: pluginPrettier,
				import: pluginImport,
				'simple-import-sort': pluginSimpleImportSort,
				'unused-imports': pluginUnusedImports,
				'@next/next': (await import('@next/eslint-plugin-next'))
					.default,
			},
			rules: {
				'@typescript-eslint/triple-slash-reference': 'off',
				'import/no-unassigned-import': [
					'error',
					{
						allow: ['**/*.css'],
					},
				],
				// ✅ General Best Practices
				'no-console': 'warn',
				'prettier/prettier': 'error',

				// Disable ESLint rules that conflict with Prettier
				quotes: 'off',
				indent: 'off',

				// ✅ React Rules
				'react/jsx-uses-react': 'error',
				'react/react-in-jsx-scope': 'off',
				'react/prop-types': 'off',
				'react/display-name': 'warn',

				// ✅ TypeScript Rules
				'@typescript-eslint/no-unused-vars': 'error',
				'@typescript-eslint/no-explicit-any': 'error',
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-namespace': 'off',
				'@typescript-eslint/no-empty-object-type': 'off',

				// ✅ Import Sorting
				'simple-import-sort/imports': 'error',
				'simple-import-sort/exports': 'error',
				'import/first': 'error',
				'import/newline-after-import': 'error',
				'import/no-duplicates': 'error',
				'import/no-dynamic-require': 'warn',
				'import/no-nodejs-modules': 'off',
				'import/no-unassigned-import': 'error',
				'import/no-named-as-default': 'off',

				// ✅ Unused Imports (auto-remove on save)
				'unused-imports/no-unused-imports': 'error',
				'unused-imports/no-unused-vars': [
					'error',
					{
						vars: 'all',
						varsIgnorePattern: '^_',
						args: 'after-used',
						argsIgnorePattern: '^_',
					},
				],
			},
		},
	];
})();

export default config;
