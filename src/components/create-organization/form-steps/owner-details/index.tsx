import React from 'react';

import { Button, Input, Select, Space } from 'antd';

import { useCreateSafeStore } from '~/stores';

import { TbCircle3Filled, TbPlus } from 'react-icons/tb';

import OwnerPill from './owner-pill';

const OwnerDetailsStep = () => {
	const { owners, threshold, setOwners, setThreshold, setCurrentStep } =
		useCreateSafeStore();
	const [owner, setOwner] = React.useState<string>('');
	const addOwner = (address: string) => {
		if (address === '') return;
		if (owners.includes(address)) return;
		setOwners([...owners, address]);
		setOwner('');
	};
	const onBack = () => {
		setCurrentStep(1);
	};
	const onNext = () => {
		setCurrentStep(3);
	};
	return (
		<div className='walletCardShadow mt-4 flex flex-col gap-8 rounded-xl bg-[rgba(249,250,251,0.5)] p-4'>
			<div className='flex flex-row items-center gap-2'>
				<TbCircle3Filled className='text-3xl text-secondary' />
				<span className='text-xl font-semibold text-secondary'>
					Owner Details and Threshold
				</span>
			</div>
			<div className='my-4 flex flex-col gap-2'>
				<div className='text-lg font-medium text-slate-700'>
					Set owner wallets of your Safe Account
				</div>
				<Space.Compact className='max-w-lg'>
					<Input
						size='large'
						placeholder='0xBF4...03d3e1'
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
					/>
					<Button
						type='primary'
						className='flex flex-row items-center gap-2 bg-secondary'
						size='large'
						onClick={() => addOwner(owner)}
					>
						<span className='text-[1rem]'>Add</span>
						<TbPlus size={21} className='text-white' />
					</Button>
				</Space.Compact>
				<div className='flex flex-col'>
					{owners.map((owner, index) => (
						<OwnerPill key={index} address={owner} />
					))}
				</div>
			</div>
			<div className='my-4 flex flex-col gap-2'>
				<div className='text-lg font-medium text-slate-700'>
					How many owners need to confirm to execute a valid transaction.
				</div>
				<div className='flex items-center gap-3'>
					<Select
						value={threshold}
						style={{ width: 64 }}
						onChange={(value) => setThreshold(Number(value))}
						options={[
							...owners.map((_, index) => ({
								label: index + 1,
								value: index + 1,
							})),
						]}
					/>
					<div className='text-[1rem] text-slate-700'>
						out of {owners.length} owner(s)
					</div>
				</div>
			</div>
			<div className='flex w-full justify-end gap-2'>
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

export default OwnerDetailsStep;
