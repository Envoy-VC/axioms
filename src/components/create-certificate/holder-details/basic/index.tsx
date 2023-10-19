import React from 'react';

import { useCreateCertificateStore } from '~/stores';

import FormFooter from '../../form-footer';
import PageLayout from '../../layout';

const BasicHolderDetails = () => {
	const { prevStep, nextStep } = useCreateCertificateStore();

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
			basic
		</PageLayout>
	);
};

export default BasicHolderDetails;
