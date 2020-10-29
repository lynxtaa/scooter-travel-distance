import Head from 'next/head'
import { StrictMode } from 'react'
import { ThemeProvider, CSSReset, DarkMode } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import { GetStaticProps } from 'next'

import App from '../components/App'
import theme from '../components/theme'

export default function Home() {
	return (
		<StrictMode>
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
					<App />
				</DarkMode>
			</ThemeProvider>
		</StrictMode>
	)
}

export const getStaticProps: GetStaticProps = async function ({ locale }) {
	const { default: lngDict = {} } = await import(`../locales/${locale}.json`)

	return {
		props: { lngDict },
	}
}
