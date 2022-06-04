import { z } from 'zod'

const WeatherDataSchema = z.object({
	cod: z.literal(200),
	main: z.object({
		temp: z.number(),
		feels_like: z.number(),
		temp_min: z.number(),
		temp_max: z.number(),
		pressure: z.number(),
		humidity: z.number(),
	}),
	wind: z.object({
		speed: z.number(),
		deg: z.number(),
	}),
	name: z.string(),
})

export type WeatherData = z.infer<typeof WeatherDataSchema>

const WeatherErrorSchema = z.object({
	cod: z.number(),
	message: z.string(),
})

export async function getWeather({
	latitude,
	longitude,
}: {
	latitude: number
	longitude: number
}): Promise<WeatherData> {
	if (!process.env.OPENWEATHER_KEY) {
		throw new Error('Env OPENWEATHER_KEY not set')
	}

	const searchParams = new URLSearchParams({
		lat: String(latitude),
		lon: String(longitude),
		units: 'metric',
		appid: process.env.OPENWEATHER_KEY,
	})

	const abortController = new AbortController()

	setTimeout(() => abortController.abort(), 10_000)

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?${searchParams}`,
		{ signal: abortController.signal as any },
	)

	if (!response.ok) {
		throw new Error(`Request to ${response.url} failed (${response.status})`)
	}

	const json = await response.json()

	const data = z.union([WeatherDataSchema, WeatherErrorSchema]).parse(json)

	if ('message' in data) {
		throw new Error(`Request to ${response.url} failed (${data.message})`)
	}

	return data
}
