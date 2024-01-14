// @vitest-environment jsdom

import {
	render as _render,
	screen,
	waitFor,
	type RenderOptions,
} from '@testing-library/react'
import { default as userEvent } from '@testing-library/user-event'
import { I18nProvider } from 'next-localization'

import { server, http, HttpResponse } from '../jest/server'
import { type WeatherData } from '../lib/weather'
import langEn from '../locales/en.json'

import Calc from './Calc'

const render = (el: React.ReactElement, options?: RenderOptions) =>
	_render(el, {
		wrapper: ({ children }) => (
			<I18nProvider locale="en" lngDict={langEn}>
				{children as any}
			</I18nProvider>
		),
		...options,
	})

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

	await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Speed' }), ['0.81'])

	await userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

	expect(await screen.findByText('43')).toBeInTheDocument()
})

test('clicking "Calculate" shows infinity for very big results', async () => {
	render(<Calc isMetric />)

	await userEvent.type(screen.getByRole('spinbutton', { name: "Rider's Weight" }), '1')

	await userEvent.type(
		screen.getByRole('spinbutton', { name: 'Battery Capacity' }),
		'50000',
	)

	await userEvent.type(
		screen.getByRole('spinbutton', { name: 'Temperature Outside' }),
		'20000',
	)

	await userEvent.type(
		screen.getByRole('spinbutton', { name: 'Full battery charges count' }),
		'10',
	)

	await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Speed' }), ['0.81'])

	await userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

	expect(await screen.findByText(/∞/)).toBeInTheDocument()
})

test('clicking "Get weather from my location" loads temperature', async () => {
	server.use(
		http.get('/api/weather', () => {
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

			return HttpResponse.json(data)
		}),
	)

	render(<Calc isMetric />)

	const geolocation: Geolocation = {
		clearWatch: vi.fn(),
		watchPosition: vi.fn(),
		getCurrentPosition: resolve =>
			resolve({
				timestamp: Date.now(),
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

	await userEvent.click(screen.getByRole('button', { name: /detect from location/ }))

	await waitFor(() => {
		expect(screen.getByRole('spinbutton', { name: 'Temperature Outside' })).toHaveValue(
			15,
		)
	})
})
