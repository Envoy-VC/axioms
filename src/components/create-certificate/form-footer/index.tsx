/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Button } from 'antd';

import { useCreateCertificateStore } from '~/stores';

import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';

interface Props {
	onNext?: (...props: any[]) => void;
	onPrev?: (...props: any[]) => void;
}

const FormFooter = ({ onNext = () => true, onPrev = () => true }: Props) => {
	const { currentStep } = useCreateCertificateStore();
	return (
		<div className='flex w-full flex-row items-center justify-between my-16'>
			{currentStep !== 1 && (
				<Button
					className='flex items-center justify-center gap-2'
					type='text'
					onClick={onPrev}
				>
					<TbArrowLeft className='mt-1 text-[1.15rem] text-slate-600' />
					<div className='text-[1rem] font-medium text-slate-600'>Back</div>
				</Button>
			)}
			{currentStep === 1 && <div></div>}
			<Button
				className='flex items-center justify-center gap-2 bg-secondary'
				type='primary'
				onClick={onNext}
			>
				<div className='text-[1rem] font-medium text-white'>Next</div>
				<TbArrowRight className='mt-1 text-[1.15rem] text-white' />
			</Button>
		</div>
	);
};

export default FormFooter;
