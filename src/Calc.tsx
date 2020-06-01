import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
	Container,
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

type FormValues = {
	weight: string
	chargesNum: string
	temperature: string
	battery: string
	speed: string
}

export default function Calc() {
	const [result, setResult] = useState<number | null>(null)

	const [savedValues, setSavedValues] = useState<FormValues | undefined>(() => {
		const saved = localStorage.getItem('calcValues')
		return saved ? JSON.parse(saved) : undefined
	})

	const { register, handleSubmit, errors } = useForm<FormValues>({
		defaultValues: savedValues,
	})

	useEffect(() => {
		if (savedValues) {
			localStorage.setItem('calcValues', JSON.stringify(savedValues))
		}
	}, [savedValues])

	function onSubmit({ weight, chargesNum, temperature, battery, speed }: FormValues) {
		const km = Math.round(
			((437.52 / Number(weight) - Number(chargesNum) * 0.001206) *
				((Number(temperature) * 0.156233 + 15.625) / 10.938) *
				Number(battery) *
				Number(speed)) /
				100,
		)

		setResult(Math.round(km))

		setSavedValues({
			weight,
			chargesNum,
			temperature,
			battery,
			speed,
		})
	}

	return (
		<Container className="Calc">
			<h3 className="mb-4">Калькулятор точного пробега</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<Label for="weight">Вес ездока</Label>
					<InputGroup>
						<Input
							type="number"
							name="weight"
							id="weight"
							placeholder="75"
							invalid={Boolean(errors.weight)}
							innerRef={register({ required: 'обязательное поле' })}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>кг</InputGroupText>
						</InputGroupAddon>
						{errors.weight && <FormFeedback>{errors.weight.message}</FormFeedback>}
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<Label for="battery">Аккумулятор</Label>
					<InputGroup>
						<Input
							type="number"
							name="battery"
							id="battery"
							placeholder="500"
							invalid={Boolean(errors.battery)}
							innerRef={register({ required: 'обязательное поле' })}
						/>
						<InputGroupAddon addonType="append">
							<InputGroupText>Вт⋅ч</InputGroupText>
						</InputGroupAddon>
						{errors.battery && <FormFeedback>{errors.battery.message}</FormFeedback>}
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<Label for="temperature">Температура воздуха</Label>
					<InputGroup>
						<Input
							type="number"
							name="temperature"
							id="temperature"
							placeholder="20"
							invalid={Boolean(errors.temperature)}
							innerRef={register({ required: 'обязательное поле' })}
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
					<Label for="chargesNum">Количество полных зарядок батареи</Label>
					<Input
						type="number"
						name="chargesNum"
						id="chargesNum"
						placeholder="10"
						invalid={Boolean(errors.chargesNum)}
						innerRef={register({ required: 'обязательное поле' })}
					/>
					{errors.chargesNum && <FormFeedback>{errors.chargesNum.message}</FormFeedback>}
				</FormGroup>

				<FormGroup>
					<Label for="speed">Скорость</Label>
					<Input
						type="select"
						name="speed"
						id="speed"
						invalid={Boolean(errors.speed)}
						innerRef={register({ required: 'обязательное поле' })}
					>
						<option disabled selected value="" hidden></option>
						<option value="1">Медленная езда</option>
						<option value="0.81">Езда на средней скорости</option>
						<option value="0.54">Быстрая езда</option>
					</Input>
					{errors.speed && <FormFeedback>{errors.speed.message}</FormFeedback>}
				</FormGroup>

				<div className="d-flex align-items-center mt-4">
					{typeof result === 'number' && (
						<div className="result">
							Пробег: <Counter>{result}</Counter> км
						</div>
					)}
					<Button type="submit" className="ml-auto">
						Рассчитать
					</Button>
				</div>
			</form>
		</Container>
	)
}
