import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useWallet } from '@thirdweb-dev/react';

import { Button, message } from 'antd';

import { Spinner } from '~/components/common';
import { useDeployContract, useUploadToArweave } from '~/hooks';
import { useCreateCertificateStore } from '~/stores';

import { TbCircleArrowDown, TbCircleArrowRight } from 'react-icons/tb';

import PageLayout from '../layout';
import PreviewCertificateDetails from '../preview-details';

const ReviewCreateCertificate = () => {
	const router = useRouter();
	const { prevStep, arweaveManifestId, resetForm } = useCreateCertificateStore();
	const walletInstance = useWallet();
	const { uploadFiles, isUploading } = useUploadToArweave();
	const { deployContract, isDeploying, error } = useDeployContract();

	React.useEffect(() => {
		if (error) {
			void message.error('User Rejected Transaction');
		}
	}, [error]);

	const onClickDashboard = () => {
		router
			.push('/')
			.then(() => resetForm())
			.catch((error) => console.error(error));
	};

	return (
		<PageLayout title='Review your Certificate' footer=''>
			<div className='flex flex-col gap-4'>
				<PreviewCertificateDetails />
			</div>
			<div className='flex flex-row'>
				<Button onClick={prevStep} className=''>
					Back
				</Button>
			</div>
			<div className='my-8 flex flex-col gap-8'>
				<div className='flex flex-col gap-2'>
					<div className='text-3xl font-medium text-slate-700'>
						Publish Certificate
					</div>
				</div>
				<div className='flex flex-col items-center gap-2 sm:flex-row sm:gap-8'>
					<Button
						type='primary'
						className='w-full bg-secondary sm:w-1/3'
						size='large'
						disabled={arweaveManifestId !== '' || isUploading}
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={() => uploadFiles().catch((err) => console.error(err))}
					>
						{isUploading ? (
							<Spinner />
						) : arweaveManifestId === '' ? (
							'Upload Certificates to Arweave'
						) : (
							'Uploaded ✅'
						)}
					</Button>
					<TbCircleArrowRight className='hidden text-3xl text-gray-400 sm:flex' />
					<TbCircleArrowDown className='flex text-3xl text-gray-400 sm:hidden' />
					<Button
						type='primary'
						className='w-full bg-secondary sm:w-1/3'
						size='large'
						disabled={
							arweaveManifestId === '' ||
							walletInstance?.walletId !== 'safe' ||
							isDeploying
						}
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={() => deployContract().catch((err) => console.error(err))}
					>
						Propose Certificate Contract
					</Button>
					<TbCircleArrowRight className='hidden text-3xl text-gray-400 sm:flex' />
					<TbCircleArrowDown className='flex text-3xl text-gray-400 sm:hidden' />
					<Link href='https://app.safe.global/welcome' target='_blank'>
						<Button
							type='primary'
							className='w-full bg-secondary sm:w-1/3'
							size='large'
							disabled={
								arweaveManifestId === '' ||
								walletInstance?.walletId !== 'safe' ||
								!isDeploying
							}
							onClick={onClickDashboard}
						>
							Go to Safe Dashboard
						</Button>
					</Link>
				</div>
			</div>
		</PageLayout>
	);
};

export default ReviewCreateCertificate;
