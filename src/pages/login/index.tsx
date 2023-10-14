import type { ReactElement } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { Layout } from '~/components';
import { UserTypeTab } from '~/components/login';

import type { NextPageWithLayout } from '../_app';

const Login: NextPageWithLayout = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const hasUserTypeParam = searchParams.has('type');

	// Change UserType param to user if no query exists
	useEffectOnce(() => {
		if (!hasUserTypeParam) {
			router.push('/login?type=user').catch((error) => console.log(error));
		}
	});

	return (
		<div className='flex flex-col items-center justify-center p-24'>
			<UserTypeTab />
		</div>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Login;
