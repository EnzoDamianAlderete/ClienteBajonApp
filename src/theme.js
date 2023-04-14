import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	typography: {
		fontFamily: [
			'Anton',
			'Cabin Condensed',
			'Poppins',
			'Roboto Condensed',
			'sans serif',
		],
	},
	palette: {
		background: {
			default: '#292D32',
		},
		custom: {
			white: '#FCFCFC',
			red: '#E63946',
			purple: '#79096E',
			green: '#50E30A',
			skyBLue: '#B4E2FF',
			blue: '#457B9D',
			lightDark: '#292D32',
			dark: ' #080808',
		},
	},
})
