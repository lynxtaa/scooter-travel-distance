'use server'

import { getWeather } from '../../lib/weather'

export async function loadWeather(options: {
	latitude: number
	longitude: number
}): ReturnType<typeof getWeather> {
	return await getWeather(options)
}
