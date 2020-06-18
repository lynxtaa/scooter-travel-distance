import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { WeatherData } from '../utils/getWeather'

const handlers = [
	rest.get('https://api.openweathermap.org/data/2.5/weather', (req, res, ctx) => {
		const data: WeatherData = {
			cod: 200,
			main: {
				temp: 15,
				feels_like: 18,
				temp_min: 12,
				temp_max: 20,
				pressure: 700,
				humidity: 10,
			},
			wind: { speed: 3, deg: 30 },
			name: 'St. Petersburg',
		}

		return res(ctx.json(data))
	}),
]

const server = setupServer(...handlers)

export { server, rest }
