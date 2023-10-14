import React from 'react';
import type { IconType } from 'react-icons';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { ConfigProvider, Tabs } from 'antd';

import { OrganizationLogin, UserLogin } from '~/components/login';

import { TbBuilding, TbUserPentagon } from 'react-icons/tb';

interface TabItem {
	label: string;
	Icon: IconType;
	children: React.ReactNode;
}

const UserTypeTab = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userType = searchParams.get('type');

	const createQueryString = React.useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	const onChange = (userType: string) => {
		router
			.push('/login' + '?' + createQueryString('type', userType))
			.catch((error) => console.log(error));
	};

	const TabItems: TabItem[] = [
		{
			label: 'User',
			Icon: TbUserPentagon,
			children: <UserLogin />,
		},
		{
			label: 'Organization',
			Icon: TbBuilding,
			children: <OrganizationLogin />,
		},
	];

	return (
		<ConfigProvider
			theme={{
				components: {
					Tabs: {
						horizontalItemPaddingLG: '16px 24px',
					},
				},
			}}
		>
			<Tabs
				defaultActiveKey={userType ?? 'user'}
				className='sm:w-full sm:max-w-lg'
				centered
				size='large'
				onChange={(userType: string) => onChange(userType)}
				items={TabItems.map((item) => {
					const { label, Icon, children } = item;
					return {
						label: (
							<div className='flex flex-row items-center gap-2'>
								<Icon className='text-[1.1rem]' />
								<span className='font-medium'>{label}</span>
							</div>
						),
						key: label.toLowerCase(),
						children: children,
					};
				})}
			/>
		</ConfigProvider>
	);
};

export default UserTypeTab;
