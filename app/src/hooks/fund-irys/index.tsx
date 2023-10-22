import { WebIrys } from '@irys/sdk';
import { providers } from 'ethers';

import { env } from '~/env.mjs';

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

const useFundIrys = () => {
	const initialize = async () => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			await window.ethereum.enable();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const provider = new providers.Web3Provider(window.ethereum);
			const wallet = { name: 'ethersv5', provider: provider };
			const { url, token } = irysConfig();
			const webIrys = new WebIrys({ url, token, wallet });
			console.log(webIrys);
			await webIrys.ready();
			return webIrys;
		} catch (error) {
			console.log(error);
		}
	};

	const fundNode = async () => {
		const webIrys = await initialize();
		if (!webIrys) return;
		try {
			const fundTx = await webIrys.fund(webIrys.utils.toAtomic(0.5));
		} catch (e) {
			console.log('Error uploading data ', e);
		}
	};
	return { fundNode };
};

export default useFundIrys;
