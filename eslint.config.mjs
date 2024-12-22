import eslintConfig from '@lynxtaa/eslint-config'
import requiresTypechecking from '@lynxtaa/eslint-config/requires-typechecking'

export default [
	// TODO: support eslint-config-next
	...eslintConfig,
	...requiresTypechecking,
	// See https://typescript-eslint.io/getting-started/typed-linting
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.js', '*.mjs'],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			'@typescript-eslint/unbound-method': 'off',
		},
	},
]
