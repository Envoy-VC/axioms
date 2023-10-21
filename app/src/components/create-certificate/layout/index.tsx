import clsx from 'clsx';
import React from 'react';

import { Image } from 'antd';

import { TbEditOff } from 'react-icons/tb';

interface Props {
	children: React.ReactNode;
	image?: string;
	imageAlt?: string;
	title: React.ReactNode;
	footer: React.ReactNode;
}

const PageLayout = ({ children, image, imageAlt, title, footer }: Props) => {
	return (
		<div className='flex h-[92vh] flex-row'>
			<div
				className={clsx(
					'w-full px-2 pt-8 sm:p-8 lg:pt-16',
					image ? `basis-[100%] lg:basis-1/2` : 'basis-[100%]'
				)}
			>
				<div
					className={clsx(
						'flex min-h-[80vh] flex-col justify-between',
						image ? 'mx-auto max-w-2xl' : 'sm:px-16'
					)}
				>
					<div className='flex flex-col gap-8'>
						<div className='flex flex-col gap-2'>
							<div className='text-3xl font-medium text-slate-700'>{title}</div>
							<div className='flex items-center gap-1 text-sm font-semibold text-gray-400'>
								<TbEditOff className='text-sm text-gray-400' />
								Not Editable After Launch
							</div>
						</div>
						{children}
					</div>
					{footer}
				</div>
			</div>
			{image && (
				<div className='hidden w-full basis-1/2 select-none items-center justify-center bg-[rgb(248,250,252,0.35)] lg:flex'>
					<Image
						src={image}
						alt={imageAlt}
						preview={false}
						className='object-contain'
					/>
				</div>
			)}
		</div>
	);
};

export default PageLayout;
