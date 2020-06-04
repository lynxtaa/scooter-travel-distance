import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup } from 'reactstrap'

type Props = {
	isMetric: boolean
	setIsMetric: (value: boolean) => void
}

export default function MetricImperialSwitcher({ isMetric, setIsMetric }: Props) {
	const { t } = useTranslation()

	return (
		<ButtonGroup className="ml-auto">
			<Button outline active={isMetric} onClick={() => setIsMetric(true)}>
				{t('kg/km/°C')}
			</Button>
			<Button outline active={!isMetric} onClick={() => setIsMetric(false)}>
				{t('lbs/miles/°F')}
			</Button>
		</ButtonGroup>
	)
}
