import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import { locales } from '../../../lib/locales'

import Home from './Home'

export default async function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	const t = await getMessages({ locale })

	return <Home t={t as Record<string, string>} />
}

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}
