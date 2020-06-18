import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Calc from './Calc'

afterEach(() => {
	localStorage.clear()
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

	userEvent.selectOptions(screen.getByRole('combobox', { name: 'Speed' }), ['0.81'])

	userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

	expect(await screen.findByText(/Distance/i)).toBeInTheDocument()
})

test('clicking "Get weather from my location" loads temperature', async () => {
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
