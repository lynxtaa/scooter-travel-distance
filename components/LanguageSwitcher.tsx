import { Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

enum Language {
	En = 'en',
	Ru = 'ru-RU',
}

export default function LanguageSwitcher(props: ButtonGroupProps) {
	const { i18n } = useTranslation()

	return (
		<ButtonGroup spacing={0} {...props}>
			<Button
				variant={i18n.language === Language.En ? 'solid' : 'outline'}
				onClick={() => i18n.changeLanguage(Language.En)}
				title="English"
				borderBottomRightRadius="none"
				borderTopRightRadius="none"
			>
				EN
			</Button>
			<Button
				variant={i18n.language === Language.Ru ? 'solid' : 'outline'}
				onClick={() => i18n.changeLanguage(Language.Ru)}
				borderBottomLeftRadius="none"
				borderTopLeftRadius="none"
				title="Русский"
			>
				RU
			</Button>
		</ButtonGroup>
	)
}
