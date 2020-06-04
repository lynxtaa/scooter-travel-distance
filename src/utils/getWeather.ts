type WeatherResponse = {
	dataseries: {
		cloudcover: number
		lifted_index: number
		prec_type: string
		rh2m: number
		seeing: number
		temp2m: number
		timepoint: number
		transparency: number
	}[]
}

export default async function getWeather(position: Position) {
	const weatcherAPI = new URL('http://www.7timer.info/bin/astro.php')
	weatcherAPI.searchParams.append('lon', String(position.coords.longitude))
	weatcherAPI.searchParams.append('lat', String(position.coords.latitude))
	weatcherAPI.searchParams.append('ac', '0')
	weatcherAPI.searchParams.append('unit', 'metric')
	weatcherAPI.searchParams.append('output', 'json')
	weatcherAPI.searchParams.append('tzshift', '0')

	const response = await fetch(weatcherAPI.toString())

	if (!response.ok) {
		throw new Error(`Request to ${response.url} failed (${response.status})`)
	}

	const json: WeatherResponse = await response.json()

	return json
}
