import { Box, Stack } from '@chakra-ui/react'

import Calc from './Calc'
import LanguageSwitcher from './LanguageSwitcher'
import MetricImperialSwitcher from './MetricImperialSwitcher'
import useLocalStorage from './hooks/useLocalStorage'

export default function App() {
	const [isMetric, setIsMetric] = useLocalStorage<boolean>('system', true)

	return (
		<Box
			className="App"
			maxWidth="500px"
			minHeight="100vh"
			height="100%"
			margin="0 auto"
			padding={4}
		>
			<Stack isInline spacing={3} justify="right" mb={3}>
				<MetricImperialSwitcher isMetric={isMetric} setIsMetric={setIsMetric} />
				<LanguageSwitcher />
			</Stack>
			<Calc isMetric={isMetric} />
		</Box>
	)
}
