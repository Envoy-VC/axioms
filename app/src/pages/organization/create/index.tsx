import clsx from 'clsx';
import React from 'react';
import type { ReactElement } from 'react';

import { Layout } from '~/components';
import {
	CreateFormStepper,
	CreateOrganizationForm,
} from '~/components/create-organization';
import { inter } from '~/components/layout';

import type { NextPageWithLayout } from '../../_app';

const Create: NextPageWithLayout = () => {
	return (
		<div className='mx-auto mt-24 flex max-w-screen-lg flex-col gap-4 p-4'>
			<div className='flex w-full flex-col items-center justify-between gap-8 sm:flex-row sm:items-start '>
				<div
					className={clsx(
						'order-2 text-2xl font-semibold text-slate-700 sm:order-1',
						inter.className
					)}
				>
					Create a new Safe Account
				</div>
				<div className='order-1 sm:order-2'>
					<CreateFormStepper />
				</div>
			</div>

			<CreateOrganizationForm />
		</div>
	);
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
