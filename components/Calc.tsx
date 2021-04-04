import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	InputGroup,
	InputRightAddon,
	Button,
	Box,
	Spinner,
	Select,
	Heading,
	Flex,
	Stack,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { WeatherData } from '../lib/weather'

import Counter from './Counter'
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

	const [savedValues, setSavedValues] = useLocalStorage<FormValues>('calcValues')

	const validatePositive = (value: string) =>
		Number(value) > 0 ? undefined : t('positive number required')

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { isSubmitting, errors },
	} = useForm<FormValues>({ defaultValues: savedValues })

	const title = t('Scooter Travel Distance Calculator')

	useEffect(() => {
		setResult(null)
	}, [isMetric])

	function onSubmit(form: FormValues) {
		const weight = isMetric ? +form.weight : poundsToKg(+form.weight)

		const temperature = isMetric
			? +form.temperature
			: fahrenheitToCelius(+form.temperature)

		const chargesNum = +form.chargesNum
		const battery = +form.battery
		const speed = +form.speed

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
		try {
			setWeatherLoading(true)

			if (!navigator.geolocation) {
				throw new Error('Geolocation is not supported by your browser')
			}

			const position = await new Promise<GeolocationPosition>((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject),
			)

			const searchParams = new URLSearchParams({
				latitude: String(position.coords.latitude),
				longitude: String(position.coords.longitude),
			})

			const result = await fetchApi<WeatherData>(`/api/weather?${searchParams}`)

			if ('error' in result) {
				throw result.error
			}

			const { main } = result.data

			setValue(
				'temperature',
				String(Math.round(isMetric ? main.temp : celsiusToFahrenheit(main.temp))),
			)
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			setError('temperature', {
				type: 'weather-error',
				message: t('error loading weather'),
			})
		} finally {
			setWeatherLoading(false)
		}
	}

	return (
		<Box className="Calc">
			<Heading as="h1" fontSize="3xl" fontWeight="normal" mb={4}>
				{title}
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<FormControl isInvalid={Boolean(errors.weight)}>
						<FormLabel htmlFor="weight">{t("Rider's Weight")}</FormLabel>
						<InputGroup>
							<Input
								type="number"
								id="weight"
								placeholder={isMetric ? '75' : '165'}
								borderTopRightRadius="none"
								borderBottomRightRadius="none"
								{...register('weight', {
									required: t('required')!,
									validate: validatePositive,
								})}
							/>
							<InputRightAddon children={t(isMetric ? 'kg' : 'lbs')} />
						</InputGroup>
						<FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={Boolean(errors.battery)}>
						<FormLabel htmlFor="battery">{t('Battery Capacity')}</FormLabel>
						<InputGroup>
							<Input
								type="number"
								id="battery"
								placeholder="500"
								borderTopRightRadius="none"
								borderBottomRightRadius="none"
								{...register('battery', {
									required: t('required')!,
									validate: validatePositive,
								})}
							/>
							<InputRightAddon children={t('W⋅h')} />
						</InputGroup>
						<FormErrorMessage>{errors.battery?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={Boolean(errors.temperature)}>
						<FormLabel htmlFor="temperature">{t('Temperature Outside')}</FormLabel>
						<InputGroup>
							<Input
								type="number"
								id="temperature"
								borderTopRightRadius="none"
								borderBottomRightRadius="none"
								placeholder={isMetric ? '20' : '70'}
								isDisabled={weatherLoading}
								{...register('temperature', { required: t('required')! })}
							/>
							<InputRightAddon padding={0}>
								<Button
									title={t('Get weather from my location')}
									onClick={loadWeather}
									border="none"
								>
									{weatherLoading ? <Spinner /> : `◉ °${isMetric ? 'C' : 'F'}`}
								</Button>
							</InputRightAddon>
						</InputGroup>
						<FormErrorMessage>{errors.temperature?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={Boolean(errors.chargesNum)}>
						<FormLabel htmlFor="chargesNum">{t('Full battery charges count')}</FormLabel>
						<Input
							type="number"
							id="chargesNum"
							placeholder="10"
							{...register('chargesNum', {
								required: t('required')!,
								validate: validatePositive,
							})}
						/>
						<FormErrorMessage>{errors.chargesNum?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={Boolean(errors.speed)}>
						<FormLabel htmlFor="speed">{t('Speed')}</FormLabel>
						<Select
							id="speed"
							defaultValue=""
							{...register('speed', { required: t('required')! })}
						>
							<option disabled value="" hidden></option>
							<option value="1">{t('Slow ride')}</option>
							<option value="0.81">{t('Medium speed ride')}</option>
							<option value="0.54">{t('Fast ride')}</option>
						</Select>
						<FormErrorMessage>{errors.speed?.message}</FormErrorMessage>
					</FormControl>
				</Stack>

				<Flex alignItems="center" mt={4}>
					{typeof result === 'number' && (
						<Box fontSize="xl">
							{t('Distance')}: <Counter>{result}</Counter> {t(isMetric ? 'km' : 'miles')}
						</Box>
					)}
					<Button type="submit" marginLeft="auto" isLoading={isSubmitting}>
						{t('Calculate')}
					</Button>
				</Flex>
			</form>
		</Box>
	)
}
