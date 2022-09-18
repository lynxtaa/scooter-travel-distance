import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

const isCi = process.env.CI !== undefined

export default defineConfig({
	test: {
		mockReset: true,
		environment: 'jsdom',
		include: ['**/*.test.{ts,tsx}'],
		globals: true,
		coverage: {
			provider: 'c8',
			reporter: ['html', isCi ? 'text' : 'text-summary'],
			all: true,
			include: ['**/*.ts'],
		},
		snapshotFormat: {
			escapeString: false,
			printBasicPrototype: false,
		},
		setupFiles: ['whatwg-fetch', './jest/setupTests.ts'],
	},
	plugins: [
		swc.vite({
			configFile: false,
			jsc: {
				parser: {
					syntax: 'typescript',
					tsx: true,
				},
				transform: {
					react: {
						development: true,
						useBuiltins: true,
						runtime: 'automatic',
					},
				},
			},
		}),
	],
})
