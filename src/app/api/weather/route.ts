import { NextResponse, type NextRequest } from 'next/server'

import { getWeather } from '../../../../lib/weather'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<Response> {
	const { searchParams } = new URL(request.url)

	const latitude = Number(searchParams.get('latitude'))
	const longitude = Number(searchParams.get('longitude'))

	if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
		return new Response('Invalid input', { status: 400 })
	}

	const weatherData = await getWeather({ latitude, longitude })

	return NextResponse.json(weatherData)
}
