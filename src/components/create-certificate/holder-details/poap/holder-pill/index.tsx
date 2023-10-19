import React from 'react';

import type { POAPHolder } from '~/stores/create-certificate';

interface Props {
	data: POAPHolder;
}

const POAPHolderPill = ({ data }: Props) => {
	return (
		<div className='p-3'>
			<div className='flex flex-col'>
				{Object.entries(data).map((entry, index) => {
					const [key, value] = entry;
					return (
						<div key={index} className='flex flex-row gap-2'>
							<div className='text-sm font-medium text-slate-700'>{key}:</div>
							<div className='text-sm text-slate-700'>{value}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default POAPHolderPill;
