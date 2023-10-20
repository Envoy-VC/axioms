import type { IconType } from 'react-icons';

import { Image } from 'antd';

import type { DataType } from '~/components/create-certificate/verification-details';

import { TbBrandGithub, TbBrandX } from 'react-icons/tb';

interface AuthType {
	authType: string;
}

interface ClaimType {
	name: string;
	groupId: string;
	value: string;
}

export interface Config {
	auth: AuthType[];
	claims: ClaimType[];
}

const services: Record<string, ClaimType> = {
	lens: {
		name: 'lens',
		groupId: '0x945e9e7b1f95899328bf9c4490aba9fc',
		value: '1',
	},
	ens: {
		name: 'ens',
		groupId: '0x0f800ff28a426924cbe66b67b9f837e2',
		value: '1',
	},
	passport: {
		name: 'passport',
		groupId: '0x1cde61966decb8600dfd0749bd371f12',
		value: '20',
	},
	poh: {
		name: 'poh',
		groupId: '0x682544d549b8a461d7fe3e589846bb7b',
		value: '1',
	},
};

export const getSismoVerificationConfig = (data: DataType[]): Config => {
	const config: Config = { auth: [], claims: [] };
	data.forEach((d) => {
		if (d.key === 'github' || d.key === 'twitter') {
			config.auth.push({ authType: d.key });
		} else {
			config.claims.push({ ...services[d.key] } as ClaimType);
		}
	});

	return config;
};

interface LabelProps {
	name: string;
	Icon: IconType | string;
}

export const Label = ({ name, Icon }: LabelProps) => {
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

export const data: DataType[] = [
	{
		key: 'github',
		name: <Label name='GitHub' Icon={TbBrandGithub} />,
		description: 'Verify GitHub Ownership of a user',
	},
	{
		key: 'twitter',
		name: <Label name='Twitter' Icon={TbBrandX} />,
		description: 'Verify Twitter Ownership of a user',
	},
	{
		key: 'lens',
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
		key: 'ens',
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
		key: 'passport',
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
		key: 'poh',
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
