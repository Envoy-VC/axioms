import React from 'react';

import {
	Base,
	BaseGoerli,
	Ethereum,
	Goerli,
	Polygon,
} from '@thirdweb-dev/chains';
import {
	ThirdwebProvider,
	coinbaseWallet,
	metamaskWallet,
	safeWallet,
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

export const safeWalletConfig = safeWallet({
	personalWallets: [
		metamask,
		walletConnectConfig,
		coinbaseWalletConfig,
		zerionWalletConfig,
	],
});

export const personalWallets = [
	metamask,
	walletConnectConfig,
	coinbaseWalletConfig,
	zerionWalletConfig,
];

const { NEXT_PUBLIC_TW_CLIENT_ID, NEXT_PUBLIC_DEFAULT_CHAIN } = env;

interface Props {
	children: React.ReactNode;
}

export const getActiveChain = () => {
	const defaultChain = NEXT_PUBLIC_DEFAULT_CHAIN;
	switch (defaultChain) {
		case 'mainnet':
			return Ethereum;
		case 'polygon':
			return Polygon;
		case 'goerli':
			return Goerli;
		case 'base':
			return Base;
		case 'baseGoerli':
			return BaseGoerli;
		default:
			return Ethereum;
	}
};

const Web3Provider = ({ children }: Props) => {
	return (
		<ThirdwebProvider
			clientId={NEXT_PUBLIC_TW_CLIENT_ID}
			activeChain={getActiveChain()}
			supportedChains={[Ethereum, Polygon, Goerli, Base, BaseGoerli]}
		>
			{children}
		</ThirdwebProvider>
	);
};

export default Web3Provider;
