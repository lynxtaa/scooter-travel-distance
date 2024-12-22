import { getMessages, setRequestLocale } from 'next-intl/server'

import { locales } from '../../../lib/locales'

import Home from './Home'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getMessages({ locale })

	return <Home t={t as Record<string, string>} />
}

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}
