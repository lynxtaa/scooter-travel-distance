import { createNavigation } from 'next-intl/navigation'

import { locales } from '../lib/locales'

export const { Link, redirect, usePathname, useRouter } = createNavigation({
	locales,
})
