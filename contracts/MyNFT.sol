//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "base64-sol/base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 public tokenId;
    event CreatedMyNFT(uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("MyNFT", "MNFT") {
        tokenId = 0;
    }

    function create(string memory _svg) public {
        _safeMint(msg.sender, tokenId);
        // Image URI
        string memory imageURI = toImageURI(_svg);
        // Token URI
        string memory tokenURI = toTokenURI(imageURI);
        _setTokenURI(tokenId, tokenURI);
        tokenId = tokenId + 1;
        emit CreatedMyNFT(tokenId, _svg);
    }

    function toImageURI(string memory _svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgEncoded = Base64.encode(
            bytes(string(abi.encodePacked(_svg)))
        );
        return string(abi.encodePacked(baseURL, svgEncoded));
    }

    function toTokenURI(string memory _imageURI) public pure returns (string memory) {
        string memory baseURL = "data:application/json;base64,";
        return string(abi.encodePacked(
            baseURL,
            Base64.encode(
                bytes(abi.encodePacked(
                    '{"name": "Carmhack NFT",',
                    '"description": "On-chain NFT of carmhack logo,',
                    '"attributes": "",',
                    '"image": "', _imageURI, '"}'
                ))
            )
        ));
    }
}
