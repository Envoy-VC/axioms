import clsx from 'clsx';
import React from 'react';

import { Polygon } from '@thirdweb-dev/chains';
import { useAddress } from '@thirdweb-dev/react';
import { useConnect, useWallet } from '@thirdweb-dev/react';

import { Spinner } from '~/components/common';
import { useGetSafesForAddress } from '~/hooks';
import { safeWalletConfig } from '~/providers/web3';

import { AccountPill, SafeWalletPill } from '../account-pill';
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
							<SafeWalletPill
								key={index}
								safeAddress={safe}
								connectingSafeAddress={connectingSafeAddress}
								connectSafe={connectSafe}
							/>
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
				<AccountPill address={address!} />
			</div>
		);
	}
};

export default OrganizationLogin;
