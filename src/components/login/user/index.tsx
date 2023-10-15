import React from 'react';

import { useAddress, useWallet } from '@thirdweb-dev/react';

import { AccountPill } from '../account-pill';
import PersonalWallets from '../personal-wallets';

const UserLogin = () => {
	const address = useAddress();
	const walletInstance = useWallet();
	if (walletInstance === undefined) {
		return (
			<div className='px-8 py-2'>
				<PersonalWallets />
			</div>
		);
	} else {
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

export default UserLogin;
