import React from 'react';

import Link from 'next/link';

import { Button, Image, Result } from 'antd';

import { OrganizationConnect } from '~/assets';

const ConnectOrganizationWallet = () => {
	return (
		<Result
			icon={
				<Image
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
					src={OrganizationConnect?.src}
					alt='Not Found'
					preview={false}
					className='w-full min-w-[20rem] sm:min-w-[30rem]'
				/>
			}
			title='Connect your organization wallet to continue'
			extra={
				<Link href='/login?type=organization'>
					<Button type='primary' className='bg-secondary' size='large'>
						Connect
					</Button>
				</Link>
			}
		/>
	);
};

export default ConnectOrganizationWallet;
