import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { locales } from '../lib/locales'

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale as 'en' | 'ru')) {
		return notFound()
	}

	return {
		messages: (await import(`../messages/${locale}.json`)).default,
	}
})
