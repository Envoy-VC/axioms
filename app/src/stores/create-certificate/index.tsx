import { create } from 'zustand';

import type { RcFile } from 'antd/es/upload';

import type { Config } from '~/helpers/sismo';

export interface CounterState {
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

export type Holder = {
	address?: string;
} & Record<string, string>;

export interface CertificateState {
	certificate?: RcFile;
	holders: Holder[];
}

export interface CertificateTransactionsState {
	arweaveManifestId: string;
}

export interface Actions {
	setBasicDetails: (basicDetails: BasicDetailsState) => void;
	setCertificateHolders: (holders: CertificateState) => void;
	setArweaveManifestId: (arweaveTxId: string) => void;
}

export interface VerificationState {
	verificationConfig: Config;
	setVerificationConfig: (config: Config) => void;
}

export type State = CounterState &
	BasicDetailsState &
	CertificateState &
	VerificationState &
	CertificateTransactionsState;

export const useCreateCertificateStore = create<State & Actions>((set) => ({
	currentStep: 1,
	type: 'poap',
	eventName: '',
	eventDescription: '',
	eventType: 'online',
	certificate: undefined,
	holders: [],
	arweaveManifestId: '',
	contractAddress: '',
	verificationConfig: { auth: [], claims: [] },
	nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
	prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
	setBasicDetails: (basicDetails) => set(basicDetails),
	setCertificateHolders: (holders) => set(holders),
	setVerificationConfig: (verificationConfig) => set({ verificationConfig }),
	setArweaveManifestId: (arweaveManifestId) => set({ arweaveManifestId }),
}));
