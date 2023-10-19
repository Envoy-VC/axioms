import React from 'react';

import { Button, Input, Upload, message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import type { BasicCertificateHolder } from '~/stores/create-certificate';

import { TbCertificate, TbTrash } from 'react-icons/tb';

interface Props {
	setHolders: React.Dispatch<React.SetStateAction<BasicCertificateHolder[]>>;
}

const AddBasicHolder = ({ setHolders }: Props) => {
	const [entries, setEntries] = React.useState<BasicCertificateHolder>({});
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);

	const [key, setKey] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: async (file) => {
			const isImage = file.type.includes('image/');
			if (!isImage) {
				await message.error(`${file.name} is not a png file`);
			} else {
				setFileList([file]);
			}

			return false;
		},

		fileList,
		listType: 'picture',
		multiple: false,
		accept: 'image/*',
	};

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
		const newEntries = entries;
		newEntries.certificate = fileList[0] as RcFile;
		setHolders((prev) => [...prev, newEntries]);
		setFileList([]);
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
					if (typeof value === 'string')
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
			<div className='my-4'>
				<Upload.Dragger {...props}>
					<p className='my-4 flex justify-center'>
						<TbCertificate className='text-4xl text-primary' />
					</p>
					<p className='ant-upload-text'>Click or drag file to this area</p>
					<p className='ant-upload-hint'>
						Only Image files are supported at this moment.
					</p>
				</Upload.Dragger>
			</div>
			<div className='flex w-full justify-end'>
				<Button type='primary' className='bg-secondary' onClick={onSave}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default AddBasicHolder;
