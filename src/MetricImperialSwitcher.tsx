import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'

type Props = {
	isMetric: boolean
	setIsMetric: (value: boolean) => void
}

export default function MetricImperialSwitcher({ isMetric, setIsMetric }: Props) {
	return (
		<ButtonGroup className="ml-auto">
			<Button outline active={isMetric} onClick={() => setIsMetric(true)}>
				°C
			</Button>
			<Button outline active={!isMetric} onClick={() => setIsMetric(false)}>
				°F
			</Button>
		</ButtonGroup>
	)
}
