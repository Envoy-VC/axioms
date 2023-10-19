import React from 'react';

import { Button, Input } from 'antd';

import type { POAPHolder } from '~/stores/create-certificate';

import { TbTrash } from 'react-icons/tb';

interface Props {
	setHolders: React.Dispatch<React.SetStateAction<POAPHolder[]>>;
}

const AddPOAPHolder = ({ setHolders }: Props) => {
	const [entries, setEntries] = React.useState<POAPHolder>({});

	const [key, setKey] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');

	const onAdd = () => {
		setEntries((prev) => {
			const newEntries = prev;
			newEntries[key] = value;
			return newEntries;
		});
		setKey('');
		setValue('');
	};

	const onDelete = (key: string) => {
		const newEntries = { ...entries };
		delete newEntries[key];
		setEntries(newEntries);
	};

	const onSave = () => {
		setHolders((prev) => [...prev, entries]);
		setEntries({});
		setKey('');
		setValue('');
	};

	return (
		<div className='rounded-md border-[1px] border-gray-200 p-2'>
			<div className='text-[1rem] font-medium text-slate-700'>
				Add Data manually
			</div>
			<div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
				<Input
					className='w-full max-w-[200px]'
					placeholder='Key'
					value={key}
					onChange={(e) => setKey(e.target.value)}
				/>
				<Input
					className='w-full max-w-xs'
					placeholder='Value'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button onClick={onAdd}>Add</Button>
			</div>
			<div className='my-4 flex flex-col'>
				{Object.entries(entries).map((entry, index) => {
					const [key, value] = entry;
					return (
						<div
							key={index}
							className='flex flex-row justify-between gap-2 border-b-[1px] border-gray-100'
						>
							<div className='flex flex-row gap-2'>
								<div className='text-sm font-medium text-slate-700'>
									{key.slice(0, 1).toUpperCase() + key.slice(1)}:
								</div>
								<div className='text-sm text-slate-700'>{value}</div>
							</div>
							<Button
								onClick={() => onDelete(key)}
								icon={<TbTrash className='text-red-400' />}
								type='text'
								size='small'
							/>
						</div>
					);
				})}
			</div>
			<div className='flex w-full justify-end'>
				<Button type='primary' className='bg-secondary' onClick={onSave}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default AddPOAPHolder;
