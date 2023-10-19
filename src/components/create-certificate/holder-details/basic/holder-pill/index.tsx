import React from 'react';

import { Image } from 'antd';

import type { BasicCertificateHolder } from '~/stores/create-certificate';

interface Props {
	data: BasicCertificateHolder;
}

const BasicCertificateHolderPill = ({ data }: Props) => {
	return (
		<div className='flex flex-col gap-2 p-3 md:flex-row'>
			<div className='flex w-full basis-1/2 flex-col'>
				{Object.entries(data).map((entry, index) => {
					const [key, value] = entry;
					if (typeof value === 'string')
						return (
							<div key={index} className='flex flex-row gap-2'>
								<div className='text-sm font-medium text-slate-700'>
									{key.slice(0, 1).toUpperCase() + key.slice(1)}:
								</div>
								<div className='text-sm text-slate-700'>{value}</div>
							</div>
						);
				})}
			</div>
			<div className='w-full basis-1/2'>
				<Image
					src={URL.createObjectURL(data.certificate!)}
					alt={data.certificate?.name}
					className='rounded-md'
				/>
			</div>
		</div>
	);
};

export default BasicCertificateHolderPill;
