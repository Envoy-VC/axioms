import React from 'react';

import { useAddress } from '@thirdweb-dev/react';

import { Avatar, Button } from 'antd';

import { useCreateSafeStore } from '~/stores';

import { TbTrash } from 'react-icons/tb';

interface Props {
	address: string;
}
const OwnerPill = ({ address }: Props) => {
	const connectedAddress = useAddress();
	const { setOwners, owners, setThreshold, threshold } = useCreateSafeStore();
	const onDelete = () => {
		const newOwners = owners.filter((addr) => addr !== address);
		if (threshold > newOwners.length) setThreshold(newOwners.length);
		setOwners(newOwners);
	};

	return (
		<div className='flex max-w-xl flex-row items-center justify-between gap-2 px-2 py-1'>
			<div className='flex items-center gap-2'>
				<Avatar
					alt='Owner Icon'
					src={`https://api.dicebear.com/7.x/shapes/svg?seed=${address}`}
					size={36}
				/>
				<span className='text-[1rem] font-medium text-slate-600'>{address}</span>
			</div>
			<Button
				type='text'
				icon={<TbTrash className='mt-1 text-[1rem] text-red-500' />}
				className='!px-0 !py-0'
				disabled={connectedAddress === address}
				onClick={onDelete}
			/>
		</div>
	);
};

export default OwnerPill;
