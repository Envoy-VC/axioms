import React from 'react';

import { Button } from 'antd';

import { useCreateSafeStore } from '~/stores';

import { TbCircle2Filled } from 'react-icons/tb';

const OwnerDetailsStep = () => {
	const { owners, threshold, setOwners, setThreshold, setCurrentStep } =
		useCreateSafeStore();
	return (
		<div className='walletCardShadow mt-4 flex flex-col gap-8 rounded-xl bg-[rgba(249,250,251,0.5)] p-4'>
			<div className='flex flex-row items-center gap-2'>
				<TbCircle2Filled className='text-3xl text-secondary' />
				<span className='text-xl font-semibold text-secondary'>
					Owner Details and Threshold
				</span>
			</div>

			<div className='flex w-full justify-end'>
				<Button className='bg-secondary' type='primary' size='large'>
					Next
				</Button>
			</div>
		</div>
	);
};

export default OwnerDetailsStep;
