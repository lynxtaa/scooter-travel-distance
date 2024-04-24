// @vitest-environment jsdom

import { render as _render, screen, type RenderOptions } from '@testing-library/react'
import { default as userEvent } from '@testing-library/user-event'

import en from '../../messages/en.json'

import Calc from './Calc'

const render = (el: React.ReactElement, options?: RenderOptions) =>
	_render(el, {
		wrapper: ({ children }) => <>{children as any}</>,
		...options,
	})

test('clicking "Calculate" shows result for valid form', async () => {
	render(<Calc t={en} />)

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
	render(<Calc t={en} />)

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
