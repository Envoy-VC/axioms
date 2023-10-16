import { Goerli, Mumbai, Polygon } from '@thirdweb-dev/chains';

import { env } from '~/env.mjs';

const { NEXT_PUBLIC_ENV: ENV } = env;

export const getDefaultChain = () => {
	if (ENV === 'production') return Polygon;
	else return Goerli;
};

export const getSafeApiServiceChain = () => {
	if (ENV === 'production') return 'polygon';
	else return 'goerli';
};

export const getArweaveUploadChain = () => {
	if (ENV === 'production') return Polygon;
	else return Mumbai;
};
