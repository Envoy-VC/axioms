import React from 'react';
import type { ReactElement } from 'react';

import { useWallet } from '@thirdweb-dev/react';

import { Layout } from '~/components';
import { EventDetails } from '~/components/create-certificate';
import { ConnectOrganizationWallet } from '~/components/screens';
import { useCreateCertificateStore } from '~/stores';

import type { NextPageWithLayout } from '../../_app';

const CreateCertification: NextPageWithLayout = () => {
	const { currentStep } = useCreateCertificateStore();
	const walletInstance = useWallet();

	switch (currentStep) {
		case 1:
			return <EventDetails />;
	}

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
