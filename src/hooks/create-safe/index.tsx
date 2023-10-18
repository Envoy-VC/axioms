import { SafeFactory } from '@safe-global/protocol-kit';
import type { SafeAccountConfig } from '@safe-global/protocol-kit';
import React from 'react';

import useSafeApiService from '../safe-api';

const useCreateSafe = () => {
	const { safeApiKit, ethAdapter } = useSafeApiService({});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const mutateAsync = async ({
		owners,
		threshold,
		...props
	}: SafeAccountConfig) => {
		if (!safeApiKit || !ethAdapter)
			return new Error('Safe API Kit is not available yet');
		try {
			setIsLoading(true);
			setError(null);
			const safeFactory = await SafeFactory.create({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				ethAdapter: ethAdapter as any,
			});
			const safeAccountConfig = { owners, threshold, ...props };
			const safe = await safeFactory.deploySafe({
				safeAccountConfig,
				options: { gasLimit: 10**6 },
			});
			const safeAddress = await safe.getAddress();
			return safeAddress;
		} catch (error) {
			setError(String(error));
			return new Error(String(error));
		} finally {
			setIsLoading(false);
		}
	};

	return { mutateAsync, isLoading, error };
};

export default useCreateSafe;
