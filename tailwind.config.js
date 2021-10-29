/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms')

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.tsx', './components/**/*.tsx', './styles/**/*.css'],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#F7FAFC',
					100: '#EDF2F7',
					200: '#E2E8F0',
					300: '#CBD5E0',
					400: '#A0AEC0',
					500: '#718096',
					600: '#4A5568',
					700: '#2D3748',
					800: '#1A202C',
					900: '#171923',
				},
				whiteAlpha: {
					50: 'rgba(255, 255, 255, 0.04)',
					100: 'rgba(255, 255, 255, 0.06)',
					200: 'rgba(255, 255, 255, 0.08)',
					300: 'rgba(255, 255, 255, 0.16)',
					400: 'rgba(255, 255, 255, 0.24)',
					500: 'rgba(255, 255, 255, 0.36)',
					600: 'rgba(255, 255, 255, 0.48)',
					700: 'rgba(255, 255, 255, 0.64)',
					800: 'rgba(255, 255, 255, 0.80)',
					900: 'rgba(255, 255, 255, 0.92)',
				},
				red: {
					50: '#ffe6ee',
					100: '#f6becc',
					200: '#ea96aa',
					300: '#df6c88',
					400: '#d54366',
					500: '#bc2a4d',
					600: '#93203c',
					700: '#6a152b',
					800: '#420a19',
					900: '#1d0009',
				},
				blue: {
					50: '#ebf8ff',
					100: '#bee3f8',
					200: '#90cdf4',
					300: '#63b3ed',
					400: '#4299e1',
					500: '#3182ce',
					600: '#2b6cb0',
					700: '#2c5282',
					800: '#2a4365',
					900: '#1A365D',
				},
			},
		},
	},
	plugins: [forms],
}