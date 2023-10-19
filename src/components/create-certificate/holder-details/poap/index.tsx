import Papa from 'papaparse';
import React from 'react';

import { Button, Collapse, Upload, message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useCreateCertificateStore } from '~/stores';
import type { POAPHolder } from '~/stores/create-certificate';
import type {
	BasicDetailsState,
	CertificateTransactionsState,
	POAPCertificateState,
} from '~/stores/create-certificate';

import { TbCertificate } from 'react-icons/tb';

import AddPOAPHolder from '../../add-poap-holder';
import FormFooter from '../../form-footer';
import PageLayout from '../../layout';
import POAPHolderPill from './holder-pill';

type POAPStoreState = BasicDetailsState &
	POAPCertificateState &
	CertificateTransactionsState;

const POAPHolderDetails = () => {
	const {
		prevStep,
		nextStep,
		setCertificateHolders,
		holders: certificateHolders,
	} = useCreateCertificateStore();
	const certificate = useCreateCertificateStore(
		(state) => (state as POAPStoreState).certificate
	);
	const [fileList, setFileList] = React.useState<UploadFile[]>(
		certificate ? [certificate] : []
	);
	const [csvFiles, setCsvFiles] = React.useState<UploadFile[]>([]);

	const [holders, setHolders] = React.useState<POAPHolder[]>(certificateHolders);

	const [showCount, setShowCount] = React.useState<number>(4);

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
			// setHolders([]);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			Papa.parse(file as File, {
				worker: true,
				header: true,
				step: function (row) {
					const data = row.data as POAPHolder;
					if (!!data && data.address) {
						setHolders((prev) => [...prev, data ?? {}]);
					}
				},
				complete: function () {
					setHolders((prev) => Array.from(new Set(prev)));
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
		setCertificateHolders({
			certificate: fileList[0] as RcFile,
			holders: holders,
		});
		prevStep();
	};

	const onNext = () => {
		setCertificateHolders({
			certificate: fileList[0] as RcFile,
			holders: holders,
		});
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
						<AddPOAPHolder setHolders={setHolders} />
					</div>
					<Collapse
						items={[
							...holders.slice(0, showCount).map((holder, index) => {
								return {
									key: index,
									label: holder.address,
									children: <POAPHolderPill data={holder} key={index} />,
								};
							}),
						]}
						accordion
						size='small'
					/>
					{holders.length >= showCount && (
						<div className='flex flex-row gap-2'>
							<div className='text-[1rem] text-slate-700'>
								and{' '}
								<span className='font-medium text-secondary'>
									{holders.length - showCount}
								</span>{' '}
								more
							</div>
							<Button
								className='bg-secondary'
								type='primary'
								size='small'
								disabled={showCount === holders.length}
								onClick={() => {
									const remaining = holders.length - showCount;
									if (remaining > 10) setShowCount((prev) => prev + 10);
									else setShowCount((prev) => prev + remaining);
								}}
							>
								Show more
							</Button>
							<Button
								className='bg-secondary'
								type='primary'
								size='small'
								disabled={showCount <= 6}
								onClick={() => {
									const remaining = holders.length - showCount;
									if (remaining > 10) setShowCount((prev) => prev - 10);
									else setShowCount((prev) => prev - 10 + 4);
								}}
							>
								Show Less
							</Button>
						</div>
					)}
				</div>
			</div>
		</PageLayout>
	);
};

export default POAPHolderDetails;
