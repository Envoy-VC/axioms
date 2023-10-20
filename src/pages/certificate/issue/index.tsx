import React from 'react';
import type { ReactElement } from 'react';

import { useWallet } from '@thirdweb-dev/react';

import { Form } from 'antd';

import { Layout } from '~/components';
import {
	BasicHolderDetails,
	EventDetails,
	POAPHolderDetails,
	VerificationDetails,
} from '~/components/create-certificate';
import { ConnectOrganizationWallet } from '~/components/screens';
import { useCreateCertificateStore } from '~/stores';

import type { NextPageWithLayout } from '../../_app';

const CreateCertification: NextPageWithLayout = () => {
	const { currentStep, type } = useCreateCertificateStore();
	const walletInstance = useWallet();

	return (
		<Form.Provider>
			{currentStep === 1 && <EventDetails />}
			{currentStep === 2 && type === 'basic' && <BasicHolderDetails />}
			{currentStep === 2 && type === 'poap' && <POAPHolderDetails />}
			{currentStep === 3 && <VerificationDetails />}
		</Form.Provider>
	);

	// if (walletInstance?.walletId !== 'safe') {
	// 	return <ConnectOrganizationWallet />;
	// } else {
	// 	return <div>Dashboard</div>;
	// }
};

CreateCertification.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CreateCertification;
