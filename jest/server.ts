import { setupServer } from 'msw/node'

const server = setupServer()

export { server }

export { rest } from 'msw'
