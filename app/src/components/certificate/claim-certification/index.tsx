import clsx from 'clsx';
import React from 'react';

import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';

import { Button } from 'antd';

import { Spinner } from '~/components/common';
import { useEventDetails } from '~/hooks';
import { ABI } from '~/utils';

import SismoConnectButton from '../sismo-connect';
import { sismoConnect } from '../sismo-connect';

interface Props {
	contractAddress: string;
}

const ClaimCertification = ({ contractAddress }: Props) => {
	const response = sismoConnect.getResponse();
	const { data: metadata } = useEventDetails({
		contractAddress: contractAddress,
	});
	const [proofsVerified, setProofsVerified] = React.useState<boolean>(false);
	const [isVerifying, setIsVerifying] = React.useState<boolean>(false);

	const verifyResponse = async () => {
		if (!metadata) return;
		try {
			setIsVerifying(true);

			const res = await fetch(`/api/verify`, {
				method: 'POST',
				body: JSON.stringify({ response, config: metadata.verificationConfig }),
			});

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const json = await res.json();
			console.log(json);
			setProofsVerified(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsVerifying(false);
		}
	};

	const address = useAddress();
	const { contract } = useContract(contractAddress, ABI);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { data, isLoading, error } = useContractRead(contract, 'claimed', [
		address,
	]);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { data: manifestId } = useContractRead(contract, 'certificateId');

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
		return (
			<div className='py-4'>
				{!response && <SismoConnectButton />}
				{response && !proofsVerified && (
					<div className='flex justify-center py-4'>
						<Button
							size='large'
							type='primary'
							className={clsx('flex items-center justify-center bg-secondary')}
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={verifyResponse}
						>
							Verify Proofs
						</Button>
					</div>
				)}
				{}
			</div>
		);
	}
};

export default ClaimCertification;
