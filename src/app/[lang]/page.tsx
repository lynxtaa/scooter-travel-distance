import { unstable_setRequestLocale } from 'next-intl/server'

import { locales } from '../../../lib/locales'

import Home from './Home'

export default async function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <Home />
}

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}
