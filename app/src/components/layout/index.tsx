import clsx from 'clsx';
import React from 'react';

import { Inter } from 'next/font/google';
// Font
import localFont from 'next/font/local';

import { Navbar, SEO } from '~/components/common';
import {
	AntDesignConfigProvider,
	NotificationProvider,
	Web3Provider,
} from '~/providers';

export const inter = Inter({ subsets: ['latin'] });
export const satoshi = localFont({ src: '../../../public/fonts/Satoshi.ttf' });

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<AntDesignConfigProvider>
			<Web3Provider>
				<NotificationProvider>
					<div className={clsx(satoshi.className, 'min-h-full')}>
						<SEO />
						<Navbar />
						{children}
					</div>
				</NotificationProvider>
			</Web3Provider>
		</AntDesignConfigProvider>
	);
};

export default Layout;
