import Button from './Button'

type Props = {
	isMetric: boolean
	setIsMetric: (value: boolean) => void
	className?: string
}

export default function MetricImperialSwitcher({
	isMetric,
	setIsMetric,
	className,
}: Props) {
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
