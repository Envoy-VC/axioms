import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Dropdown } from 'antd';
import { Button } from 'antd';
import type { MenuProps } from 'antd';

import { useLocalAccountDetails } from '~/hooks';
import { useEditNameModal } from '~/stores';
import type { Account } from '~/types';

import { TbDotsVertical, TbEdit, TbTrash } from 'react-icons/tb';

interface DropdownItem {
	label: React.ReactNode;
	Icon: React.JSX.Element;
	handleClick?: () => void;
}

interface Props {
	address: string;
}

const EditAccountButton = ({ address }: Props) => {
	const { open } = useEditNameModal();
	const { remove } = useLocalAccountDetails({ address: address });

	const dropDownItems: DropdownItem[] = [
		{
			label: 'Edit',
			Icon: <TbEdit size={16} className='text-gray-600' />,
			handleClick: () => open(),
		},
		{
			label: 'Remove',
			Icon: <TbTrash size={16} className='text-red-600' />,
			handleClick: () => remove({ address: address }),
		},
	];
	const items: MenuProps['items'] = [
		...dropDownItems.map((item, index) => {
			const { label, Icon, handleClick } = item;
			return {
				key: index,
				label: (
					<div
						className='flex flex-row items-center gap-2 font-medium text-slate-700'
						onClick={handleClick}
					>
						{Icon} {label}
					</div>
				),
			};
		}),
	];
	return (
		<Dropdown menu={{ items }} trigger={['click']}>
			<Button icon={<TbDotsVertical size={22} />} type='text' />
		</Dropdown>
	);
};

export default EditAccountButton;
