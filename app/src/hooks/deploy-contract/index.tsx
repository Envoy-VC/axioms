import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import React from 'react';

import { useAddress, useSDK } from '@thirdweb-dev/react';

import { useCreateCertificateStore } from '~/stores';

const useDeployContract = () => {
	const sdk = useSDK();
	const address = useAddress();
	const { arweaveManifestId, holders } = useCreateCertificateStore();

	const [isDeploying, setIsDeploying] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const getMerkleRoot = () => {
		const addressArray: string[] = [];
		holders.forEach((holder) => {
			if (holder.address) addressArray.push(holder.address);
		});
		console.log(addressArray);
		const leaves = addressArray.map((x) => keccak256(x));
		const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
		const root = '0x' + tree.getRoot().toString('hex');
		console.log(root);
		return root;
	};

	const deployContract = async () => {
		try {
			setIsDeploying(true);
			const merkleRoot = getMerkleRoot();
			return;
			const res = await sdk?.deployer.deployPublishedContract(
				'0xBF4979305B43B0eB5Bb6a5C67ffB89408803d3e1',
				'Axiom',
				[address, arweaveManifestId, merkleRoot]
			);
			console.log(res);
			return res;
		} catch (error) {
			setError(String(error));
			console.log(error);
		} finally {
			setIsDeploying(false);
		}
	};
	return { deployContract, isDeploying, error };
};

export default useDeployContract;
