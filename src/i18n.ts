import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import languageRU from './locale/ru-RU.json'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			'ru-RU': { translation: languageRU },
		},
		fallbackLng: 'en',
		debug: true,
		interpolation: { escapeValue: false },
	})

export default i18n
