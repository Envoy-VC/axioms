import React from 'react';

import Link from 'next/link';

import { useAddress } from '@thirdweb-dev/react';

import { Avatar, Badge, Button } from 'antd';

import { TbWallet } from 'react-icons/tb';

import UserDropdown from './user-dropdown';

const ConnectButton = () => {
	const address = useAddress();
	if (!address) {
		return (
			<Link href='/login?type=user'>
				<Button
					type='primary'
					size='middle'
					className='flex items-center justify-center gap-2 bg-secondary px-8 py-4'
				>
					<TbWallet size={18} />
					Connect
				</Button>
			</Link>
		);
	} else {
		return (
			<UserDropdown>
				<Badge
					count={
						<div className='border-white] h-[12px] w-[12px] rounded-full border-2 bg-primary' />
					}
					offset={[-6, 34]}
				>
					<div className='h-10 w-10 cursor-pointer rounded-full border-2 border-primary'>
						<Avatar
							alt='Safe Icon'
							src={`https://api.dicebear.com/7.x/shapes/svg?seed=${address}`}
							size={36}
						/>
					</div>
				</Badge>
			</UserDropdown>
		);
	}
};

export default ConnectButton;
