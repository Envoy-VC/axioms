export const ABI = [
	{
		type: 'constructor',
		name: '',
		inputs: [
			{
				type: 'address',
				name: 'initialOwner',
				internalType: 'address',
			},
			{
				type: 'string',
				name: '_certificateId',
				internalType: 'string',
			},
			{
				type: 'bytes32',
				name: '_merkleRoot',
				internalType: 'bytes32',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'error',
		name: 'ERC721IncorrectOwner',
		inputs: [
			{
				type: 'address',
				name: 'sender',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721InsufficientApproval',
		inputs: [
			{
				type: 'address',
				name: 'operator',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721InvalidApprover',
		inputs: [
			{
				type: 'address',
				name: 'approver',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721InvalidOperator',
		inputs: [
			{
				type: 'address',
				name: 'operator',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721InvalidOwner',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721InvalidReceiver',
		inputs: [
			{
				type: 'address',
				name: 'receiver',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721InvalidSender',
		inputs: [
			{
				type: 'address',
				name: 'sender',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'ERC721NonexistentToken',
		inputs: [
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'OwnableInvalidOwner',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'OwnableUnauthorizedAccount',
		inputs: [
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
			},
		],
		outputs: [],
	},
	{
		type: 'error',
		name: 'StringsInsufficientHexLength',
		inputs: [
			{
				type: 'uint256',
				name: 'value',
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: 'length',
				internalType: 'uint256',
			},
		],
		outputs: [],
	},
	{
		type: 'event',
		name: 'Approval',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'approved',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				indexed: true,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'ApprovalForAll',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'operator',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'bool',
				name: 'approved',
				indexed: false,
				internalType: 'bool',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'BatchMetadataUpdate',
		inputs: [
			{
				type: 'uint256',
				name: '_fromTokenId',
				indexed: false,
				internalType: 'uint256',
			},
			{
				type: 'uint256',
				name: '_toTokenId',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'MetadataUpdate',
		inputs: [
			{
				type: 'uint256',
				name: '_tokenId',
				indexed: false,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'OwnershipTransferred',
		inputs: [
			{
				type: 'address',
				name: 'previousOwner',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'newOwner',
				indexed: true,
				internalType: 'address',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'Transfer',
		inputs: [
			{
				type: 'address',
				name: 'from',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'to',
				indexed: true,
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				indexed: true,
				internalType: 'uint256',
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: 'function',
		name: 'approve',
		inputs: [
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'balanceOf',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
			},
		],
		outputs: [
			{
				type: 'uint256',
				name: '',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'baseURL',
		inputs: [],
		outputs: [
			{
				type: 'string',
				name: '',
				internalType: 'string',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'certificateId',
		inputs: [],
		outputs: [
			{
				type: 'string',
				name: '',
				internalType: 'string',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'claimed',
		inputs: [
			{
				type: 'address',
				name: '',
				internalType: 'address',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getApproved',
		inputs: [
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'address',
				name: '',
				internalType: 'address',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'isApprovedForAll',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'operator',
				internalType: 'address',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'isWhitelisted',
		inputs: [
			{
				type: 'bytes32[]',
				name: 'proof',
				internalType: 'bytes32[]',
			},
			{
				type: 'bytes32',
				name: 'leaf',
				internalType: 'bytes32',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'merkleRoot',
		inputs: [],
		outputs: [
			{
				type: 'bytes32',
				name: '',
				internalType: 'bytes32',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'name',
		inputs: [],
		outputs: [
			{
				type: 'string',
				name: '',
				internalType: 'string',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'owner',
		inputs: [],
		outputs: [
			{
				type: 'address',
				name: '',
				internalType: 'address',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'ownerOf',
		inputs: [
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'address',
				name: '',
				internalType: 'address',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'renounceOwnership',
		inputs: [],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'safeMint',
		inputs: [
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
			},
			{
				type: 'bytes32[]',
				name: 'proof',
				internalType: 'bytes32[]',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'safeTransferFrom',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'safeTransferFrom',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
			{
				type: 'bytes',
				name: 'data',
				internalType: 'bytes',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setApprovalForAll',
		inputs: [
			{
				type: 'address',
				name: 'operator',
				internalType: 'address',
			},
			{
				type: 'bool',
				name: 'approved',
				internalType: 'bool',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setBaseURL',
		inputs: [
			{
				type: 'string',
				name: '_baseURL',
				internalType: 'string',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'supportsInterface',
		inputs: [
			{
				type: 'bytes4',
				name: 'interfaceId',
				internalType: 'bytes4',
			},
		],
		outputs: [
			{
				type: 'bool',
				name: '',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'symbol',
		inputs: [],
		outputs: [
			{
				type: 'string',
				name: '',
				internalType: 'string',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'tokenURI',
		inputs: [
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [
			{
				type: 'string',
				name: '',
				internalType: 'string',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'transferFrom',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
			},
			{
				type: 'uint256',
				name: 'tokenId',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'transferOwnership',
		inputs: [
			{
				type: 'address',
				name: 'newOwner',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
];