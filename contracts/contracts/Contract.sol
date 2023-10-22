// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Axiom is ERC721, ERC721URIStorage, Ownable {
    bytes32 public merkleRoot;
    uint256 private _nextTokenId;
    string public certificateId;
    string public baseURL = "https://axioms-alpha.vercel.app/api/";

    // mapping to store wether the address has claimed or not
    mapping(address => bool) public claimed;

    function setBaseURL(string memory _baseURL) public onlyOwner {
        baseURL = _baseURL;
    }

    constructor(
        address initialOwner,
        string memory _certificateId,
        bytes32 _merkleRoot
    ) ERC721("Axiom", "AXIOM") Ownable(initialOwner) {
        certificateId = _certificateId;
        merkleRoot = _merkleRoot;
    }

    function isWhitelisted(
        bytes32[] memory proof,
        bytes32 leaf
    ) public view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(baseURL, certificateId, "/"));
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override(ERC721, IERC721) {
        require(
            to == address(this) || to == address(0),
            "AXIOM: Certificates are not Transferable"
        );
        return super.safeTransferFrom(from, to, tokenId, data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721, IERC721) {
        require(
            to == address(this) || to == address(0),
            "AXIOM: Certificates are not Transferable"
        );
        return super.transferFrom(from, to, tokenId);
    }

    function safeMint(address to, bytes32[] memory proof) public {
        require(
            isWhitelisted(proof, keccak256(abi.encodePacked(to))),
            "AXIOM: Not in holders list"
        );
        require(!claimed[to], "AXIOM: Already claimed certificate");
        uint256 tokenId = _nextTokenId++;
        string memory uri = Strings.toHexString(uint160(to), 20);
        claimed[to] = true;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
