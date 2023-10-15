import SafeApiKit from '@safe-global/api-kit';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { type EthAdapter } from '@safe-global/safe-core-sdk-types';
import { ethers } from 'ethers';

import { useSigner } from '@thirdweb-dev/react';

import { env } from '~/env.mjs';

const SafeServices = {
	mainnet: 'https://safe-transaction-mainnet.safe.global',
	goerli: 'https://safe-transaction-goerli.safe.global/',
	polygon: 'https://safe-transaction-polygon.safe.global',
	base: 'https://safe-transaction-base.safe.global',
	baseGoerli: 'https://safe-transaction-base-testnet.safe.global/',
};

export interface SafeApiServiceConfig {
	// Defaults to mainnet
	chain?: keyof typeof SafeServices;
}

const useSafeApiService = ({
	chain = env.NEXT_PUBLIC_DEFAULT_CHAIN,
}: SafeApiServiceConfig) => {
	const signer = useSigner();

	if (signer) {
		const ethAdapter = new EthersAdapter({
			ethers,
			signerOrProvider: signer,
		}) as unknown as EthAdapter;

		const safeApiKit = new SafeApiKit({
			txServiceUrl: SafeServices[chain],
			ethAdapter,
		});
		return { safeApiKit };
	} else {
		return { error: 'Signer not defined' };
	}
};

export default useSafeApiService;
