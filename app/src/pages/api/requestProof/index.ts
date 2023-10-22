import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getMetadata } from '~/helpers/arweave';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { manifestId, address } = JSON.parse(req.body as string) as {
		manifestId: string;
		address: string;
	};

	console.log(manifestId, address);

	const metadata = await getMetadata(manifestId);
	if (!metadata) throw new Error('Metadata not found');

	const { holders } = metadata;

	const addressArray = holders.map((holder) => holder.address) as string[];

	if (!addressArray.includes(address))
		return res.status(400).json({ message: 'Address not found in manifest' });

	const buf2hex = (x: Buffer) => '0x' + x.toString('hex');
	const leaves = addressArray.map((x) => keccak256(x));
	const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

	const leaf = keccak256(address).toString('hex');
	const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));

	res.status(200).json({
		proof: proof,
	});
}
