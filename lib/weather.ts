export type WeatherData = {
	cod: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		humidity: number
	}
	wind: {
		speed: number
		deg: number
	}
	name: string
}

export type WeatherError = {
	cod: number
	message: string
}

const isResponseError = (data: WeatherError | WeatherData): data is WeatherError =>
	data.cod !== 200

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

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?${searchParams}`,
	)

	if (!response.ok) {
		throw new Error(`Request to ${response.url} failed (${response.status})`)
	}

	const data = await response.json()

	if (isResponseError(data)) {
		throw new Error(`Request to ${response.url} failed (${data.message})`)
	}

	return data
}
