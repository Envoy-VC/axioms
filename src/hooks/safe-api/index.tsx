import SafeApiKit from '@safe-global/api-kit';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { type EthAdapter } from '@safe-global/safe-core-sdk-types';
import { ethers } from 'ethers';

import { useSigner } from '@thirdweb-dev/react';

import { getSafeApiServiceChain } from '~/helpers/network';

const SafeServices = {
	goerli: 'https://safe-transaction-goerli.safe.global',
	polygon: 'https://safe-transaction-polygon.safe.global',
};

export interface SafeApiServiceConfig {
	// Defaults to mainnet
	chain?: keyof typeof SafeServices;
}

interface SafeApiServiceResult {
	safeApiKit: SafeApiKit | null;
	error: string | null;
}

const useSafeApiService = ({
	chain = getSafeApiServiceChain(),
}: SafeApiServiceConfig): SafeApiServiceResult => {
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
		return { safeApiKit, error: null };
	} else {
		return { safeApiKit: null, error: 'Signer not defined' };
	}
};

export default useSafeApiService;
