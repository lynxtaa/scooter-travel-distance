import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import langRu from '../locales/ru-RU.json'
import langEn from '../locales/en.json'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			'ru-RU': { translation: langRu },
			en: { translation: langEn },
		},
		fallbackLng: 'en',
		debug: process.env.NODE_ENV === 'development',
		interpolation: { escapeValue: false },
	})

export default i18n
