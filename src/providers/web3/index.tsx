import React from 'react';

import { Ethereum, Polygon } from '@thirdweb-dev/chains';
import {
	ThirdwebProvider,
	coinbaseWallet,
	localWallet,
	metamaskWallet,
	safeWallet,
	trustWallet,
	walletConnect,
	zerionWallet,
} from '@thirdweb-dev/react';

import { env } from '~/env.mjs';

// Wallets
const metamask = metamaskWallet();
const walletConnectConfig = walletConnect({
	projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
});
const coinbaseWalletConfig = coinbaseWallet();
const zerionWalletConfig = zerionWallet({
	projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
});

export const personalWallets = [
	metamask,
	walletConnectConfig,
	coinbaseWalletConfig,
	zerionWalletConfig,
];

const { NEXT_PUBLIC_TW_CLIENT_ID, NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID } = env;

interface Props {
	children: React.ReactNode;
}

const Web3Provider = ({ children }: Props) => {
	return (
		<ThirdwebProvider
			clientId={NEXT_PUBLIC_TW_CLIENT_ID}
			activeChain={Ethereum}
			supportedChains={[Ethereum, Polygon]}
			supportedWallets={[
				metamaskWallet(),
				coinbaseWallet(),
				walletConnect({
					projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
				}),
				trustWallet({
					projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
				}),
				localWallet(),
				safeWallet(),
			]}
		>
			{children}
		</ThirdwebProvider>
	);
};

export default Web3Provider;
