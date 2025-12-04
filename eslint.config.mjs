import eslintConfig from '@lynxtaa/eslint-config'
import requiresTypechecking from '@lynxtaa/eslint-config/requires-typechecking'
import { defineConfig, globalIgnores } from 'eslint/config'
import next from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
	...next,
	...nextCoreWebVitals,
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
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage']),
])
