import React from 'react';
import type { ReactElement } from 'react';

import { Layout } from '~/components';

import type { NextPageWithLayout } from '../../_app';

const Create: NextPageWithLayout = () => {
	return <div>Create</div>;
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
