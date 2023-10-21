require('@matterlabs/hardhat-zksync-solc');
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	zksolc: {
		version: '1.3.9',
		compilerSource: 'binary',
		settings: {
			optimizer: {
				enabled: true,
			},
		},
	},
	networks: {
		hardhat: {
			allowUnlimitedContractSize: true,
		},
		zksync_testnet: {
			url: 'https://zksync2-testnet.zksync.dev',
			ethNetwork: 'goerli',
			chainId: 280,
			zksync: true,
		},
		zksync_mainnet: {
			url: 'https://zksync2-mainnet.zksync.io/',
			ethNetwork: 'mainnet',
			chainId: 324,
			zksync: true,
		},
		goerli: {
			url: 'https://eth-goerli.g.alchemy.com/v2/demo',
			chainId: 5,
		},
	},
	etherscan: {
		apiKey: '',
	},
	paths: {
		artifacts: './artifacts-zk',
		cache: './cache-zk',
		sources: './contracts',
		tests: './test',
	},
	solidity: {
		version: '0.8.20',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
