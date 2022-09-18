// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import matchers from '@testing-library/jest-dom/matchers'
import { vi, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest'

import { server } from './server'

vi.mock('../components/Counter')

expect.extend(matchers as Record<string, any>)

beforeAll(() => server.listen())

function cleanup() {
	if (typeof window !== 'undefined') {
		sessionStorage.clear()
		localStorage.clear()
	}

	server.resetHandlers()
}

beforeEach(cleanup)

afterEach(cleanup)

afterAll(() => server.close())
