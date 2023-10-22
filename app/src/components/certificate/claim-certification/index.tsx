import React from 'react';

import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';

import { Spinner } from '~/components/common';
import { ABI } from '~/utils';

interface Props {
	contractAddress: string;
}

const ClaimCertification = ({ contractAddress }: Props) => {
	const address = useAddress();
	const { contract } = useContract(contractAddress, ABI);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { data, isLoading, error } = useContractRead(contract, 'claimed', [
		address,
	]);

	if (isLoading) {
		return (
			<div className='flex justify-center py-4'>
				<Spinner size='large' />
			</div>
		);
	} else if (!isLoading && error) {
		return (
			<div className='py-4 text-center text-2xl text-slate-700'>
				Something went wrong.
			</div>
		);
	} else if (!isLoading && !error && data === false) {
		return (
			<div className='py-4 text-center text-xl font-medium text-slate-700'>
				Already Claimed Certificate
			</div>
		);
	} else if (!isLoading && !error && data === true) {
		return <div className='py-4'>Claim</div>;
	}
};

export default ClaimCertification;
