import type { Metadata } from 'next'
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'

import '../../styles/global.css'

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale })

	return {
		metadataBase: new URL(
			process.env.VERCEL_URL !== undefined
				? `https://${process.env.VERCEL_URL}`
				: `http://localhost:${process.env.PORT ?? 3000}`,
		),
		title: t('title'),
		description: t('description'),
		alternates: {
			canonical: 'https://scooter-travel-calc.vercel.app/',
			languages: {
				ru: 'https://scooter-travel-calc.vercel.app/ru',
				en: 'https://scooter-travel-calc.vercel.app/en',
			},
		},
		robots: 'index,follow',
		icons: {
			icon: '/favicon-32x32.png',
			apple: '/apple-touch-icon.png',
		},
		verification: {
			google: '3Tt_9iZaHQLOItmIIIDcwYxxdijZmUtwOKttlBOjY8o',
			yandex: 'b2784b31e677d50f',
		},
		manifest: '/manifest.json',
		openGraph: {
			description: t('description'),
			title: t('title'),
			images: [
				{
					url: '/android-chrome-512x512.png',
					width: 512,
					height: 512,
				},
			],
		},
	}
}

export default function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return (
		<html lang={locale}>
			<body>{children}</body>
		</html>
	)
}
