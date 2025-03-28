// contracts/WorldIDPayment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IWorldID.sol";
import "./helpers/ByteHasher.sol";

contract WorldIDPayment {
    using ByteHasher for bytes;

    IWorldID internal immutable worldId;
    uint256 internal immutable groupId = 1;
    mapping(address => bool) public verifiedUsers;
    
    constructor(IWorldID _worldId) {
        worldId = _worldId;
    }

    function verifyAndPay(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public payable {
        // Verify World ID proof
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            abi.encodePacked(address(0)).hashToField(),
            proof
        );
        
        verifiedUsers[msg.sender] = true;
    }

    function makePayment(address payable recipient) external payable {
        require(verifiedUsers[msg.sender], "User not verified");
        require(msg.value > 0, "Amount must be greater than 0");
        recipient.transfer(msg.value);
    }
}
