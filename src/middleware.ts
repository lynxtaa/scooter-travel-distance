import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from '../lib/locales'

export default createMiddleware({
	locales,
	defaultLocale,
})

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', `/(ru|en)/:path*`],
}
