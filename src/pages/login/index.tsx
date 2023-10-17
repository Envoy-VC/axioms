import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { Image } from 'antd';

import { Layout } from '~/components';
import { inter } from '~/components/layout';
import { UserTypeTab } from '~/components/login';
	
import { PiFingerprintDuotone } from 'react-icons/pi';

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
		<div className='mx-auto my-[4rem] max-w-screen-xl px-4'>
			<div className='loginScreenShadow flex min-h-[75vh] flex-col rounded-xl lg:flex-row'>
				<div className='w-full basis-1/2 sm:p-8 sm:px-16'>
					<div className='flex flex-col gap-2'>
						<div className='mb-8 flex flex-row justify-center gap-2'>
							<PiFingerprintDuotone className='text-primary' size={28} />
							<span className='text-xl font-semibold uppercase'>axioms</span>
						</div>
						<span
							className={clsx('text-3xl font-light text-slate-700', inter.className)}
						>
							Get Started with Axioms
						</span>
						<span
							className={clsx(
								'text-[1rem] font-medium text-gray-500',
								inter.className
							)}
						>
							Distribute verifiable certifications on blockchain for your next event.
						</span>
						<div className='my-6'>
							<UserTypeTab />
						</div>
						<div className='flex flex-row items-center gap-2'>
							<div className='h-[2px] w-full bg-gray-300' />
							<span className={clsx(inter.className, 'text-xs text-gray-400')}>
								OR
							</span>
							<div className='h-[2px] w-full bg-gray-300' />
						</div>
						<div className='my-4 flex flex-row items-center justify-center gap-2 font-medium'>
							<div>New to Axioms?</div>
							<Link className='text-primary' href='/organization/create'>
								Create new organization
							</Link>
						</div>
					</div>
				</div>
				<div className='hidden w-full basis-1/2 object-cover lg:flex'>
					<Image
						src='https://cdn.dribbble.com/userupload/7617358/file/original-d98f49fc7017ff3923a0e6a85e1f4f83.png?resize=1024x768'
						alt='certifications'
						preview={false}
						width='100%'
						height='100%'
						className='object-cover'
					/>
				</div>
			</div>
		</div>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Login;
