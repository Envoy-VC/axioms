import React from 'react';

import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

import { data } from '~/helpers/sismo';
import { useCreateCertificateStore } from '~/stores';

const PreviewCertificateDetails = () => {
	const {
		type,
		eventName,
		eventDescription,
		eventType,
		holders,
		verificationConfig,
	} = useCreateCertificateStore();
	const items: DescriptionsProps['items'] = [
		{
			key: 'type',
			label: 'Certificate Type',
			children:
				type === 'poap'
					? 'POAP - Attendance/Participation Certificates'
					: 'General - Unique Certificates',
		},
		{
			key: 'eventName',
			label: 'Event Name',
			children: eventName,
		},
		{
			key: 'eventDescription',
			label: 'Event Description',
			children: <p className='whitespace-pre-line'>{eventDescription}</p>,
		},
		{
			key: 'eventType',
			label: 'Event Type',
			children: eventType.toLocaleUpperCase(),
		},
		{
			key: 'holders',
			label: 'Holders',
			className: 'sm:min-w-[500px]',
			children: (
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col'>
						{holders.slice(0, 6).map((holder, index) => {
							return <div key={index}>{holder.address}</div>;
						})}
					</div>
					{holders.length >= 6 && (
						<div className='flex flex-row gap-2'>
							<div className='text-[1rem] text-slate-700'>
								and{' '}
								<span className='font-medium text-secondary'>{holders.length - 6}</span>{' '}
								more
							</div>
						</div>
					)}
				</div>
			),
		},
		{
			key: 'verificationConfig',
			label: 'Verification Details',
			children: (
				<div className='flex flex-col gap-1'>
					{verificationConfig.auth.map((auth) => {
						return data.find((d) => d.key === auth.authType)?.name;
					})}
					{verificationConfig.claims.map((claim) => {
						return data.find((d) => d.key === claim.name)?.name;
					})}
				</div>
			),
		},
	];
	return <Descriptions bordered items={items} layout='vertical' />;
};

export default PreviewCertificateDetails;
