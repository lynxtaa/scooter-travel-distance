module.exports = {
	extends: [
		'next',
		'@lynxtaa/eslint-config',
		'@lynxtaa/eslint-config/requires-typechecking',
	],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	rules: {
		'@typescript-eslint/unbound-method': 'off',
	},
}
