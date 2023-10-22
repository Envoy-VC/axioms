import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Image } from 'antd';

import { env } from '~/env.mjs';
import type { OpenSeaMetadata } from '~/hooks/certificate-details';

import {
	TbCards,
	TbCurrencyEthereum,
	TbExternalLink,
	TbFileDescription,
} from 'react-icons/tb';

import ClaimCertification from '../claim-certification';

interface Props {
	data: OpenSeaMetadata;
}

const CertificateNFTDetails = ({ data }: Props) => {
	const router = useRouter();
	const { address } = router.query;

	const openSeaLink =
		env.NEXT_PUBLIC_ENV === 'development'
			? `https://testnets.opensea.io/assets/goerli/${address as string}`
			: `https://opensea.io/assets/polygon/${address as string}`;
	const { name, description, image, attributes } = data;
	return (
		<div className='flex flex-col lg:flex-row pb-16'>
			<div className='w-full basis-2/5'>
				<div className='flex flex-col px-4'>
					<div className='flex flex-row justify-between gap-2 rounded-t-2xl border-2 border-b-[0px] p-1 py-2'>
						<TbCurrencyEthereum size={22} className='text-slate-700' />
						<Link href={openSeaLink} target='_blank'>
							<TbExternalLink size={22} className='text-slate-700' />
						</Link>
					</div>
					<Image
						src={image}
						alt={name}
						preview={false}
						className='aspect-[1/1] rounded-b-xl border-2'
					/>
				</div>
			</div>
			<div className='mx-4 w-full basis-3/5'>
				<div className='flex flex-col gap-2 text-slate-700'>
					<div className='mb-8 text-3xl font-semibold'>{name}</div>
					<div className='flex flex-row items-center gap-2'>
						<TbFileDescription size={22} className='text-slate-600' />
						<div className='text-2xl font-medium'>Description</div>
					</div>
					<p className='whitespace-pre-line text-lg'>{description}</p>
				</div>
				<div className='walletCardShadow my-4 flex flex-col gap-4 rounded-lg bg-[#FDFDFD] p-2'>
					<div className='flex flex-row items-center gap-2'>
						<TbCards size={22} className='text-slate-700' />
						<div className='text-xl font-medium text-slate-600'>Traits</div>
					</div>
					<div className='flex flex-row flex-wrap gap-3'>
						{attributes.map((attribute, index) => (
							<div
								key={index}
								className='flex w-full max-w-xs flex-col items-center justify-center rounded-xl bg-[#F4F4F4] p-3 px-6'
							>
								<div className='text-sm font-semibold text-gray-500'>
									{attribute.trait_type.toUpperCase()}
								</div>
								<div className='text-[1rem] font-medium text-slate-600'>
									{attribute.value}
								</div>
							</div>
						))}
					</div>
				</div>
				<ClaimCertification contractAddress={address as string} />
			</div>
		</div>
	);
};

export default CertificateNFTDetails;
