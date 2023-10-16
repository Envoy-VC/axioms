import clsx from 'clsx';
import React from 'react';

import Image from 'next/image';

import { Polygon } from '@thirdweb-dev/chains';
import { useConnect, useConnectionStatus } from '@thirdweb-dev/react';
import type { WalletConfig, WalletInstance } from '@thirdweb-dev/react';

import { Button, Spin } from 'antd';

import { getDefaultChain } from '~/helpers/network';
import { personalWallets } from '~/providers/web3';
// Stores
import { useConnectingWallet } from '~/stores';

// Icons
import { AiOutlineLoading } from 'react-icons/ai';

const PersonalWallets = () => {
	const connect = useConnect();
	const connectionStatus = useConnectionStatus();
	const { walletId, setWalletId } = useConnectingWallet();

	const onClick = async (wallet: WalletConfig<WalletInstance>) => {
		try {
			setWalletId(wallet.id);
			await connect(wallet, {
				chainId: getDefaultChain().chainId,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setWalletId(null);
		}
	};
	return (
		<div className='flex flex-col gap-2'>
			{personalWallets.map((wallet) => (
				<Button
					type='text'
					key={wallet.id}
					className={clsx(
						'flex h-full cursor-pointer flex-row items-center justify-between gap-4 rounded-lg p-[5px] px-2 transition-all duration-100 ease-in hover:bg-gray-100',
						wallet.id === walletId && 'bg-gray-100'
					)}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={() => {
						onClick(wallet as unknown as WalletConfig<WalletInstance>).catch(
							(error) => console.log(error)
						);
					}}
					disabled={walletId === wallet.id}
				>
					<div className='items-around flex h-full flex-row gap-3'>
						<Image
							src={wallet.meta.iconURL}
							alt={wallet.meta.name}
							width={40}
							height={40}
							className={clsx(walletId === wallet.id && 'brightness-[90%]')}
						/>
						<div className='flex !h-full flex-col items-start justify-start font-medium'>
							<div className='text-[1rem]'>{wallet.meta.name}</div>
							{!!wallet?.isInstalled && wallet?.isInstalled() === true && (
								<div className='text-sm text-gray-400'>Installed</div>
							)}
						</div>
					</div>
					{connectionStatus === 'connecting' && walletId === wallet.id && (
						<div>
							<Spin
								indicator={
									<AiOutlineLoading className='animate-spin text-[1rem] text-gray-400' />
								}
							/>
						</div>
					)}
				</Button>
			))}
		</div>
	);
};

export default PersonalWallets;
