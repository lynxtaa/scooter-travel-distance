import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Button } from 'reactstrap'

enum Language {
	En = 'en',
	Ru = 'ru-RU',
}

export default function LanguageSwitcher() {
	const { i18n } = useTranslation()

	return (
		<ButtonGroup className="ml-2">
			<Button
				active={i18n.language === Language.En}
				onClick={() => i18n.changeLanguage(Language.En)}
				title="English"
				outline
			>
				EN
			</Button>
			<Button
				active={i18n.language === Language.Ru}
				onClick={() => i18n.changeLanguage(Language.Ru)}
				title="Русский"
				outline
			>
				RU
			</Button>
		</ButtonGroup>
	)
}
