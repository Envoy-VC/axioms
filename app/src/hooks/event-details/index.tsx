/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

import { useContract, useContractRead } from '@thirdweb-dev/react';

import { type Metadata, getMetadata } from '~/helpers/arweave';
import { ABI } from '~/utils';

interface Result {
	data: Metadata | null;
	isLoading: boolean;
	error: string | null;
	manifestId: string;
}

interface Props {
	contractAddress: string;
}

const useEventDetails = ({ contractAddress }: Props) => {
	const { contract } = useContract(contractAddress, ABI);
	const { data: manifestId } = useContractRead(contract, 'certificateId');

	const [data, setData] = React.useState<Metadata | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		async function fetchMetadata() {
			if (!manifestId) return;
			try {
				setError(null);
				setIsLoading(true);
				const metadata = await getMetadata(manifestId as string);
				setData(metadata);
			} catch (error) {
				setError(String(error));
			} finally {
				setIsLoading(false);
			}
		}
		void fetchMetadata();
	}, [manifestId]);

	return { data, isLoading, error, manifestId } as Result;
};

export default useEventDetails;
