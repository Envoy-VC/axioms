import { create } from 'zustand';

interface CreateSafeState {
	currentStep: number;
	name: string;
	owners: string[];
	threshold: number;
}

interface CreateSafeActions {
	setCurrentStep: (step: number) => void;
	setName: (name: string) => void;
	setOwners: (owners: string[]) => void;
	setThreshold: (threshold: number) => void;
	resetForm: () => void;
}

export const useCreateSafeStore = create<CreateSafeState & CreateSafeActions>(
	(set) => ({
		currentStep: 0,
		name: '',
		owners: [],
		threshold: 1,
		setCurrentStep: (step) => set({ currentStep: step }),
		setName: (name) => set({ name }),
		setOwners: (owners) => set({ owners }),
		setThreshold: (threshold) => set({ threshold }),
		resetForm: () => set({ currentStep: 0, name: '', owners: [], threshold: 1 }),
	})
);
