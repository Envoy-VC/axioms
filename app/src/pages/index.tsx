import type { ReactElement } from 'react';

import { useRouter } from 'next/router';

import { Button } from 'antd';

import { Layout } from '~/components';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	const router = useRouter();
	return (
		<div className='w-full p-6 sm:p-16'>
			<div className='mx-auto flex max-w-4xl flex-col gap-16 p-3 text-center'>
				<div className='text-5xl font-semibold sm:text-7xl'>
					<span className='text-secondary'>Verifiable Certifications</span> for
					everyone.
				</div>
				<div className='mx-auto max-w-4xl text-lg'>
					Axioms provides a one stop solution for organizations to issue and verify
					certificates. Organizations are{' '}
					<span className='font-medium text-primary'>Safe Multi-Sig Wallets</span>{' '}
					and certificates are permanently stored on{' '}
					<span className='font-medium text-primary'>Arweave</span> and user
					verification takes place with zkProofs using{' '}
					<span className='font-medium text-primary'>Sismo Connect</span>.
				</div>
				<Button
					className='mx-auto w-full max-w-[12rem] bg-secondary'
					size='large'
					type='primary'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={() =>
						router
							.push('/login?type=organization')
							.catch((error) => console.log(error))
					}
				>
					Get Started
				</Button>
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
