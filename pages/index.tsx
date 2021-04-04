import { GetStaticProps } from 'next'
import { useI18n } from 'next-localization'
import { NextSeo } from 'next-seo'

import App from '../components/App'

export default function Home() {
	const { t } = useI18n()

	const title = t('Scooter Travel Distance Calculator')

	return (
		<>
			<NextSeo title={title} description={title} />
			<App />
		</>
	)
}

export const getStaticProps: GetStaticProps = async function ({ locale }) {
	const { default: lngDict = {} } = await import(`../locales/${locale}.json`)

	return {
		props: { lngDict },
	}
}
