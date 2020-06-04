import React from 'react'

import Calc from './Calc'
import './App.scss'
import LanguageSwitcher from './LanguageSwitcher'
import useLocalStorage from './hooks/useLocalStorage'
import MetricImperialSwitcher from './MetricImperialSwitcher'

export default function App() {
	const [isMetric, setIsMetric] = useLocalStorage<boolean>('system', true)

	return (
		<div className="App">
			<div className="d-flex align-items-center mb-3">
				<MetricImperialSwitcher isMetric={isMetric} setIsMetric={setIsMetric} />
				<LanguageSwitcher />
			</div>
			<Calc isMetric={isMetric} />
		</div>
	)
}
