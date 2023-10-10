import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#37D5AD',
				secondary: '#12A588',
			},
			screens: {
				'3xl': '1720px',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
