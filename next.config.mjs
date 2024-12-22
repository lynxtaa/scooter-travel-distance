import bundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
}

export default bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})(withNextIntl(nextConfig))
