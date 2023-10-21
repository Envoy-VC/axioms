// convert the above imports to require statements
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

describe('Axiom Contract', async function () {
	async function deployAxiomContract() {
		let [deployer, user1, user2] = await ethers.getSigners();
		const Axiom = await ethers.getContractFactory('Axiom');
		// Construct Merkle Tree
		const buf2hex = (x) => '0x' + x.toString('hex');
		const leaves = [deployer.address, user1.address, user2.address].map((x) =>
			keccak256(x)
		);
		const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
		const root = '0x' + tree.getRoot().toString('hex');
		const user1Leaf = keccak256(user1.address).toString('hex');
		const user1Proof = tree.getProof(user1Leaf).map((x) => buf2hex(x.data));
		const user2Leaf = keccak256(user2.address).toString('hex');
		const user2Proof = tree.getProof(user2Leaf).map((x) => buf2hex(x.data));

		const AxiomInstance = await Axiom.connect(deployer).deploy(
			deployer.address,
			'abcd',
			root
		);

		return {
			Axiom,
			AxiomInstance,
			deployer,
			user1,
			user2,
			user1Leaf,
			user1Proof,
			user2Leaf,
			user2Proof,
		};
	}

	it('Should deploy the contract', async function () {
		let { deployer, AxiomInstance } = await deployAxiomContract();
		const contractAddress = await AxiomInstance.getAddress();
		console.log(`Contract address: ${contractAddress}`);
		expect(contractAddress).to.not.equal('');
	});
	it('Should mint Certificate for User 1', async function () {
		let { deployer, AxiomInstance, user1, user1Proof } =
			await deployAxiomContract();
		const tx = await AxiomInstance.connect(user1).safeMint(
			user1.address,
			user1Proof
		);
		const receipt = await tx.wait();
		expect(receipt.status).to.equal(1);
	});
	it('Should not allow Users to transfer certificate', async function () {
		let { deployer, AxiomInstance, user1, user2, user1Proof } =
			await deployAxiomContract();
		await AxiomInstance.connect(user1).safeMint(user1.address, user1Proof);
		await expect(
			AxiomInstance.connect(user1).safeTransferFrom(
				user1.address,
				user2.address,
				0
			)
		).to.be.revertedWith('AXIOM: Certificates are not Transferable');
		await expect(
			AxiomInstance.connect(user1).transferFrom(
				user1.address,
				user2.address,
				0
			)
		).to.be.revertedWith('AXIOM: Certificates are not Transferable');
	});
	it('Should not allow user1 to claim the nft more than once', async function () {
		let { deployer, AxiomInstance, user1, user1Proof } =
			await deployAxiomContract();
		await AxiomInstance.connect(user1).safeMint(user1.address, user1Proof);
		await expect(
			AxiomInstance.connect(user1).safeMint(user1.address, user1Proof)
		).to.be.revertedWith('AXIOM: Already claimed certificate');
	});
});
