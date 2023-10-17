import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Button, Input, Modal } from 'antd';

import { useEditNameModal } from '~/stores';
import type { SafeAccount } from '~/types';

interface Props {
	safeAddress: string;
}

const EditNameModal = ({ safeAddress }: Props) => {
	const { isOpen, close } = useEditNameModal();
	const [name, setName] = React.useState<string>('');
	const [safeAccounts, setSafeAccounts] = useLocalStorage<SafeAccount[]>(
		'safeAccounts',
		[]
	);

	const onSave = () => {
		try {
			const safeAccount = safeAccounts.find(
				(account: SafeAccount) => account.address === safeAddress
			);
			if (safeAccount) {
				safeAccount.name = name;
				setSafeAccounts([...safeAccounts]);
			} else {
				setSafeAccounts([...safeAccounts, { name, address: safeAddress }]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setName('');
			close();
		}
	};
	return (
		<Modal
			title='Edit Account Name'
			open={isOpen}
			onCancel={close}
			footer={
				<div className='mt-6 flex w-full flex-row items-center justify-end gap-2'>
					<Button onClick={close} type='text' size='middle' className=' font-medium'>
						Cancel
					</Button>
					<Button
						type='primary'
						size='middle'
						className='bg-secondary font-medium'
						onClick={onSave}
					>
						Save
					</Button>
				</div>
			}
		>
			<Input
				size='large'
				placeholder='Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</Modal>
	);
};

export default EditNameModal;
