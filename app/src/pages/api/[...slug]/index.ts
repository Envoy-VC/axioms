import type { NextApiRequest, NextApiResponse } from 'next';

import { getCertificateImage, getMetadata } from '~/helpers/arweave';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { slug } = req.query;
	if (!slug) throw new Error('ManifestId and Address are required');

	const [manifestId, address] = slug;

	if (!manifestId || !address)
		throw new Error('ManifestId and Address are required');

	const metadata = await getMetadata(manifestId);
	if (!metadata) throw new Error('Metadata not found');

	const { eventName, eventDescription, eventType, holders, type } = metadata;
	const imageFile = await getCertificateImage(manifestId);
	if (!imageFile) throw new Error('Image not found');

	// filter out all holders with undefined address
	const holdersWithAddress = holders.filter(
		(holder) => holder.address !== undefined
	);

	const holder = holdersWithAddress.find(
		(holder) => holder.address!.toLowerCase() === address?.toLowerCase()
	);

	if (!holder) throw new Error('Address not found in manifest');

	delete holder.address;

	const openSeaAttributes = Object.entries(holder).map(([key, value]) => {
		return {
			trait_type: key,
			value,
		};
	});

	openSeaAttributes.push(
		{
			trait_type: 'Event Type',
			value: eventType.toUpperCase(),
		},
		{
			trait_type: 'Event Name',
			value: eventName,
		},
		{
			trait_type: 'Certificate Type',
			value: type === 'poap' ? 'POAP' : 'Basic',
		}
	);

	const openSeaMetadata = {
		name: eventName,
		description: eventDescription,
		image: `https://gateway.irys.xyz/${manifestId}/${imageFile ?? ''}`,
		attributes: openSeaAttributes,
	};

	res.status(200).json(openSeaMetadata);
}
