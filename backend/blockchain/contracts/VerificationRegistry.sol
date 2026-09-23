// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VerificationRegistry {

    struct Record {
        bytes32 evidenceHash;
        uint256 timestamp;
        address submitter;
    }

    mapping(bytes32 => Record) public records;

    event VerificationRecorded(
        bytes32 indexed evidenceHash,
        uint256 timestamp,
        address indexed submitter
    );

    function recordVerification(
        bytes32 evidenceHash
    ) external {

        require(
            records[evidenceHash].timestamp == 0,
            "Already recorded"
        );

        records[evidenceHash] = Record({
            evidenceHash: evidenceHash,
            timestamp: block.timestamp,
            submitter: msg.sender
        });

        emit VerificationRecorded(
            evidenceHash,
            block.timestamp,
            msg.sender
        );
    }

    function getVerification(
        bytes32 evidenceHash
    )
        external
        view
        returns (
            bytes32,
            uint256,
            address
        )
    {
        Record memory record =
            records[evidenceHash];

        return (
            record.evidenceHash,
            record.timestamp,
            record.submitter
        );
    }
}