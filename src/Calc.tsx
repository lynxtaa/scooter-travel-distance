import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
	FormGroup,
	Input,
	Label,
	FormFeedback,
	Button,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from 'reactstrap'
import Qty from 'js-quantities'

import './Calc.scss'
import Counter from './Counter'
import useTitle from './hooks/useTitle'
import useLocalStorage from './hooks/useLocalStorage'
import getWeather from './utils/getWeather'

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
	const { t } = useTranslation()
	const [result, setResult] = useState<number | null>(null)
	const [weatherLoading, setWeatherLoading] = useState(false)

	const [savedValues, setSavedValues] = useLocalStorage<FormValues>('calcValues')

	const validatePositive = (value: string) =>
		Number(value) > 0 ? undefined : t('positive number required')

	const { register, handleSubmit, errors, setValue, setError } = useForm<FormValues>({
		defaultValues: savedValues,
	})

	const title = t('Scooter Travel Distance Calculator')

	useTitle(title)

	useEffect(() => {
		setResult(null)
	}, [isMetric])

	function onSubmit(form: FormValues) {
		const weight = isMetric ? +form.weight : new Qty(+form.weight, 'lbs').to('kg').scalar

		const temperature = isMetric
			? +form.temperature
			: new Qty(+form.temperature, 'tempF').to('tempC').scalar

		const chargesNum = +form.chargesNum
		const battery = +form.battery
		const speed = +form.speed

		// Формула позаимствована отсюда
		// https://odno-koleso.com/kalkulyator-probega
		const km = Math.round(
			((437.52 / weight - chargesNum * 0.001206) *
				((temperature * 0.156233 + 15.625) / 10.938) *
				battery *
				speed) /
				100,
		)

		setResult(Math.max(isMetric ? km : new Qty(km, 'km').to('miles').scalar, 0))

		setSavedValues(form)
	}

	async function loadWeather() {
		try {
			setWeatherLoading(true)

			if (!navigator.geolocation) {
				throw new Error('Geolocation is not supported by your browser')
			}

			const position = await new Promise<Position>((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject),
			)

			const { dataseries } = await getWeather(position)

			const { temp2m } = dataseries[0]
			setValue(
				'temperature',
				String(isMetric ? temp2m : new Qty(temp2m, 'tempC').to('tempF').toPrec(1).scalar),
			)
		} catch (err) {
			console.error(err)
			setError('temperature', 'weather-error', t('error loading weather'))
		} finally {
			setWeatherLoading(false)
		}
	}

	return (
		<div className="Calc">
			<h3 className="mb-4">{title}</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<Label for="weight">{t("Rider's Weight")}</Label>
					<InputGroup>
						<Input
							type="number"
							name="weight"
							id="weight"
							placeholder={isMetric ? '75' : '165'}
							invalid={Boolean(errors.weight)}
							innerRef={register({
								required: t('required')!,
								validate: validatePositive,
							})}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>{t(isMetric ? 'kg' : 'lbs')}</InputGroupText>
						</InputGroupAddon>
						{errors.weight && <FormFeedback>{errors.weight.message}</FormFeedback>}
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<Label for="battery">{t('Battery Capacity')}</Label>
					<InputGroup>
						<Input
							type="number"
							name="battery"
							id="battery"
							placeholder="500"
							invalid={Boolean(errors.battery)}
							innerRef={register({
								required: t('required')!,
								validate: validatePositive,
							})}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>{t('W⋅h')}</InputGroupText>
						</InputGroupAddon>
						{errors.battery && <FormFeedback>{errors.battery.message}</FormFeedback>}
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<Label for="temperature">{t('Temperature Outside')}</Label>
					<InputGroup>
						<Input
							type="number"
							name="temperature"
							id="temperature"
							placeholder={isMetric ? '20' : '70'}
							invalid={Boolean(errors.temperature)}
							innerRef={register({ required: t('required')! })}
							readOnly={weatherLoading}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText className="p-0">
								<Button
									className="location-btn"
									title={t('Get weather from my location')}
									onClick={loadWeather}
								>
									<span className={weatherLoading ? 'loading' : undefined}>◉</span> °
									{isMetric ? 'C' : 'F'}
								</Button>
							</InputGroupText>
						</InputGroupAddon>
						{errors.temperature && (
							<FormFeedback>{errors.temperature.message}</FormFeedback>
						)}
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<Label for="chargesNum">{t('Full battery charges count')}</Label>
					<Input
						type="number"
						name="chargesNum"
						id="chargesNum"
						placeholder="10"
						invalid={Boolean(errors.chargesNum)}
						innerRef={register({ required: t('required')!, validate: validatePositive })}
					/>
					{errors.chargesNum && <FormFeedback>{errors.chargesNum.message}</FormFeedback>}
				</FormGroup>

				<FormGroup>
					<Label for="speed">{t('Speed')}</Label>
					<Input
						type="select"
						name="speed"
						id="speed"
						invalid={Boolean(errors.speed)}
						innerRef={register({ required: t('required')! })}
						defaultValue=""
					>
						<option disabled value="" hidden></option>
						<option value="1">{t('Slow ride')}</option>
						<option value="0.81">{t('Medium speed ride')}</option>
						<option value="0.54">{t('Fast ride')}</option>
					</Input>
					{errors.speed && <FormFeedback>{errors.speed.message}</FormFeedback>}
				</FormGroup>

				<div className="d-flex align-items-center mt-4">
					{typeof result === 'number' && (
						<div className="result">
							{t('Distance')}: <Counter>{result}</Counter> {t(isMetric ? 'km' : 'miles')}
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
