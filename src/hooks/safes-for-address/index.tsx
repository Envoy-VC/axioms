import React from 'react';

import { env } from '~/env.mjs';

import useSafeApiService from '../safe-api';
import type { SafeApiServiceConfig } from '../safe-api';

interface GetSafesForAddressConfig {
	address: string;
	config?: SafeApiServiceConfig;
}

const useGetSafesForAddress = ({
	address,
	config = { chain: env.NEXT_PUBLIC_DEFAULT_CHAIN },
}: GetSafesForAddressConfig) => {
	const { safeApiKit } = useSafeApiService(config);

	// data, loading, error state
	const [data, setData] = React.useState<string[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<string | null>(null);

	const refetch = async () => {
		if (!safeApiKit) return;
		try {
			setIsLoading(true);
			setError(null);
			const serviceInfo = await safeApiKit.getServiceInfo();
			console.log(serviceInfo);
			const result = await safeApiKit.getSafesByOwner(address);
			setData(result.safes);
		} catch (error) {
			setError(String(error));
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		void refetch();
	}, [address]);

	return { data, isLoading, error, refetch };
};

export default useGetSafesForAddress;
