/**
 * @jest-environment jsdom
 */

import { ChakraProvider } from '@chakra-ui/react'
import { render as _render, screen, waitFor, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nProvider } from 'next-localization'

import { server, rest } from '../jest/server'
import { WeatherData } from '../lib/weather'
import langEn from '../locales/en.json'

import Calc from './Calc'

const render = (el: React.ReactElement, options?: RenderOptions) =>
	_render(el, {
		wrapper: ({ children }) => (
			<ChakraProvider>
				<I18nProvider locale="en" lngDict={langEn}>
					{children as any}
				</I18nProvider>
			</ChakraProvider>
		),
		...options,
	})

test('clicking "Calculate" shows result for valid form', async () => {
	render(<Calc isMetric />)

	userEvent.type(screen.getByRole('spinbutton', { name: "Rider's Weight" }), '70')

	userEvent.type(screen.getByRole('spinbutton', { name: 'Battery Capacity' }), '500')

	userEvent.type(screen.getByRole('spinbutton', { name: 'Temperature Outside' }), '20')

	userEvent.type(
		screen.getByRole('spinbutton', { name: 'Full battery charges count' }),
		'10',
	)

	userEvent.selectOptions(screen.getByRole('combobox', { name: 'Speed' }), ['0.81'])

	userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

	expect(await screen.findByText('43')).toBeInTheDocument()
})

test('clicking "Calculate" shows infinity for very big results', async () => {
	render(<Calc isMetric />)

	userEvent.type(screen.getByRole('spinbutton', { name: "Rider's Weight" }), '1')

	userEvent.type(screen.getByRole('spinbutton', { name: 'Battery Capacity' }), '50000')

	userEvent.type(screen.getByRole('spinbutton', { name: 'Temperature Outside' }), '20000')

	userEvent.type(
		screen.getByRole('spinbutton', { name: 'Full battery charges count' }),
		'10',
	)

	userEvent.selectOptions(screen.getByRole('combobox', { name: 'Speed' }), ['0.81'])

	userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

	expect(await screen.findByText(/∞/)).toBeInTheDocument()
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

	userEvent.click(screen.getByRole('button', { name: /detect from location/ }))

	await waitFor(() => {
		expect(screen.getByRole('spinbutton', { name: 'Temperature Outside' })).toHaveValue(
			15,
		)
	})
})
