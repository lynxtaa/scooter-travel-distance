import { type NextApiRequest, type NextApiResponse } from 'next'

import { getWeather, type WeatherData } from '../../lib/weather'

export default async function weather(
	req: NextApiRequest,
	res: NextApiResponse<WeatherData>,
): Promise<void> {
	if (req.method !== 'GET') {
		res.status(405).end()
		return
	}

	const latitude = Number(req.query.latitude)
	const longitude = Number(req.query.longitude)

	if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
		res.status(400).end()
		return
	}

	const weatherData = await getWeather({ latitude, longitude })

	res.json(weatherData)
}
