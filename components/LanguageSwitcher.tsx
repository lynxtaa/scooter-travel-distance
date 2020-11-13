import { Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'

enum Language {
	En = 'en',
	Ru = 'ru',
}

export default function LanguageSwitcher(props: ButtonGroupProps) {
	const router = useRouter()

	return (
		<ButtonGroup spacing={0} {...props}>
			<Button
				variant={router.locale === Language.En ? 'solid' : 'outline'}
				onClick={() => router.replace('/', '/', { locale: Language.En })}
				title="English"
				borderBottomRightRadius="none"
				borderTopRightRadius="none"
			>
				EN
			</Button>
			<Button
				variant={router.locale === Language.Ru ? 'solid' : 'outline'}
				onClick={() => router.replace('/', '/', { locale: Language.Ru })}
				borderBottomLeftRadius="none"
				borderTopLeftRadius="none"
				title="Русский"
			>
				RU
			</Button>
		</ButtonGroup>
	)
}
