import React from 'react';
import type { IconType } from 'react-icons';

import { Image, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

import { useCreateCertificateStore } from '~/stores/create-certificate';

import { TbBrandGithub, TbBrandX } from 'react-icons/tb';

import FormFooter from '../form-footer';
import PageLayout from '../layout';

interface DataType {
	key: React.ReactNode;
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

interface LabelProps {
	name: string;
	Icon: IconType | string;
}

const Label = ({ name, Icon }: LabelProps) => {
	return (
		<div className='flex flex-row items-center gap-2'>
			{typeof Icon === 'string' ? (
				<Image src={Icon} preview={false} alt={name} width={24} height={24} />
			) : (
				<Icon className='text-xl text-slate-600' />
			)}
			<span className='text-[1rem] font-medium text-slate-700'>{name}</span>
		</div>
	);
};

const data: DataType[] = [
	{
		key: '1',
		name: <Label name='GitHub' Icon={TbBrandGithub} />,
		description: 'Verify GitHub Ownership of a user',
	},
	{
		key: '2',
		name: <Label name='Twitter' Icon={TbBrandX} />,
		description: 'Verify Twitter Ownership of a user',
	},
	{
		key: '3',
		name: (
			<Label
				name='Lens Profile'
				Icon={
					'https://icodrops.com/wp-content/uploads/2022/02/LensProtocol_logo-1.jpeg'
				}
			/>
		),
		description: 'Verify Lens Profile Ownership of a user',
	},
	{
		key: '4',
		name: (
			<Label
				name='ENS Domain'
				Icon={
					'https://464911102-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/collections%2F2TjMAeHSzwlQgcOdL48E%2Ficon%2FKWP0gk2C6bdRPliWIA6o%2Fens%20transparent%20background.png?alt=media&token=bd28b063-5a75-4971-890c-97becea09076'
				}
			/>
		),
		description: 'Verify ENS Domain Ownership of a user',
	},
	{
		key: '5',
		name: (
			<Label
				name='GitCoin Passport'
				Icon={
					'https://315315702-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHyhSiCXoxRpn79voKZ4f%2Ficon%2Ftsbmu8bKGwzR1T2tAfpE%2Fgitcoin.webp?alt=media&token=c3b7fe37-536d-4302-860e-1237eaff73d3   '
				}
			/>
		),
		description: 'Verify GitCoin Passport with score >= 20',
	},
	{
		key: '6',
		name: (
			<Label
				name='Proof of Humanity'
				Icon={
					'https://cdn.dribbble.com/users/2210413/screenshots/15548951/poh-logo_1x.png'
				}
			/>
		),
		description: 'Verify Proof of Humanity',
	},
];

const VerificationDetails = () => {
	const {} = useCreateCertificateStore();

	const rowSelection: TableRowSelection<DataType> = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys.length}`,
				'selectedRows: ',
				selectedRows
			);
		},
		onSelect: (record, selected, selectedRows) => {
			console.log(record, selected, selectedRows);
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			console.log(selected, selectedRows, changeRows);
		},
	};

	const onNext = () => {
		return true;
	};

	return (
		<PageLayout
			image='https://cdni.iconscout.com/illustration/premium/thumb/idea-generation-3488556-2922416.png'
			imageAlt='Verification'
			title='Add Verification methods for your holders'
			footer={<FormFooter onNext={onNext} />}
		>
			<Table columns={columns} rowSelection={rowSelection} dataSource={data} />
		</PageLayout>
	);
};

export default VerificationDetails;
