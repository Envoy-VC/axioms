/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

export interface OpenSeaMetadata {
	name: string;
	description: string;
	image: string;
	external_url?: string;
	attributes: OpenSeaMetadataAttribute[];
}

interface OpenSeaMetadataAttribute {
	trait_type: string;
	value: string;
}

interface Props {
	manifestId: string;
	address: string;
}

const useCertificateDetails = ({ manifestId, address }: Props) => {
	const [data, setData] = React.useState<OpenSeaMetadata | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	async function refetch() {
		try {
			setError(null);
			setIsLoading(true);
			const res = await fetch(`/api/${manifestId}/${address}`);
			const metadata = (await res.json()) as OpenSeaMetadata;
			setData(metadata);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			setError(String(error.message));
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		void refetch();
	}, []);

	return { data, isLoading, error, refetch };
};

export default useCertificateDetails;
