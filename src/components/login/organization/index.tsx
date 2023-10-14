import React from 'react';

import { Polygon } from '@thirdweb-dev/chains';
import {
	metamaskWallet,
	safeWallet,
	useAddress,
	useConnect,
	useWallet,
} from '@thirdweb-dev/react';

const metamask = metamaskWallet();
const safeWalletConfig = safeWallet({
	personalWallets: [metamask],
});

const OrganizationLogin = () => {
	const address = useAddress();
	const connect = useConnect();
	const walletInstance = useWallet();
	const connectPersonalWallet = async () => {
		try {
			const metamaskWallet = await connect(metamask);
			const safeWallet = await connect(safeWalletConfig, {
				personalWallet: metamaskWallet,
				safeAddress: '0x7D7FC09AEEc6A43267A9377934dD34Ab4aab8184',
				chain: Polygon,
			});
			console.log(safeWallet);
		} catch (error) {
			console.log(error);
		}
	};
	return <div>OrganizationLogin</div>;
};

export default OrganizationLogin;
