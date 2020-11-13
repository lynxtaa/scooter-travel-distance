import { Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/react'

type Props = {
	isMetric: boolean
	setIsMetric: (value: boolean) => void
} & ButtonGroupProps

export default function MetricImperialSwitcher({
	isMetric,
	setIsMetric,
	...rest
}: Props) {
	return (
		<ButtonGroup spacing={0} {...rest}>
			<Button
				variant={isMetric ? 'solid' : 'outline'}
				onClick={() => setIsMetric(true)}
				borderBottomRightRadius="none"
				borderTopRightRadius="none"
			>
				°C
			</Button>
			<Button
				variant={isMetric ? 'outline' : 'solid'}
				onClick={() => setIsMetric(false)}
				borderBottomLeftRadius="none"
				borderTopLeftRadius="none"
			>
				°F
			</Button>
		</ButtonGroup>
	)
}
