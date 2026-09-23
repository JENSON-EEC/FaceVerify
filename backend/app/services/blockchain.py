from web3 import Web3

RPC_URL = "http://127.0.0.1:8545"

CONTRACT_ADDRESS = Web3.to_checksum_address(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
)

CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "evidenceHash",
                "type": "bytes32",
            }
        ],
        "name": "recordVerification",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "evidenceHash",
                "type": "bytes32",
            }
        ],
        "name": "getVerification",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32",
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address",
            },
        ],
        "stateMutability": "view",
        "type": "function",
    },
]


class BlockchainService:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(RPC_URL))

        if not self.w3.is_connected():
            raise RuntimeError(
                "Could not connect to local Hardhat node."
            )

        self.contract = self.w3.eth.contract(
            address=CONTRACT_ADDRESS,
            abi=CONTRACT_ABI,
        )

        self.account = self.w3.eth.accounts[0]

    def record_evidence(self, evidence_hash: str):
        evidence_bytes = bytes.fromhex(evidence_hash)

        tx_hash = self.contract.functions.recordVerification(
            evidence_bytes
        ).transact({
            "from": self.account
        })

        receipt = self.w3.eth.wait_for_transaction_receipt(
            tx_hash
        )

        return {
            "transaction_hash": receipt["transactionHash"].hex(),
            "block_number": receipt["blockNumber"],
            "contract_address": CONTRACT_ADDRESS,
        }

    def get_evidence(self, evidence_hash: str):
        evidence_bytes = bytes.fromhex(evidence_hash)

        result = self.contract.functions.getVerification(
            evidence_bytes
        ).call()

        return {
            "evidence_hash": result[0].hex(),
            "timestamp": result[1],
            "submitter": result[2],
        }