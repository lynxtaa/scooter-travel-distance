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

import './Calc.scss'
import Counter from './Counter'
import useTitle from './hooks/useTitle'

type FormValues = {
	weight: string
	chargesNum: string
	temperature: string
	battery: string
	speed: string
}

export default function Calc() {
	const { t } = useTranslation()
	const [result, setResult] = useState<number | null>(null)

	const [savedValues, setSavedValues] = useState<FormValues | undefined>(() => {
		const saved = localStorage.getItem('calcValues')
		return saved ? JSON.parse(saved) : undefined
	})

	const validatePositive = (value: string) =>
		Number(value) > 0 ? undefined : t('positive number required')

	const { register, handleSubmit, errors } = useForm<FormValues>({
		defaultValues: savedValues,
	})

	useEffect(() => {
		if (savedValues) {
			localStorage.setItem('calcValues', JSON.stringify(savedValues))
		}
	}, [savedValues])

	const title = t('Scooter Travel Distance Calculator')

	useTitle(title)

	function onSubmit({ weight, chargesNum, temperature, battery, speed }: FormValues) {
		// Формула позаимствована отсюда
		// https://odno-koleso.com/kalkulyator-probega
		const km = Math.round(
			((437.52 / Number(weight) - Number(chargesNum) * 0.001206) *
				((Number(temperature) * 0.156233 + 15.625) / 10.938) *
				Number(battery) *
				Number(speed)) /
				100,
		)

		setResult(Math.max(km, 0))

		setSavedValues({
			weight,
			chargesNum,
			temperature,
			battery,
			speed,
		})
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
							placeholder="75"
							invalid={Boolean(errors.weight)}
							innerRef={register({
								required: t('required')!,
								validate: validatePositive,
							})}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>{t('kg')}</InputGroupText>
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
							placeholder="20"
							invalid={Boolean(errors.temperature)}
							innerRef={register({ required: t('required')! })}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>°C</InputGroupText>
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
					>
						<option disabled selected value="" hidden></option>
						<option value="1">{t('Slow ride')}</option>
						<option value="0.81">{t('Medium speed ride')}</option>
						<option value="0.54">{t('Fast ride')}</option>
					</Input>
					{errors.speed && <FormFeedback>{errors.speed.message}</FormFeedback>}
				</FormGroup>

				<div className="d-flex align-items-center mt-4">
					{typeof result === 'number' && (
						<div className="result">
							{t('Distance')}: <Counter>{result}</Counter> {t('km')}
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
