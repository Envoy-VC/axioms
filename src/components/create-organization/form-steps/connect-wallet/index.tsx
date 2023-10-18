import React from 'react';

import { useAddress, useWallet } from '@thirdweb-dev/react';

import { Button } from 'antd';

import { AccountPill } from '~/components/login/account-pill';
import PersonalWallets from '~/components/login/personal-wallets';
import { useCreateSafeStore } from '~/stores';

import { TbCircle1Filled } from 'react-icons/tb';

const ConnectWalletStep = () => {
	const walletInstance = useWallet();
	const address = useAddress();
	const { setCurrentStep, setOwners } = useCreateSafeStore();
	const onNext = () => {
		if (!address) return;
		setOwners([address]);
		setCurrentStep(1);
	};

	return (
		<div className='walletCardShadow mt-4 flex flex-col gap-8 rounded-xl bg-[rgba(249,250,251,0.5)] p-4'>
			<div className='flex flex-row items-center gap-2'>
				<TbCircle1Filled className='text-3xl text-secondary' />

				<span className='text-xl font-semibold text-secondary'>
					Connect Personal Wallet
				</span>
			</div>
			{walletInstance === undefined && <PersonalWallets />}
			{walletInstance && address && <AccountPill address={address} />}
			<div className='flex w-full justify-end'>
				<Button
					className='bg-secondary'
					type='primary'
					size='large'
					disabled={walletInstance?.walletId === 'safe' || !address}
					onClick={onNext}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default ConnectWalletStep;
