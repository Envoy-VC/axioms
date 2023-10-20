import React from 'react';

import PageLayout from '../layout';
import PreviewCertificateDetails from '../preview-details';

const ReviewCreateCertificate = () => {
	return (
		<PageLayout title='Review your Certificate' footer=''>
			<div className=''>
				<PreviewCertificateDetails />
			</div>
		</PageLayout>
	);
};

export default ReviewCreateCertificate;
