import { create } from 'zustand';

import { UploadFile } from 'antd';

interface CounterState {
	currentStep: number;
	nextStep: () => void;
	prevStep: () => void;
}

export interface BasicDetailsState {
	type: 'poap' | 'basic';
	eventName: string;
	eventDescription: string;
	eventType: 'online' | 'offline';
}

export type POAPHolder = {
	address?: string;
} & Record<string, string>;

export interface POAPCertificateState {
	certificate: UploadFile | undefined;
	holders: POAPHolder[];
}

export type BasicCertificateHolder = {
	address: string;
	certificate: File;
} & Record<string, string>;

export interface BasicCertificateState {
	holders: BasicCertificateHolder[];
}

type CertificateState = POAPCertificateState | BasicCertificateState;

export interface CertificateTransactionsState {
	arweaveTxId: string;
	contractAddress: string;
}

interface Actions {
	setBasicDetails: (basicDetails: BasicDetailsState) => void;
	setCertificateHolders: (
		holders: POAPCertificateState | BasicCertificateState
	) => void;
	setArweaveTxId: (arweaveTxId: string) => void;
	setContractAddress: (contractAddress: string) => void;
}

type State = CounterState &
	BasicDetailsState &
	CertificateState &
	CertificateTransactionsState;

export const useCreateCertificateStore = create<State & Actions>((set) => ({
	currentStep: 1,
	type: 'poap',
	eventName: '',
	eventDescription: '',
	eventType: 'online',
	certificate: null,
	holders: [],
	arweaveTxId: '',
	contractAddress: '',
	nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
	prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
	setBasicDetails: (basicDetails) => set(basicDetails),
	setCertificateHolders: (holders) => set(holders),
	setArweaveTxId: (arweaveTxId) => set({ arweaveTxId }),
	setContractAddress: (contractAddress) => set({ contractAddress }),
}));
