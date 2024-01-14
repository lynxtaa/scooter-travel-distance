import { useI18n } from 'next-localization'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { type WeatherData } from '../lib/weather'

import Button from './Button'
import Counter from './Counter'
import FormErrorMessage from './FormErrorMessage'
import Input from './Input'
import InputRightAddon from './InputRightAddon'
import Select from './Select'
import Spinner from './Spinner'
import useLocalStorage from './hooks/useLocalStorage'
import fetchApi from './utils/fetchApi'
import {
	poundsToKg,
	kmToMiles,
	celsiusToFahrenheit,
	fahrenheitToCelius,
} from './utils/quantities'

type FormValues = {
	weight: string
	chargesNum: string
	temperature: string
	battery: string
	speed: string
}

type Props = {
	isMetric: boolean
}

export default function Calc({ isMetric }: Props) {
	const { t } = useI18n()
	const [result, setResult] = useState<number | null>(null)
	const [weatherLoading, setWeatherLoading] = useState(false)

	const [savedValues, setSavedValues] = useLocalStorage<FormValues | undefined>(
		'calcValues',
		undefined,
	)

	const validatePositive = (value: string) =>
		Number(value) > 0 ? undefined : t('positive number required')

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm<FormValues>({ defaultValues: savedValues })

	const [prevIsMetric, setPrevIsMetric] = useState(isMetric)
	if (isMetric !== prevIsMetric) {
		setPrevIsMetric(isMetric)
		setResult(null)
	}

	function onSubmit(form: FormValues) {
		const weight = isMetric ? Number(form.weight) : poundsToKg(Number(form.weight))

		const temperature = isMetric
			? Number(form.temperature)
			: fahrenheitToCelius(Number(form.temperature))

		const chargesNum = Number(form.chargesNum)
		const battery = Number(form.battery)
		const speed = Number(form.speed)

		// Формула позаимствована отсюда
		// https://odno-koleso.com/kalkulyator-probega
		const km = Math.max(
			Math.round(
				((437.52 / weight - chargesNum * 0.001206) *
					((temperature * 0.156233 + 15.625) / 10.938) *
					battery *
					speed) /
					100,
			),
			0,
		)

		setSavedValues(form)
		setResult(isMetric ? km : kmToMiles(km))
	}

	async function loadWeather() {
		setWeatherLoading(true)

		if (!('geolocation' in navigator)) {
			throw new Error('Geolocation is not supported by your browser')
		}

		const position = await new Promise<GeolocationPosition>((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject),
		)

		const searchParams = new URLSearchParams({
			latitude: String(position.coords.latitude),
			longitude: String(position.coords.longitude),
		})

		const result = await fetchApi<WeatherData>(`/api/weather?${searchParams.toString()}`)

		if ('error' in result) {
			throw result.error
		}

		const { main } = result.data

		setValue(
			'temperature',
			String(Math.round(isMetric ? main.temp : celsiusToFahrenheit(main.temp))),
			{ shouldValidate: true },
		)
	}

	const loadingWeatherText = t('loading weather text')

	return (
		<div>
			<h1 className="mb-6 leading-tight">
				<span className="text-3xl">{t('title')}</span>
				<br />
				<span className="text-md opacity-50">{t('subtitle')}</span>
			</h1>
			<form
				onSubmit={event => {
					handleSubmit(onSubmit)(event).catch(err => {
						console.error(err)
					})
				}}
			>
				<div className="space-y-4">
					<div>
						<label htmlFor="weight" className="block mb-2">
							{t("Rider's Weight")}
						</label>
						<div className="flex flex-row w-full">
							<Input
								type="number"
								id="weight"
								className="w-full rounded-r-none z-10"
								isInvalid={Boolean(errors.weight)}
								placeholder={isMetric ? '75' : '165'}
								{...register('weight', {
									required: t('required'),
									validate: validatePositive,
								})}
							/>
							<InputRightAddon>{t(isMetric ? 'kg' : 'lbs')}</InputRightAddon>
						</div>
						{errors.weight && (
							<FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
						)}
					</div>

					<div>
						<label htmlFor="battery" className="block mb-2">
							{t('Battery Capacity')}
						</label>
						<div className="flex flex-row w-full">
							<Input
								type="number"
								id="battery"
								placeholder="500"
								isInvalid={Boolean(errors.battery)}
								className="w-full rounded-r-none z-10"
								{...register('battery', {
									required: t('required'),
									validate: validatePositive,
								})}
							/>
							<InputRightAddon>{t('W⋅h')}</InputRightAddon>
						</div>
						{errors.battery && (
							<FormErrorMessage>{errors.battery?.message}</FormErrorMessage>
						)}
					</div>

					<div>
						<div className="mb-2">
							<label htmlFor="temperature" className="block mb-2">
								{t('Temperature Outside')}
							</label>
							<div className="flex flex-row w-full">
								<Input
									type="number"
									id="temperature"
									className="w-full rounded-r-none z-10"
									isInvalid={Boolean(errors.temperature)}
									placeholder={isMetric ? '20' : '70'}
									isDisabled={weatherLoading}
									{...register('temperature', { required: t('required') })}
								/>
								<InputRightAddon>°{isMetric ? 'C' : 'F'}</InputRightAddon>
							</div>
							{errors.temperature && (
								<FormErrorMessage>{errors.temperature?.message}</FormErrorMessage>
							)}
						</div>
						<Button
							onClick={() => {
								loadWeather()
									.catch(err => {
										console.error(err)
										setError('temperature', {
											type: 'weather-error',
											message: t('error loading weather'),
										})
									})
									.finally(() => {
										setWeatherLoading(false)
									})
							}}
							variant="link"
							isDisabled={weatherLoading}
						>
							{weatherLoading ? (
								<span className="inline-flex flex-row items-center space-x-1">
									<Spinner className="w-7 h-7" />
									<span>{loadingWeatherText}</span>
								</span>
							) : (
								t('detect from location')
							)}
						</Button>
					</div>

					<div>
						<label htmlFor="chargesNum" className="block mb-2">
							{t('Full battery charges count')}
						</label>
						<Input
							type="number"
							id="chargesNum"
							placeholder="10"
							className="w-full rounded-r-none z-10"
							isInvalid={Boolean(errors.chargesNum)}
							{...register('chargesNum', {
								required: t('required'),
								validate: validatePositive,
							})}
						/>
						{errors.chargesNum && (
							<FormErrorMessage>{errors.chargesNum?.message}</FormErrorMessage>
						)}
					</div>

					<div>
						<label htmlFor="speed" className="block mb-2">
							{t('Speed')}
						</label>
						<Select
							className="w-full"
							id="speed"
							defaultValue=""
							isInvalid={Boolean(errors.speed)}
							{...register('speed', { required: t('required') })}
						>
							<option disabled value="" hidden></option>
							<option value="1">{t('Slow ride')}</option>
							<option value="0.81">{t('Medium speed ride')}</option>
							<option value="0.54">{t('Fast ride')}</option>
						</Select>
						{errors.speed && <FormErrorMessage>{errors.speed?.message}</FormErrorMessage>}
					</div>
				</div>

				<div className="flex items-center mt-4">
					{typeof result === 'number' && (
						<div className="text-xl">
							{t('Distance')}: {result <= 100_000 ? <Counter>{result}</Counter> : '∞'}{' '}
							{t(isMetric ? 'km' : 'miles')}
						</div>
					)}
					<Button type="submit" className="ml-auto">
						{t('Calculate')}
					</Button>
				</div>
			</form>
		</div>
	)
}
