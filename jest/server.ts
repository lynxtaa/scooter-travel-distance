import { setupServer } from 'msw/node'

const server = setupServer()
server.listen()

export { server }

export { http, HttpResponse } from 'msw'
