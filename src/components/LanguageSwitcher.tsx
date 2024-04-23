import { useRouter } from 'next/router'

import Button from './Button'

enum Language {
	En = 'en',
	Ru = 'ru',
}

export default function LanguageSwitcher() {
	const router = useRouter()

	return (
		<div>
			<Button
				variant={router.locale === Language.En ? 'solid' : 'outline'}
				onClick={() => {
					void router.replace('/', '/', { locale: Language.En })
				}}
				title="English"
				className="rounded-r-none"
			>
				EN
			</Button>
			<Button
				variant={router.locale === Language.Ru ? 'solid' : 'outline'}
				onClick={() => {
					void router.replace('/', '/', { locale: Language.Ru })
				}}
				className="rounded-l-none"
				title="Русский"
			>
				RU
			</Button>
		</div>
	)
}
