import clsx from 'clsx';
import React from 'react';
import type { IconType } from 'react-icons';

import { useRouter } from 'next/router';

import { useAddress, useDisconnect, useWallet } from '@thirdweb-dev/react';

import { Button, Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { inter } from '~/components/layout';

import {
	TbArrowsExchange,
	TbBuilding,
	TbCertificate,
	TbClipboardCopy,
	TbLogout,
	TbUserHexagon,
} from 'react-icons/tb';

interface Props {
	children: React.ReactNode;
}

interface DropdownItemProps {
	name: string;
	Icon: IconType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClick?: () => any;
}

const ProfileInstance = () => {
	const walletInstance = useWallet();
	const isSafeWallet = walletInstance?.walletId === 'safe';
	const router = useRouter();
	if (isSafeWallet) {
		return [
			{
				key: '2',
				label: <DropDownItem name='Your organization' Icon={TbBuilding} />,
			},
			{
				key: '3',
				label: (
					<DropDownItem
						name='Issue Certificates'
						Icon={TbCertificate}
						handleClick={() => router.push('/certificate/issue')}
					/>
				),
			},
		];
	} else {
		return [
			{
				key: '2',
				label: <DropDownItem name='Your profile' Icon={TbUserHexagon} />,
			},
			{
				key: '3',
				label: <DropDownItem name='Your Certificates' Icon={TbCertificate} />,
			},
		];
	}
};

const DropDownItem = ({ name, Icon, handleClick }: DropdownItemProps) => {
	return (
		<div
			className='flex flex-row items-center gap-3 py-[2px]'
			onClick={handleClick}
		>
			<Icon size={22} className='text-gray-500' />
			<span className='text-sm font-medium'>{name}</span>
		</div>
	);
};

const UserDropdown = ({ children }: Props) => {
	const router = useRouter();
	const address = useAddress();
	const disconnect = useDisconnect();
	const [open, setOpen] = React.useState<boolean>(false);
	const dropdownItems: DropdownItemProps[] = [
		{
			name: 'Switch Account',
			Icon: TbArrowsExchange,
			handleClick: () => router.push('/login'),
		},
	];
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<div className='flex w-full max-w-sm flex-col text-lg font-medium leading-5 text-slate-600'>
					Welcome{' '}
					<div className='flex flex-row items-center gap-2 text-[1rem] font-medium text-secondary '>
						{address?.slice(0, 6) + '...' + address?.slice(-6)}
						<Button
							icon={<TbClipboardCopy size={16} className='text-gray-600' />}
							type='link'
							onClick={() => {
								navigator.clipboard
									.writeText(address ?? '')
									.catch((error) => console.log(error));
							}}
						/>
					</div>
				</div>
			),
		},
		...ProfileInstance().map((item) => item),
		...dropdownItems.map((item, index) => ({
			key: `${index + 4}`,
			label: <DropDownItem {...item} />,
		})),
		{
			key: '8',
			label: <Divider style={{ margin: 0 }} />,
		},
		{
			key: '9',
			label: (
				<DropDownItem name='Sign out' Icon={TbLogout} handleClick={disconnect} />
			),
		},
	];
	const menuStyle: React.CSSProperties = {};

	const contentStyle: React.CSSProperties = {
		borderRadius: '8px',
		width: '256px',
	};

	const handleMenuClick: MenuProps['onClick'] = (e) => {
		if (e.key !== '1') {
			setOpen(false);
		}
	};

	const handleOpenChange = (flag: boolean) => {
		setOpen(flag);
	};

	return (
		<Dropdown
			menu={{ items, onClick: handleMenuClick }}
			trigger={['click']}
			onOpenChange={handleOpenChange}
			open={open}
			dropdownRender={(menu) => (
				<div style={contentStyle} className={clsx(inter.className)}>
					{React.cloneElement(menu as React.ReactElement, {
						style: menuStyle,
					})}
				</div>
			)}
		>
			{children}
		</Dropdown>
	);
};

export default UserDropdown;
