import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, FormGroup, Input, Label, FormFeedback, Button } from 'reactstrap'

import './Calc.scss'

type FormValues = {
	weight: string
	chargesNum: string
	temperature: string
	battery: string
	speed: string
}

export default function Calc() {
	const { register, handleSubmit, errors } = useForm<FormValues>()

	function onSubmit({ weight, chargesNum, temperature, battery, speed }: FormValues) {
		const km = Math.round(
			(((437.52 / Number(weight) - Number(chargesNum) * 0.001206) *
				((Number(temperature) * 0.156233 + 15.625) / 10.938) *
				Number(battery)) /
				100) *
				Number(speed),
		)

		alert(km)
	}

	return (
		<Container className="Calc">
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<Label for="weight">Вес ездока</Label>
					<Input
						type="number"
						name="weight"
						id="weight"
						placeholder="75"
						invalid={Boolean(errors.weight)}
						innerRef={register({ required: 'обязательное поле' })}
					/>
					{errors.weight && <FormFeedback>{errors.weight.message}</FormFeedback>}
				</FormGroup>

				<FormGroup>
					<Label for="battery">Аккумулятор в Ватт часах</Label>
					<Input
						type="number"
						name="battery"
						id="battery"
						placeholder="500"
						invalid={Boolean(errors.battery)}
						innerRef={register({ required: 'обязательное поле' })}
					/>
					{errors.battery && <FormFeedback>{errors.battery.message}</FormFeedback>}
				</FormGroup>

				<FormGroup>
					<Label for="temperature">Температура воздуха</Label>
					<Input
						type="number"
						name="temperature"
						id="temperature"
						placeholder="20"
						invalid={Boolean(errors.temperature)}
						innerRef={register({ required: 'обязательное поле' })}
					/>
					{errors.temperature && (
						<FormFeedback>{errors.temperature.message}</FormFeedback>
					)}
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

				<Button type="submit">Calculate</Button>
			</form>
		</Container>
	)
}
