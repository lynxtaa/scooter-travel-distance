import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'

import { locales } from '../lib/locales'

export const { Link, redirect, usePathname, useRouter } =
	createLocalizedPathnamesNavigation({
		locales,
		pathnames: {
			'/': '/',
		},
		localePrefix: undefined,
	})
