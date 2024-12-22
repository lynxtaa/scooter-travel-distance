import { vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('../components/Counter')

function cleanup() {
	if (globalThis.window !== undefined) {
		sessionStorage.clear()
		localStorage.clear()
	}
}

beforeEach(cleanup)

afterEach(cleanup)
