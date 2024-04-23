'use client'

import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '../navigation'

import Button from './Button'

export default function LanguageSwitcher() {
	const router = useRouter()
	const locale = useLocale()

	const pathname = usePathname()
	const params = useParams()

	return (
		<div>
			<Button
				variant={locale === 'en' ? 'solid' : 'outline'}
				onClick={() => {
					router.replace(
						// @ts-expect-error -- TypeScript will validate that only known `params`
						// are used in combination with a given `pathname`. Since the two will
						// always match for the current route, we can skip runtime checks.
						{ pathname, params },
						{ locale: 'en' },
					)
				}}
				title="English"
				className="rounded-r-none"
			>
				EN
			</Button>
			<Button
				variant={locale === 'ru' ? 'solid' : 'outline'}
				onClick={() => {
					router.replace(
						// @ts-expect-error -- TypeScript will validate that only known `params`
						// are used in combination with a given `pathname`. Since the two will
						// always match for the current route, we can skip runtime checks.
						{ pathname, params },
						{ locale: 'ru' },
					)
				}}
				className="rounded-l-none"
				title="Русский"
			>
				RU
			</Button>
		</div>
	)
}
