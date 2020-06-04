const handler = require('serve-handler')
const http = require('http')
const ms = require('ms')
const fetch = require('node-fetch')

const server = http.createServer((request, response) => {
	// More details here: https://github.com/zeit/serve-handler#options
	return handler(request, response, { public: 'build' })
})

const PORT = Number(process.env.PORT) || 3000

server.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`)

	setInterval(() => {
		fetch('https://scooter-travel-calc.herokuapp.com/').catch(console.error.bind(console))
	}, ms('10min'))
})
