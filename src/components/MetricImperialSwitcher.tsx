'use client'

import Button from './Button'
import { useIsMetric } from './hooks/useIsMetric'

type Props = {
	className?: string
}

export default function MetricImperialSwitcher({ className }: Props) {
	const [isMetric, setIsMetric] = useIsMetric()

	return (
		<div className={className}>
			<Button
				variant={isMetric ? 'solid' : 'outline'}
				className="rounded-r-none"
				onClick={() => setIsMetric(true)}
			>
				°C
			</Button>
			<Button
				variant={isMetric ? 'outline' : 'solid'}
				className="rounded-l-none"
				onClick={() => setIsMetric(false)}
			>
				°F
			</Button>
		</div>
	)
}
