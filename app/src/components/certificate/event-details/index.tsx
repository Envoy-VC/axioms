import React from 'react';

import type { Metadata } from '~/helpers/arweave';

interface Props {
	data: Metadata;
}

const EventDetails = ({ data }: Props) => {
	return (
		<div className='m-4 rounded-lg bg-gray-100 p-4'>
			<div className='flex flex-col justify-between gap-4 md:flex-row'>
				<div className='flex flex-col gap-4'>
					<div className='text-3xl font-medium text-slate-700'>{data.eventName}</div>
					<div className='max-w-xl text-sm font-medium text-slate-700 sm:text-[1rem]'>
						{data.eventDescription}
					</div>
					<div className='text-sm font-medium text-slate-700 sm:text-xl'>
						Event type:{' '}
						<span className='text-secondary'>{data.eventType.toUpperCase()}</span>
					</div>
				</div>
				<div className='flex flex-col gap-2 md:items-end'>
					<div className='font-medium text-slate-700 sm:text-xl'>
						Certification type:{' '}
						<span className='text-secondary'>
							{data.type === 'poap' && 'Proof of Attendance/Participation'}
						</span>
					</div>
					<div className='font-medium text-slate-700 sm:text-xl'>
						Total Holders:{' '}
						<span className='text-secondary'>{data.holders.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
