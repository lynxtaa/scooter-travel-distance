import next from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import eslintConfig from '@lynxtaa/eslint-config'
import requiresTypechecking from '@lynxtaa/eslint-config/requires-typechecking'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'

export default [
	...next,
	...nextCoreWebVitals,
	...nextTypescript,
	...eslintConfig,
	...requiresTypechecking,
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.js', '*.mjs', 'vite.config.mts'],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		...reactPlugin.configs.flat.recommended,
		rules: {
			...reactPlugin.configs.flat.recommended.rules,
			'react/react-in-jsx-scope': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		plugins: {
			'react-hooks': hooksPlugin,
		},
		rules: hooksPlugin.configs.recommended.rules,
	},
	{
		ignores: ['.next', 'coverage'],
	},
]
