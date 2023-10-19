import Papa from 'papaparse';
import React from 'react';

import { Button, Upload, message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useCreateCertificateStore } from '~/stores';
import type { POAPHolder } from '~/stores/create-certificate';

import { TbCertificate } from 'react-icons/tb';

import FormFooter from '../../form-footer';
import PageLayout from '../../layout';

const POAPHolderDetails = () => {
	const { prevStep, nextStep, setCertificateHolders } =
		useCreateCertificateStore();
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
	const [csvFiles, setCsvFiles] = React.useState<UploadFile[]>([]);

	const [holders, setHolders] = React.useState<POAPHolder[]>([]);

	const createPreviewUrl = (file: File | Blob) => {
		return new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.addEventListener('load', () => resolve(reader.result as string));
			reader.readAsDataURL(file);
		});
	};

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
		async previewFile(file) {
			const url = await createPreviewUrl(file);
			return url;
		},
		fileList,
		listType: 'picture',
		multiple: false,
		accept: 'image/*',
	};

	const csvProps: UploadProps = {
		onRemove: (file) => {
			const index = csvFiles.indexOf(file);
			const newFileList = csvFiles.slice();
			newFileList.splice(index, 1);
			setCsvFiles(newFileList);
		},
		beforeUpload: (file) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			Papa.parse(file as File, {
				header: true,
				complete: function (results) {
					console.log(results);
				},
			});
			return false;
		},
		fileList: csvFiles,
		listType: 'text',
		multiple: false,
		accept: 'text/csv',
	};

	const onPrev = () => {
		prevStep();
	};

	const onNext = () => {
		setCertificateHolders({ certificate: fileList[0] as RcFile, holders: [] });
		nextStep();
	};

	return (
		<PageLayout
			image='https://cdni.iconscout.com/illustration/premium/thumb/time-is-money-concept-3488554-2922414.png'
			imageAlt='Certificate Holders'
			title='Add Certificate Holders for your Event'
			footer={<FormFooter onNext={onNext} onPrev={onPrev} />}
		>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					<div className='text-lg font-medium text-slate-700'>
						Upload your Certificate Image
					</div>
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
				<div className='flex flex-col gap-4'>
					<div className='text-lg font-medium text-slate-700'>
						Add Holder Details
					</div>
					<div className='flex w-full flex-col gap-0'>
						<Upload {...csvProps} prefixCls='w-full'>
							<Button className='w-full'>Upload CSV File</Button>
						</Upload>
						<div className='text-center text-gray-400'>or</div>
						<Button type='primary' className='bg-secondary'>
							Add Data manually
						</Button>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default POAPHolderDetails;
