import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from 'next-localization'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import theme from '../components/theme'

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const { lngDict, ...rest } = pageProps

	return (
		<I18nProvider lngDict={lngDict} locale={router.locale!}>
			<ChakraProvider resetCSS theme={theme}>
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="manifest" href="/manifest.json" />
					<meta
						name="google-site-verification"
						content="3Tt_9iZaHQLOItmIIIDcwYxxdijZmUtwOKttlBOjY8o"
					/>
				</Head>
				<Component {...rest} />
			</ChakraProvider>
		</I18nProvider>
	)
}
