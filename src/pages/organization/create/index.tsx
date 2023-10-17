import React from 'react';
import type { ReactElement } from 'react';

import { Button } from 'antd';

import { Layout } from '~/components';
import { useCreateSafe } from '~/hooks';

import type { NextPageWithLayout } from '../../_app';

const Create: NextPageWithLayout = () => {
	const { mutateAsync, isLoading, error } = useCreateSafe();
	return (
		<div>
			<Button
				type='primary'
				className='bg-secondary'
				size='large'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={() =>
					mutateAsync({
						owners: ['0xe269688F24e1C7487f649fC3dCD99A4Bf15bDaA1'],
						threshold: 1,
					})
						.catch((error) => {
							console.log(error);
						})
						.then((result) => {
							console.log(result);
						})
				}
			>
				Create
			</Button>
		</div>
	);
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
