import { I18nProvider } from 'next-localization'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const { lngDict, ...rest } = pageProps

	return (
		<I18nProvider lngDict={lngDict} locale={router.locale!}>
			<Component {...rest} />
		</I18nProvider>
	)
}
