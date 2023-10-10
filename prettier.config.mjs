/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
	trailingComma: 'es5',
	tabWidth: 1,
	semi: true,
	useTabs: true,
	singleQuote: true,
	jsxSingleQuote: true,
	importOrder: [
		'^next/(.*)$',
		'^react/(.*)$',
		'^@thirdweb-dev/(.*)$',
		'^antd',
		'^react-icons/(.*)$',
		'^[./]',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};

export default config;
