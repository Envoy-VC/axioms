import React from 'react';



import Link from 'next/link';



import { Image } from 'antd';


const NotFoundScreen = () => {
	return (
		<div className='mx-auto my-[10rem] flex max-w-screen-xl flex-col items-center justify-center gap-12 px-4'>
			<Image
				src='https://cdni.iconscout.com/illustration/premium/thumb/page-not-found-404-9829855-8022199.png'
				alt='Not Found'
				preview={false}
				width={300}
			/>

			<div className='text-lg font-medium text-slate-700'>
				Are you lost? Go back to{' '}
				<Link href='/' className='text-primary grayscale-[25%]'>
					Home
				</Link>
			</div>
		</div>
	);
};

export default NotFoundScreen;