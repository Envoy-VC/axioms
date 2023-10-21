import React from 'react';
import type { ReactElement } from 'react';

import { Layout } from '~/components';
import { NotFoundScreen } from '~/components/screens';

import type { NextPageWithLayout } from './_app';

const NotFound: NextPageWithLayout = () => {
	return <NotFoundScreen />;
};

NotFound.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default NotFound;
