import {
	type AuthRequest,
	AuthType,
	type ClaimRequest,
} from '@sismo-core/sismo-connect-client';

import type { Config } from '~/helpers/sismo';

export const getSismoAuthClaims = (config: Config) => {
	const auths: AuthRequest[] = [];
	const claims: ClaimRequest[] = [];

	config.auth.forEach((auth) => {
		if (auth.authType === 'twitter') {
			auths.push({
				authType: AuthType.TWITTER,
			});
		} else if (auth.authType === 'github') {
			auths.push({
				authType: AuthType.GITHUB,
			});
		}
	});

	config.claims.forEach((claim) => {
		if (claim.name === 'passport') {
			claims.push({
				groupId: claim.groupId,
				value: Number(claim.value),
			});
		} else {
			claims.push({
				groupId: claim.groupId,
			});
		}
	});

	return { auths, claims };
};
