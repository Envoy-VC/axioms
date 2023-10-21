import React from 'react';

import Link from 'next/link';

import { Input } from 'antd';

import { PiFingerprintDuotone, PiSparkle } from 'react-icons/pi';

import ConnectButton from '../connect-button';

const Navbar = () => {
	return (
		<div className='flex h-[8vh] items-center border-b-[1px] border-gray-300 px-8'>
			<div className='mx-auto flex w-full max-w-screen-3xl flex-row items-center justify-between'>
				<div className='flex items-center gap-2'>
					<PiFingerprintDuotone className='text-primary' size={38} />
					<span className='text-2xl font-medium uppercase'>axioms</span>
				</div>
				<div className='hidden items-center gap-6 md:flex'>
					<Link href='/' className='text-slate-500 hover:underline'>
						Explore
					</Link>
					<Link href='/' className='text-slate-500 hover:underline'>
						Issuance
					</Link>
					<Link href='/' className='text-slate-500 hover:underline'>
						Dashboard
					</Link>
				</div>
				<div className='flex items-center gap-3'>
					<Input
						placeholder='Search organizations/certifications'
						size='middle'
						className='hidden min-w-[20rem] !py-[6px] lg:flex'
						prefix={<PiSparkle className='mr-2 text-lg' />}
					/>
					<ConnectButton />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
