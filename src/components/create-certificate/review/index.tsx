import React from 'react';

import { useWallet } from '@thirdweb-dev/react';

import { Button } from 'antd';

import { OrganizationLogin } from '~/components/login';
import { useCreateCertificateStore } from '~/stores';

import { TbCircleArrowDown, TbCircleArrowRight } from 'react-icons/tb';

import PageLayout from '../layout';
import PreviewCertificateDetails from '../preview-details';

const ReviewCreateCertificate = () => {
	const {
		prevStep,
		arweaveTxId,
		contractAddress,
		setContractAddress,
		setArweaveTxId,
	} = useCreateCertificateStore();
	const walletInstance = useWallet();
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
					>
						Upload Certificates to Arweave
					</Button>
					<TbCircleArrowRight className='hidden text-3xl text-gray-400 sm:flex' />
					<TbCircleArrowDown className='flex text-3xl text-gray-400 sm:hidden' />
					<Button
						type='primary'
						className='w-full bg-secondary sm:w-1/3'
						size='large'
						disabled={arweaveTxId === '' || walletInstance?.walletId !== 'safe'}
					>
						Create Certificate Contract
					</Button>
					<TbCircleArrowRight className='hidden !text-3xl text-gray-400 sm:flex' />
					<TbCircleArrowDown className='flex text-3xl text-gray-400 sm:hidden' />
					<Button
						type='primary'
						className='w-full bg-secondary sm:w-1/3'
						size='large'
						disabled={contractAddress === '' || arweaveTxId === ''}
					>
						Publish Certificate
					</Button>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='text-3xl font-medium text-slate-700'>
						Connected Wallets
					</div>
				</div>
				<OrganizationLogin />
			</div>
		</PageLayout>
	);
};

export default ReviewCreateCertificate;
