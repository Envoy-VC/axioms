import React from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

import { getSismoVerificationConfig } from '~/helpers/sismo';
import { data } from '~/helpers/sismo';
import { useCreateCertificateStore } from '~/stores/create-certificate';

import FormFooter from '../form-footer';
import PageLayout from '../layout';

export interface DataType {
	key: string;
	name: React.ReactNode;
	description: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: '40%',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		width: '60%',
	},
];

const VerificationDetails = () => {
	const { verificationConfig, setVerificationConfig, nextStep, prevStep } =
		useCreateCertificateStore();

	const getSelectedKeys = () => {
		const { auth, claims } = verificationConfig;
		const selectedKeys: React.Key[] = [];
		auth.forEach((a) => {
			selectedKeys.push(a.authType);
		});
		claims.forEach((claim) => {
			selectedKeys.push(claim.name);
		});
		return selectedKeys;
	};

	const rowSelection: TableRowSelection<DataType> = {
		selectedRowKeys: getSelectedKeys(),
		onChange: (selectedRowKeys, selectedRows) => {
			const config = getSismoVerificationConfig(selectedRows);
			setVerificationConfig(config);
		},
	};

	const onPrev = () => {
		prevStep();
	};

	const onNext = () => {
		nextStep();
	};

	return (
		<PageLayout
			image='https://cdni.iconscout.com/illustration/premium/thumb/problem-solution-3488566-2922426.png'
			imageAlt='Verification'
			title='Add Verification methods for your holders'
			footer={<FormFooter onNext={onNext} onPrev={onPrev} />}
		>
			<Table columns={columns} rowSelection={rowSelection} dataSource={data} />
		</PageLayout>
	);
};

export default VerificationDetails;
