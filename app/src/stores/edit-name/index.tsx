import { create } from 'zustand';

interface EditNameModalState {
	isOpen: boolean;
}

interface EditNameModalActions {
	open: () => void;
	close: () => void;
}

export const useEditNameModal = create<
	EditNameModalState & EditNameModalActions
>((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}));
