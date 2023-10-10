import React from 'react';
import {
	Web3Provider,
	AntDesignConfigProvider,
	NotificationProvider,
} from '~/providers';

import clsx from 'clsx';
import { Navbar, SEO } from '~/components/common';

// Font
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

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
					<div className={clsx(satoshi.className)}>
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
