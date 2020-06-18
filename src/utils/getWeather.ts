export type WeatherError = { cod: number; message: string }

export type WeatherData = {
	cod: 200
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

const isResponseError = (data: WeatherError | WeatherData): data is WeatherError =>
	data.cod !== 200

export default async function getWeather(position: Position) {
	if (!process.env.REACT_APP_OPENWEATHER_KEY) {
		throw new Error('Env REACT_APP_OPENWEATHER_KEY not set')
	}

	const searchParams = new URLSearchParams({
		lat: String(position.coords.latitude),
		lon: String(position.coords.longitude),
		units: 'metric',
		appid: process.env.REACT_APP_OPENWEATHER_KEY,
	})

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?${searchParams}`,
	)

	if (!response.ok) {
		throw new Error(`Request to ${response.url} failed (${response.status})`)
	}

	const json: WeatherData | WeatherError = await response.json()

	if (isResponseError(json)) {
		throw new Error(`Request to ${response.url} failed (${json.message})`)
	}

	return json
}
