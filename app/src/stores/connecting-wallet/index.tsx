import { create } from 'zustand';

interface ConnectionWalletState {
	walletId: string | null;
}

interface ConnectionWalletActions {
	setWalletId: (walletId: string | null) => void;
}

export const useConnectingWallet = create<
	ConnectionWalletState & ConnectionWalletActions
>((set) => ({
	walletId: null,
	setWalletId: (walletId: string | null) => set({ walletId }),
}));
