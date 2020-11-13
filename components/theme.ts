import { theme } from '@chakra-ui/react'

const customTheme: typeof theme = {
	...theme,
	config: { initialColorMode: 'dark' },
	colors: {
		...theme.colors,
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
	},
}

export default customTheme
