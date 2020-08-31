import Head from 'next/head'
import dynamic from 'next/dynamic'
import React from 'react'
import { ThemeProvider, CSSReset, DarkMode } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'

import theme from '../components/theme'

// Disable SSR because of problems with i18n
const DynamicAppWithNoSSR = dynamic(() => import('../components/App'), {
	ssr: false,
})

export default function Home() {
	return (
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
					<Head>
						<title>Scooter Travel Distance Calculator</title>
						<meta charSet="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<meta name="description" content="Scooter Travel Distance Calculator" />
						<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
						<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
						<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
						<meta name="theme-color" content="#ffffff" />
						<link rel="manifest" href="/manifest.json" />
					</Head>
					<DynamicAppWithNoSSR />
				</DarkMode>
			</ThemeProvider>
		</React.StrictMode>
	)
}
