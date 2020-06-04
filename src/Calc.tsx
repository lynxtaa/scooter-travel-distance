import React, { useState } from 'react'
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

import './Calc.scss'
import Counter from './Counter'
import useTitle from './hooks/useTitle'
import useLocalStorage from './hooks/useLocalStorage'

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

const convertFToC = (f: number | string) => ((Number(f) - 32) * 5) / 9
const convertLbToKg = (lb: number | string) => Number(lb) / 2.205
const convertKmToMiles = (km: number | string) => Number(km) / 1.609

export default function Calc({ isMetric }: Props) {
	const { t } = useTranslation()
	const [result, setResult] = useState<number | null>(null)

	const [savedValues, setSavedValues] = useLocalStorage<FormValues>('calcValues')

	const validatePositive = (value: string) =>
		Number(value) > 0 ? undefined : t('positive number required')

	const { register, handleSubmit, errors } = useForm<FormValues>({
		defaultValues: savedValues,
	})

	const title = t('Scooter Travel Distance Calculator')

	useTitle(title)

	function onSubmit(form: FormValues) {
		const weight = isMetric ? Number(form.weight) : convertLbToKg(form.weight)

		const temperature = isMetric
			? Number(form.temperature)
			: convertFToC(form.temperature)

		const chargesNum = Number(form.chargesNum)
		const battery = Number(form.battery)
		const speed = Number(form.speed)

		// Формула позаимствована отсюда
		// https://odno-koleso.com/kalkulyator-probega
		const km = Math.round(
			((437.52 / weight - chargesNum * 0.001206) *
				((temperature * 0.156233 + 15.625) / 10.938) *
				battery *
				speed) /
				100,
		)

		setResult(Math.max(isMetric ? km : convertKmToMiles(km), 0))

		setSavedValues(form)
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
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>°{isMetric ? 'C' : 'F'}</InputGroupText>
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
