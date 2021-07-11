// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { server } from './server'

jest.mock('../components/Counter')

beforeAll(() => server.listen())

afterEach(() => {
	if (typeof window !== 'undefined') {
		sessionStorage.clear()
		localStorage.clear()
	}

	server.resetHandlers()
})

afterAll(() => server.close())
