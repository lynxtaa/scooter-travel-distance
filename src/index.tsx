import { ThemeProvider, CSSReset, DarkMode } from '@chakra-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { Global, css } from '@emotion/core'

import i18n from './i18n'
import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from './theme'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Global
				styles={css`
					option {
						color: ${theme.colors.gray[800]};
					}
				`}
			/>
			<DarkMode>
				<CSSReset />
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</DarkMode>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

serviceWorker.unregister()
