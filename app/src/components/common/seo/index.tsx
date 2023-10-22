import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='Axioms'
			description='Axioms provides a one stop solution for organizations to issue and verify certificates.'
			openGraph={{
				url: 'https://axioms-alpha.vercel.app',
				title: 'Axioms',
				description:
					'Axioms provides a one stop solution for organizations to issue and verify certificates.',
				images: [
					{
						url: 'https://i.ibb.co/PrKLdJX/OG.png',
						width: 1200,
						height: 630,
						alt: 'Axioms OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Axioms',
			}}
			twitter={{
				handle: '@Envoy_1084',
				site: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
