import React from 'react';

import { Steps } from 'antd';

import { useCreateSafeStore } from '~/stores';

const CreateFormStepper = () => {
	const { currentStep } = useCreateSafeStore();
	return (
		<Steps
			className='max-w-xs'
			current={currentStep}
			items={[{}, {}, {}, {}]}
			responsive={false}
		/>
	);
};

export default CreateFormStepper;
