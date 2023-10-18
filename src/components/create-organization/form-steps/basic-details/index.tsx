import React from 'react';

import { Button, Input, Tooltip } from 'antd';

import { useCreateSafeStore } from '~/stores';

import { TbCircle2Filled, TbInfoHexagon } from 'react-icons/tb';

const BasicDetailsStep = () => {
	const { name, setName, setCurrentStep } = useCreateSafeStore();
	const onBack = () => {
		setCurrentStep(0);
	};
	const onNext = () => {
		setCurrentStep(2);
	};
	return (
		<div className='walletCardShadow mt-4 flex flex-col gap-8 rounded-xl bg-[rgba(249,250,251,0.5)] p-4'>
			<div className='flex flex-row items-center gap-2'>
				<TbCircle2Filled className='text-3xl text-secondary' />
				<span className='text-xl font-semibold text-secondary'>Basic Details</span>
			</div>
			<div className='my-4 flex flex-col gap-2'>
				<div className='flex flex-row items-center gap-2'>
					<div className='text-lg font-medium text-slate-700'>
						Set a Name for your Safe Wallet
					</div>
					<Tooltip title='This name is stored locally and will never be shared.'>
						<TbInfoHexagon className='text-xl text-slate-700' />
					</Tooltip>
				</div>
				<Input
					size='large'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='flex w-full justify-end gap-3'>
				<Button size='large' onClick={onBack}>
					Back
				</Button>
				<Button
					className='bg-secondary'
					type='primary'
					size='large'
					onClick={onNext}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default BasicDetailsStep;
