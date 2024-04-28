import Button from './Button'

type Props = {
	className?: string
	isMetric: boolean
	setIsMetric: (isMetric: boolean) => void
}

export default function MetricImperialSwitcher({
	className,
	isMetric,
	setIsMetric,
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
