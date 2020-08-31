import { Box, Stack } from '@chakra-ui/core'
import React from 'react'
import { I18nextProvider } from 'react-i18next'

import Calc from './Calc'
import LanguageSwitcher from './LanguageSwitcher'
import MetricImperialSwitcher from './MetricImperialSwitcher'
import useLocalStorage from './hooks/useLocalStorage'
import i18n from '../lib/i18n'

export default function App() {
	const [isMetric, setIsMetric] = useLocalStorage<boolean>('system', true)

	return (
		<I18nextProvider i18n={i18n}>
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
		</I18nextProvider>
	)
}
