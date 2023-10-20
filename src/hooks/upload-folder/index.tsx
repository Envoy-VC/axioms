import { WebIrys } from '@irys/sdk';
import { providers } from 'ethers';
import React from 'react';

import { env } from '~/env.mjs';
import { useCreateCertificateStore } from '~/stores';
import type { POAPCertificateState } from '~/stores/create-certificate';

const irysConfig = () => {
	if (env.NEXT_PUBLIC_ENV === 'development') {
		return {
			url: 'https://devnet.irys.xyz',
			token: 'matic',
		};
	} else {
		return {
			url: 'https://node1.irys.xyz',
			token: 'matic',
		};
	}
};

const useUploadToArweave = () => {
	const { holders } = useCreateCertificateStore();
	const certificate = useCreateCertificateStore(
		(state) => (state as POAPCertificateState).certificate
	);
	const [webIrys, setWebIrys] = React.useState<WebIrys | null>(null);
	const [isReady, setIsReady] = React.useState<boolean>(false);
	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		void initialize();
	}, []);

	const initialize = async () => {
		try {
			setIsReady(false);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const provider = new providers.Web3Provider(window.ethereum);
			const { url, token } = irysConfig();
			const webIrys = new WebIrys({ url, token, wallet: provider });
			await webIrys.ready();
			setWebIrys(webIrys);
			setIsReady(true);
			return webIrys;
		} catch (error) {
			setIsReady(false);
		}
	};

	const uploadFiles = async () => {
		try {
			setIsUploading(true);
		} catch (error) {
			setError(String(error));
			console.log(error);
		} finally {
			setIsUploading(false);
		}
	};

	return { webIrys, isReady, isUploading, error, uploadFiles, initialize };
};

export default useUploadToArweave;
