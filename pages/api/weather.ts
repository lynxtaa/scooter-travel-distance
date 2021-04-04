import { NextApiRequest, NextApiResponse } from 'next'

import { getWeather, WeatherData } from '../../lib/weather'

export default async function weather(
	req: NextApiRequest,
	res: NextApiResponse<WeatherData>,
): Promise<void> {
	if (req.method !== 'GET') {
		return res.status(405).end()
	}

	const latitude = Number(req.query.latitude)
	const longitude = Number(req.query.longitude)

	if (isNaN(latitude) || isNaN(longitude)) {
		return res.status(400).end()
	}

	const weatherData = await getWeather({ latitude, longitude })

	res.json(weatherData)
}
