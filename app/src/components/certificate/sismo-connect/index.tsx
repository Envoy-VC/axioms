import { SismoConnect } from '@sismo-core/sismo-connect-client';
import type { SismoConnectConfig } from '@sismo-core/sismo-connect-client';
import clsx from 'clsx';
import React from 'react';

import { useRouter } from 'next/router';

import { Button } from 'antd';

import { env } from '~/env.mjs';
import { getSismoAuthClaims } from '~/helpers/sismo/buildConfig';
import { useEventDetails } from '~/hooks';

export const sismoConfig: SismoConnectConfig = {
	appId: env.NEXT_PUBLIC_SISMO_APP_ID,
};

export const sismoConnect = SismoConnect({
	config: sismoConfig,
});

const SismoConnectButton = () => {
	const router = useRouter();
	const { address } = router.query;
	const { data, isLoading, error } = useEventDetails({
		contractAddress: address as string,
	});

	const onClick = () => {
		if (!data) return;
		const { auths, claims } = getSismoAuthClaims(data.verificationConfig);
		sismoConnect.request({
			auths,
			claims,
			signature: { message: 'Verify personal Identity' },
			callbackPath: `/certificate/${address as string}`,
		});
	};
	return (
		<div className='mx-auto w-fit py-8'>
			<Button
				size='large'
				type='primary'
				className={clsx('flex items-center justify-center bg-secondary')}
				disabled={data === null}
				onClick={onClick}
			>
				Verify with Sismo
			</Button>
		</div>
	);
};

export default SismoConnectButton;
