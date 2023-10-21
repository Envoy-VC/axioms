/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Holder } from '~/stores/create-certificate';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log('here');
	console.log(req.body);
	const { manifestId, address } = JSON.parse(req.body);

	console.log(manifestId, address);

	const response = await fetch(
		`https://gateway.irys.xyz/${manifestId}/metadata.json`
	)
		.then((res) => res.json() as any)
		.catch((err) => console.log(err));

	const { holders } = response;

	const addressArray = (holders as Holder[]).map(
		(holder) => holder.address
	) as string[];

	if (!addressArray.includes(address))
		return res.status(400).json({ message: 'Address not found in manifest' });

	const buf2hex = (x: any) => '0x' + x.toString('hex');
	const leaves = addressArray.map((x) => keccak256(x));
	const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

	const leaf = keccak256(address).toString('hex');
	const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));

	res.status(200).json({
		proof: proof,
	});
}
