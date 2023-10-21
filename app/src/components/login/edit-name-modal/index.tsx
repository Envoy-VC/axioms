import React from 'react';

import { Button, Input, Modal } from 'antd';

import { useLocalAccountDetails } from '~/hooks';
import { useEditNameModal } from '~/stores';

interface Props {
	address: string;
}

const EditNameModal = ({ address }: Props) => {
	const { isOpen, close } = useEditNameModal();
	const [name, setName] = React.useState<string>('');
	const { save } = useLocalAccountDetails({ address: address });

	return (
		<Modal
			title='Edit Account Name'
			open={isOpen}
			onCancel={close}
			destroyOnClose
			footer={
				<div className='mt-6 flex w-full flex-row items-center justify-end gap-2'>
					<Button onClick={close} type='text' size='middle' className=' font-medium'>
						Cancel
					</Button>
					<Button
						type='primary'
						size='middle'
						className='bg-secondary font-medium'
						onClick={() => {
							save({ name: name, address: address });
							close();
						}}
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
