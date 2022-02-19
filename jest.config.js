const nextJest = require('next/jest')

const createJestConfig = nextJest()

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig({
	resetMocks: true,
	setupFiles: ['whatwg-fetch'],
	setupFilesAfterEnv: ['./jest/setupTests.ts'],
})
