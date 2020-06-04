import React from 'react'

import Calc from './Calc'
import './App.scss'
import LanguageSwitcher from './LanguageSwitcher'

export default function App() {
	return (
		<div className="App">
			<LanguageSwitcher />
			<Calc />
		</div>
	)
}
