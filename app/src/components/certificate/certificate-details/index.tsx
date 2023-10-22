import React from 'react';

import { Button } from 'antd';

import { Spinner } from '~/components/common';
import { useCertificateDetails } from '~/hooks';

import { TbRefresh } from 'react-icons/tb';

import CertificateNFTDetails from '../nft-details';

interface Props {
	manifestId: string;
	address: string;
}

const CertificateDetails = ({ manifestId, address }: Props) => {
	const { data, isLoading, error, refetch } = useCertificateDetails({
		manifestId,
		address,
	});

	return (
		<div>
			{isLoading && (
				<div className='flex justify-center'>
					<Spinner size='large' />
				</div>
			)}
			{!isLoading && error && (
				<div className='flex flex-col items-center justify-center gap-4 p-4 sm:flex-row'>
					<div className='text-center text-2xl text-slate-700'>
						Address is not Eligible for the certificate
					</div>
					<Button
						type='primary'
						size='small'
						icon={<TbRefresh size={20} className='' />}
						className='flex items-center justify-center bg-secondary'
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={refetch}
					/>
				</div>
			)}
			{!isLoading && !error && data && <CertificateNFTDetails data={data} />}
		</div>
	);
};

export default CertificateDetails;
