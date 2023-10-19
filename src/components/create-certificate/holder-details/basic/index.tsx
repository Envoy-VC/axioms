import Papa from 'papaparse';
import React from 'react';

import { Button, Collapse, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useCreateCertificateStore } from '~/stores';
import type { BasicCertificateHolder } from '~/stores/create-certificate';

import AddBasicHolder from '../../add-basic-holder';
import FormFooter from '../../form-footer';
import PageLayout from '../../layout';
import BasicCertificateHolderPill from './holder-pill';

const BasicHolderDetails = () => {
	const {
		prevStep,
		nextStep,
		setCertificateHolders,
		holders: certificateHolders,
	} = useCreateCertificateStore();

	const [csvFiles, setCsvFiles] = React.useState<UploadFile[]>([]);

	const [holders, setHolders] =
		React.useState<BasicCertificateHolder[]>(certificateHolders);

	const [showCount, setShowCount] = React.useState<number>(4);

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
					const data = row.data as BasicCertificateHolder;
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
		prevStep();
	};

	const onNext = () => {
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
						Add Holder Details
					</div>
					<div className='flex w-full flex-col gap-0'>
						<Upload {...csvProps} prefixCls='w-full'>
							<Button className='w-full'>Upload CSV File</Button>
						</Upload>
						<div className='text-center text-gray-400'>or</div>
						<AddBasicHolder setHolders={setHolders} />
					</div>
					<Collapse
						items={[
							...holders.slice(0, showCount).map((holder, index) => {
								return {
									key: index,
									label: holder.address,
									children: <BasicCertificateHolderPill data={holder} />,
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

export default BasicHolderDetails;
