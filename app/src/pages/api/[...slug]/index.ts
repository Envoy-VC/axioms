/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { slug } = req.query;
	if (slug?.length !== 2)
		return res
			.status(400)
			.json({ message: 'Manifest Id and Address is Required' });

	const [manifestId, address] = slug;

	const { eventName, eventDescription, eventType, holders, type } = await fetch(
		`https://gateway.irys.xyz/${manifestId}/metadata.json`
	)
		.then((res) => res.json() as any)
		.catch((err) => console.log(err));

	const imageFile = await fetch(`https://gateway.irys.xyz/${manifestId}`)
		.then((res) => res.json() as any)
		.then((res) =>
			Object.keys(res.paths as string[])
				.filter((path) => !path.endsWith('.json'))
				.at(0)
		)
		.catch((err) => console.log(err));

	const holder = (holders as any[]).find(
		(holder) => holder.address.toLowerCase() === address?.toLowerCase()
	);
	delete holder.address;

	const openSeaAttributes = Object.entries(holder).map(([key, value], index) => {
		return {
			trait_type: key,
			value,
		};
	});

	const metadata = {
		name: eventName,
		description: eventDescription,
		image: `https://gateway.irys.xyz/${manifestId}/${imageFile ?? ''}`,
		attributes: openSeaAttributes,
	};

	res.status(200).json(metadata);
}
