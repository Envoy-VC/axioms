import React from 'react';
import type { ReactElement } from 'react';

import { useWallet } from '@thirdweb-dev/react';

import { Layout } from '~/components';
import { ConnectOrganizationWallet } from '~/components/screens';

import type { NextPageWithLayout } from '../../_app';

const CreateCertification: NextPageWithLayout = () => {
	const walletInstance = useWallet();
	if (walletInstance?.walletId !== 'safe') {
		return <ConnectOrganizationWallet />;
	} else {
		return <div>Dashboard</div>;
	}
};

CreateCertification.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CreateCertification;
