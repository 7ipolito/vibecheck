// contracts/interfaces/IWorldID.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IWorldID {
    /// @notice Verifies a WorldID proof
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param groupId The group ID for the proof.
    /// @param signalHash The hash of the signal to verify.
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param externalNullifierHash The hash of the external nullifier (returned by the JS widget).
    /// @param proof The zero knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external view;
}