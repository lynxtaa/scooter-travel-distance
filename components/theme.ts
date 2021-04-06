import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
	config: { initialColorMode: 'dark' },
	colors: {
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
	components: {
		Heading: {
			baseStyle: {
				fontWeight: 'normal',
				cursor: 'default',
			},
		},
	},
	styles: {
		global: {
			':focus:not(:focus-visible)': {
				boxShadow: 'none !important',
				outline: 'none !important',
			},
		},
	},
})
