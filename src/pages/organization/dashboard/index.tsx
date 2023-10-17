import React from 'react';
import type { ReactElement } from 'react';

import { Layout } from '~/components';

import type { NextPageWithLayout } from '../../_app';

const Dashboard: NextPageWithLayout = () => {
	return <div>Dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Dashboard;
