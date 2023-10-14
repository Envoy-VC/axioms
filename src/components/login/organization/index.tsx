import clsx from 'clsx';
import React from 'react';

import { Polygon } from '@thirdweb-dev/chains';
import { useAddress } from '@thirdweb-dev/react';
import { useConnect, useWallet } from '@thirdweb-dev/react';

import { Avatar, Button } from 'antd';

import { Spinner } from '~/components/common';
import { useGetSafesForAddress } from '~/hooks';
import { safeWalletConfig } from '~/providers/web3';

import { TbDotsVertical } from 'react-icons/tb';

import PersonalWallets from '../personal-wallets';

const OrganizationLogin = () => {
	const connect = useConnect();
	const address = useAddress();
	const walletInstance = useWallet();
	const { data, isLoading, error } = useGetSafesForAddress({
		address: address!,
		config: { chain: 'polygon' },
	});

	const [connectingSafeAddress, setConnectingSafeAddress] = React.useState<
		string | null
	>(null);

	const connectSafe = async (safeAddress: string) => {
		try {
			setConnectingSafeAddress(safeAddress);
			const res = await connect(safeWalletConfig, {
				chain: Polygon,
				safeAddress,
				personalWallet: walletInstance!,
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		} finally {
			setConnectingSafeAddress(null);
		}
	};

	if (!walletInstance?.walletId) {
		// Connect Personal Wallet if no wallet is connected
		return (
			<div className='flex flex-col gap-2'>
				<div className='text-center text-[1rem] font-medium text-gray-500'>
					Link Personal Wallet to continue
				</div>
				<div className='px-8 py-2'>
					<PersonalWallets />
				</div>
			</div>
		);
	} else if (walletInstance?.walletId !== safeWalletConfig.id) {
		// If a Personal Wallet is Connected then connect to Safe Wallet
		return (
			<div>
				{isLoading && (
					<div className='mx-auto my-4 w-fit'>
						<Spinner color='primary' size='large' />
					</div>
				)}
				{error && (
					<div className='my-2 px-3 text-[1rem] font-medium text-slate-700'>
						Something went wrong.
					</div>
				)}
				{!isLoading && !error && data.length > 0 && (
					<div className='flex flex-col gap-2'>
						<div className='my-2 px-3 text-[1rem] font-medium text-slate-700'>
							Available Organizations
						</div>
						{data.map((safe, index) => (
							<div key={index} className='flex flex-row items-center gap-2'>
								<Button
									size='large'
									type='text'
									key={index}
									className={clsx(
										'flex w-full flex-row items-center justify-between gap-3 rounded-lg !border-[1px] !px-2 !py-7',
										connectingSafeAddress === safe && 'bg-gray-100'
									)}
									disabled={connectingSafeAddress === safe}
									// eslint-disable-next-line @typescript-eslint/no-misused-promises
									onClick={() => connectSafe(safe)}
								>
									<div className='flex flex-row justify-start gap-3'>
										<Avatar
											alt='Safe Icon'
											src={`https://api.dicebear.com/7.x/shapes/svg?seed=${safe}`}
											size={46}
										/>
										<div className='flex flex-col items-start text-[1rem]'>
											<div className='font-medium text-slate-600'>Untitled</div>
											<div className='text-sm font-medium text-gray-500'>
												{safe.slice(0, 8) + '...' + safe.slice(-8)}
											</div>
										</div>
									</div>
									{connectingSafeAddress === safe && <Spinner color='-gray-400' />}
								</Button>
								<Button
									icon={<TbDotsVertical size={18} />}
									type='text'
									disabled={connectingSafeAddress === safe}
								/>
							</div>
						))}
					</div>
				)}
				{!isLoading && !error && data.length === 0 && (
					<div className='my-2 px-3 text-[1rem] font-medium text-slate-700'>
						No Organizations found.
					</div>
				)}
			</div>
		);
	} else {
		// If Safe Wallet is Connected then connect to Organization then display details
		return (
			<div>
				<div className='my-2 px-3 text-[1rem] font-medium text-slate-700'>
					Connected to
				</div>
				<div className='flex flex-row items-center gap-2 mb-4'>
					<div
						className={clsx(
							'flex w-full flex-row items-center justify-between gap-3 rounded-lg !px-2 !py-2'
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
									{address!.slice(0, 8) + '...' + address!.slice(-8)}
								</div>
							</div>
						</div>
					</div>
					<Button
						icon={<TbDotsVertical size={18} />}
						type='text'
						disabled={connectingSafeAddress === address!}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='my-2 px-3 text-[1rem] font-medium text-slate-700'>
						Available Organizations
					</div>
					{data.map((safe, index) => (
						<div key={index} className='flex flex-row items-center gap-2'>
							<Button
								size='large'
								type='text'
								key={index}
								className={clsx(
									'flex w-full flex-row items-center justify-between gap-3 rounded-lg !border-[1px] !px-2 !py-7',
									connectingSafeAddress === safe && 'bg-gray-100'
								)}
								disabled={connectingSafeAddress === safe}
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={() => connectSafe(safe)}
							>
								<div className='flex flex-row justify-start gap-3'>
									<Avatar
										alt='Safe Icon'
										src={`https://api.dicebear.com/7.x/shapes/svg?seed=${safe}`}
										size={46}
									/>
									<div className='flex flex-col items-start text-[1rem]'>
										<div className='font-medium text-slate-600'>Untitled</div>
										<div className='text-sm font-medium text-gray-500'>
											{safe.slice(0, 8) + '...' + safe.slice(-8)}
										</div>
									</div>
								</div>
								{connectingSafeAddress === safe && <Spinner color='-gray-400' />}
							</Button>
							<Button
								icon={<TbDotsVertical size={18} />}
								type='text'
								disabled={connectingSafeAddress === safe}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
};

export default OrganizationLogin;
