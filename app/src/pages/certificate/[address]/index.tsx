import React from 'react';
import type { ReactElement } from 'react';

import { useRouter } from 'next/router';

import { useAddress } from '@thirdweb-dev/react';

import { Layout } from '~/components';
import { CertificateDetails, EventDetails } from '~/components/certificate';
import { Spinner } from '~/components/common';
import { useEventDetails } from '~/hooks';

import type { NextPageWithLayout } from '../../_app';

const CertificatePage: NextPageWithLayout = () => {
	const connectedAddress = useAddress();
	const router = useRouter();
	const { address } = router.query;
	const { data, isLoading, error, manifestId } = useEventDetails({
		contractAddress: address as string,
	});
	if (isLoading) {
		return (
			<div className='flex w-full items-center justify-center'>
				<Spinner size='large' />
			</div>
		);
	} else if (!isLoading && error) {
		return <div>{error}</div>;
	} else if (!isLoading && !error && data) {
		return (
			<div className='flex flex-col gap-2'>
				<EventDetails data={data} />
				{connectedAddress ? (
					<CertificateDetails address={connectedAddress} manifestId={manifestId} />
				) : (
					<div className='flex w-full flex-col items-center justify-center gap-4 p-4'>
						<div className='text-lg text-slate-700'>
							Connect Wallet to verify Eligibility
						</div>
					</div>
				)}
			</div>
		);
	}
};

CertificatePage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CertificatePage;
