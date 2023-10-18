import React from 'react';
import Confetti from 'react-confetti';

import { useRouter } from 'next/router';

import { Button, Result } from 'antd';

import { useCreateSafeStore } from '~/stores';

const SuccessStep = () => {
	const router = useRouter();
	const { safeAddress, setCurrentStep, resetForm } = useCreateSafeStore();
	const [isExploding, setIsExploding] = React.useState<boolean>(false);

	React.useEffect(() => {
		setIsExploding(true);
		setTimeout(() => {
			setIsExploding(false);
		}, 5000);
	}, [safeAddress]);

	const onClick = (href: string) => {
		router
			.push(href)
			.then(() => {
				resetForm();
				setCurrentStep(0);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Result
				status='success'
				title='Successfully Created Safe Account'
				subTitle={`Safe Address: ${safeAddress}`}
				extra={[
					<Button
						key='home'
						type='primary'
						className='bg-secondary'
						onClick={() => onClick('/')}
					>
						Go Home
					</Button>,
					<Button key='login' onClick={() => onClick('/login?type=user')}>
						Connect to Safe
					</Button>,
				]}
			/>
			<Confetti recycle={isExploding} numberOfPieces={100} />
		</>
	);
};

export default SuccessStep;
