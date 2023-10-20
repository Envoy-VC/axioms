import React from 'react';

import { Form, Input, Select } from 'antd';
import type { FormProps } from 'antd';

import { useCreateCertificateStore } from '~/stores/create-certificate';
import type { BasicDetailsState } from '~/stores/create-certificate';

import FormFooter from '../form-footer';
import PageLayout from '../layout';

const formItemLayout: FormProps = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	scrollToFirstError: true,
};

const EventDetails = () => {
	const {
		type,
		eventName,
		eventDescription,
		eventType,
		nextStep,
		setBasicDetails,
	} = useCreateCertificateStore();
	const [form] = Form.useForm<BasicDetailsState>();

	const onNext = () => {
		form
			.validateFields()
			.then((values) => {
				setBasicDetails(values);
				nextStep();
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	return (
		<PageLayout
			image='https://cdni.iconscout.com/illustration/premium/thumb/idea-generation-3488556-2922416.png'
			imageAlt='Event Details'
			title='Tell us about your event'
			footer={<FormFooter onNext={onNext} />}
		>
			<Form
				{...formItemLayout}
				form={form}
				layout='vertical'
				name='basicDetails'
				initialValues={{
					type: type,
					eventName: eventName,
					eventDescription: eventDescription,
					eventType: eventType,
				}}
			>
				<div className='my-1 text-[1rem] font-medium text-slate-700'>
					Certificate Type*
				</div>
				<Form.Item name='type'>
					<Select className='max-w-sm'>
						<Select.Option value='poap'>
							POAP - Attendance/Participation Certificates
						</Select.Option>
						<Select.Option value='basic'>General - Unique Certificates</Select.Option>
					</Select>
				</Form.Item>
				<div className='my-1 text-[1rem] font-medium text-slate-700'>
					Event Name*
				</div>
				<Form.Item
					name='eventName'
					rules={[{ required: true, message: 'Event Name is required!' }]}
				>
					<Input placeholder='Community Meetup' className='max-w-sm' />
				</Form.Item>
				<div className='my-1 text-[1rem] font-medium text-slate-700'>
					Event Description*
				</div>
				<Form.Item
					name='eventDescription'
					rules={[{ required: true, message: 'Event Description is required!' }]}
				>
					<Input.TextArea
						placeholder='Description'
						className=''
						showCount
						rows={6}
					/>
				</Form.Item>
				<div className='my-1 text-[1rem] font-medium text-slate-700'>
					Event Type*
				</div>
				<Form.Item name='eventType' rules={[{ required: true }]}>
					<Select className='max-w-[200px]'>
						<Select.Option key='online' value='online'>
							Online
						</Select.Option>
						<Select.Option key='offline' value='offline'>
							Offline
						</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</PageLayout>
	);
};

export default EventDetails;
