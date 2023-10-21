import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import React from 'react';
import type { ReactElement } from 'react';

import { Button } from 'antd';

import { Layout } from '~/components';

import type { NextPageWithLayout } from '../../_app';

const CertificatePage: NextPageWithLayout = () => {
	const onFetch = async () => {
		const res = await fetch(
			'/api/DIKO1fJ5yLSSH0DdzLO3VBiZhMZ2KiOZuo88nYeJ11A/0xBF4979305B43B0eB5Bb6a5C67ffB89408803d3e1'
		);
		const data = (await res.json()) as object;
		console.log(data);
	};
	return (
		<div>
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={onFetch}
			>
				Fetch
			</Button>
		</div>
	);
};

CertificatePage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CertificatePage;
