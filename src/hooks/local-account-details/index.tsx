import { useLocalStorage } from 'usehooks-ts';

import type { Account } from '~/types';

interface Props {
	address?: string;
}

const useLocalAccountDetails = ({ address }: Props) => {
	const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);

	const getAccountDetails = (address: string) => {
		const account = accounts.find((account) => account.address === address);
		return account ?? null;
	};

	const save = ({ address, name }: Account) => {
		try {
			const account = getAccountDetails(address);
			if (account) {
				account.name = name;
				setAccounts([...accounts]);
			} else {
				setAccounts([...accounts, { name, address: address }]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const remove = ({ address }: Account) => {
		try {
			const newAccounts = accounts.filter(
				(account: Account) => account.address !== address
			);
			setAccounts([...newAccounts]);
		} catch (error) {
			console.log(error);
		}
	};

	return { data: getAccountDetails(address ?? ''), save, remove };
};

export default useLocalAccountDetails;
