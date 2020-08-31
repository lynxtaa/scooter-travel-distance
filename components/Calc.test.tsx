import React from 'react'
import { render as _render, screen, waitFor, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Calc from './Calc'
import { server, rest } from '../jest/server'
import { WeatherData } from '../lib/weather'
import { ThemeProvider } from '@chakra-ui/core'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'

const withProviders = ({ children }: { children?: React.ReactNode }) => (
	<ThemeProvider>
		<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
	</ThemeProvider>
)

const render = (el: React.ReactElement, options?: RenderOptions) =>
	_render(el, { wrapper: withProviders, ...options })

test('clicking "Calculate" shows result for valid form', async () => {
	render(<Calc isMetric />)

	await userEvent.type(screen.getByRole('spinbutton', { name: "Rider's Weight" }), '70')

	await userEvent.type(
		screen.getByRole('spinbutton', { name: 'Battery Capacity' }),
		'500',
	)

	await userEvent.type(
		screen.getByRole('spinbutton', { name: 'Temperature Outside' }),
		'20',
	)

	await userEvent.type(
		screen.getByRole('spinbutton', { name: 'Full battery charges count' }),
		'10',
	)

	userEvent.selectOptions(screen.getByRole('combobox', { name: 'Speed' }), ['0.81'])

	userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

	expect(await screen.findByText('43')).toBeInTheDocument()
})

test('clicking "Get weather from my location" loads temperature', async () => {
	server.use(
		rest.get('/api/weather', (req, res, ctx) => {
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
	)

	render(<Calc isMetric />)

	const geolocation: Geolocation = {
		clearWatch: jest.fn(),
		watchPosition: jest.fn(),
		getCurrentPosition: (resolve) =>
			resolve({
				timestamp: new Date().valueOf(),
				coords: {
					latitude: 10,
					longitude: 20,
					accuracy: 1,
					altitude: 10,
					altitudeAccuracy: 1,
					heading: 1,
					speed: 0,
				},
			}),
	}

	Object.defineProperty(navigator, 'geolocation', { value: geolocation })

	userEvent.click(screen.getByRole('button', { name: /Get weather/ }))

	await waitFor(() => {
		expect(screen.getByRole('spinbutton', { name: 'Temperature Outside' })).toHaveValue(
			15,
		)
	})
})
