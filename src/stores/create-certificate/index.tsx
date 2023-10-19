import { create } from 'zustand';

interface CounterState {
	currentStep: number;
	nextStep: () => void;
	prevStep: () => void;
}

interface BasicDetailsState {
	type: 'poap' | 'basic';
	eventName: string;
	eventDescription: string;
	eventType: 'online' | 'offline';
}
type POAPHolder = {
	address: string;
} & Record<string, string>;

interface POAPCertificateState {
	certificate: File;
	holders: POAPHolder[];
}

type BasicCertificateHolder = {
	address: string;
	certificate: File;
} & Record<string, string>;

interface BasicCertificateState {
	holders: BasicCertificateHolder[];
}

type CertificateState = POAPCertificateState | BasicCertificateState;

interface CertificateTransactionsState {
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
	certificate: {} as File,
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
