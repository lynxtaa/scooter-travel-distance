import React from 'react'
import { useTranslation } from 'react-i18next'
import {
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'reactstrap'

const languages: { [key: string]: { icon: string; title: string } } = {
	'ru-RU': { icon: 'RU', title: 'Русский' },
	en: { icon: 'EN', title: 'English' },
}

export default function LanguageSwitcher() {
	const { i18n } = useTranslation()

	return (
		<UncontrolledDropdown className="ml-2">
			<DropdownToggle outline caret>
				{languages[i18n.language].icon}{' '}
			</DropdownToggle>
			<DropdownMenu>
				{Object.keys(languages)
					.filter((key) => key !== i18n.language)
					.map((key) => (
						<DropdownItem
							key={key}
							title={languages[key].title}
							onClick={() => i18n.changeLanguage(key)}
						>
							{languages[key].icon}
						</DropdownItem>
					))}
			</DropdownMenu>
		</UncontrolledDropdown>
	)
}
