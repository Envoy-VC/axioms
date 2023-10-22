import type { SismoConnectResponse } from '@sismo-core/sismo-connect-client';
import { SismoConnect } from '@sismo-core/sismo-connect-server';
// Types
import type { SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-server';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Config } from '~/helpers/sismo';
import { getSismoAuthClaims } from '~/helpers/sismo/buildConfig';

const sismoConnect = SismoConnect({
	config: {
		appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? '',
	},
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { response, config } = JSON.parse(req.body as string) as {
		response: SismoConnectResponse;
		config: Config;
	};

	const sismoConnectResponse = response;
	const { auths, claims } = getSismoAuthClaims(config);

	console.log(sismoConnectResponse);

	if (!sismoConnectResponse) return;

	try {
		// verify the sismo connect response that corresponds to the request
		const result: SismoConnectVerifiedResult = await sismoConnect.verify(
			sismoConnectResponse,
			{
				auths,
				claims,
				signature: { message: 'Verify personal Identity' },
			}
		);
		res.status(200).json({ result: result, success: true });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error(e);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).json(e?.message);
	}
}

export default handler;
