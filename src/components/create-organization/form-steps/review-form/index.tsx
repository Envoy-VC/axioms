import React from 'react';

import { Button, Popconfirm } from 'antd';

import { Spinner } from '~/components/common';
import { useCreateSafe } from '~/hooks';
import { useCreateSafeStore } from '~/stores';

import { TbCircle4Filled } from 'react-icons/tb';

import OwnerPill from '../owner-details/owner-pill';

const OwnerDetailsStep = () => {
	const { name, owners, threshold, setCurrentStep, resetForm } =
		useCreateSafeStore();
	const { mutateAsync, isLoading, error } = useCreateSafe();
	const onBack = () => {
		setCurrentStep(2);
	};
	const confirm = async (_e: React.MouseEvent<HTMLElement> | undefined) => {
		await mutateAsync({ owners: owners, threshold: threshold }).catch((error) => {
			console.log(error);
		});
		if (error) return;
		resetForm();
		setCurrentStep(0);
	};

	const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
		console.log(e);
	};

	return (
		<div className='walletCardShadow mt-4 flex flex-col gap-8 rounded-xl bg-[rgba(249,250,251,0.5)] p-4'>
			<div className='flex flex-row items-center gap-2'>
				<TbCircle4Filled className='text-3xl text-secondary' />
				<span className='text-xl font-semibold text-secondary'>Review Account</span>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='text-lg font-medium text-slate-700'>
					Name for the Safe:{' '}
					<span className='font-semibold text-slate-900'>{name}</span>
				</div>
				<div className='flex flex-col'>
					<div className='mb-2 text-lg font-medium text-slate-700'>Owners</div>
					{owners.map((owner, index) => (
						<OwnerPill address={owner} key={index} showDeleteButton={false} />
					))}
				</div>
				<div className='text-lg font-medium text-slate-700'>
					Threshold:{' '}
					<span className='font-semibold text-slate-900'>{threshold}</span> out of{' '}
					{owners.length} owner(s)
				</div>
			</div>

			<div className='flex w-full justify-end gap-2'>
				<Button size='large' onClick={onBack} disabled={isLoading}>
					Back
				</Button>
				<Popconfirm
					title='Create Safe'
					description='Are you sure to create a safe?'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onConfirm={confirm}
					onCancel={cancel}
					okText='Yes'
					cancelText='No'
					okButtonProps={{ className: 'bg-secondary' }}
				>
					<Button
						className='flex items-center justify-center bg-secondary'
						type='primary'
						size='large'
						disabled={isLoading}
					>
						{isLoading ? <Spinner color='white' size='default' /> : 'Create'}
					</Button>
				</Popconfirm>
			</div>
		</div>
	);
};

export default OwnerDetailsStep;
