import React from 'react';

import { useAddress } from '@thirdweb-dev/react';

import { useCreateSafeStore } from '~/stores';

import {
	BasicDetailsStep,
	ConnectFormSteps,
	OwnerDetailsStep,
	ReviewStep,
} from '../form-steps';

const CreateOrganizationForm = () => {
	const { currentStep, setCurrentStep } = useCreateSafeStore();
	const address = useAddress();

	React.useEffect(() => {
		if (!address) {
			setCurrentStep(0);
		}
	}, [address]);

	switch (currentStep) {
		case 0:
			return <ConnectFormSteps />;
		case 1:
			return <BasicDetailsStep />;
		case 2:
			return <OwnerDetailsStep />;
		case 3:
			return <ReviewStep />;
	}
};

export default CreateOrganizationForm;
