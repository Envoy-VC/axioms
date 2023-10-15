import clsx from 'clsx';
import React from 'react';

import { useDisconnect } from '@thirdweb-dev/react';

import { Avatar, Button } from 'antd';

import { Spinner } from '~/components/common';

import { TbDotsVertical, TbLogout } from 'react-icons/tb';

interface SafeWalletPillProps {
	safeAddress: string;
	connectingSafeAddress: string | null;
	connectSafe: (safeAddress: string) => Promise<void>;
}

export const SafeWalletPill = ({
	safeAddress,
	connectingSafeAddress,
	connectSafe,
}: SafeWalletPillProps) => {
	return (
		<div className='flex flex-row items-center gap-2'>
			<Button
				size='large'
				type='text'
				className={clsx(
					'flex w-full flex-row items-center justify-between gap-3 rounded-lg !border-[1px] !px-2 !py-7',
					connectingSafeAddress === safeAddress && 'bg-gray-100'
				)}
				disabled={connectingSafeAddress === safeAddress}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={() => connectSafe(safeAddress)}
			>
				<div className='flex flex-row justify-start gap-3'>
					<Avatar
						alt='Safe Icon'
						src={`https://api.dicebear.com/7.x/shapes/svg?seed=${safeAddress}`}
						size={46}
					/>
					<div className='flex flex-col items-start text-[1rem]'>
						<div className='font-medium text-slate-600'>Untitled</div>
						<div className='text-sm font-medium text-gray-500'>
							{safeAddress.slice(0, 8) + '...' + safeAddress.slice(-8)}
						</div>
					</div>
				</div>
				{connectingSafeAddress === safeAddress && <Spinner color='gray-400' />}
			</Button>
			<Button
				icon={<TbDotsVertical size={18} />}
				type='text'
				disabled={connectingSafeAddress === safeAddress}
			/>
		</div>
	);
};

interface AccountPillProps {
	address: string;
}

export const AccountPill = ({ address }: AccountPillProps) => {
	const disconnect = useDisconnect();
	return (
		<div
			className={clsx(
				'flex w-full flex-row items-center justify-between gap-3 rounded-lg p-2'
			)}
		>
			<div className='flex flex-row justify-start gap-3'>
				<Avatar
					alt='Safe Icon'
					src={`https://api.dicebear.com/7.x/shapes/svg?seed=${address}`}
					size={46}
				/>
				<div className='flex flex-col items-start text-[1rem]'>
					<div className='font-medium text-slate-600'>Untitled</div>
					<div className='text-sm font-medium text-gray-500'>
						{address?.slice(0, 8) + '...' + address?.slice(-8)}
					</div>
				</div>
			</div>
			<Button
				icon={<TbLogout size={24} className='text-gray-500' />}
				type='text'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={disconnect}
			/>
		</div>
	);
};
