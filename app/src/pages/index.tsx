import type { ReactElement } from 'react';

import { Button } from 'antd';

import { Layout } from '~/components';
import { useFundIrys } from '~/hooks';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	const { fundNode } = useFundIrys();
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	return <Button onClick={fundNode}>Fund Node</Button>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
