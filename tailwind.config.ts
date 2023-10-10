import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#12A588',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
