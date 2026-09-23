from web3 import Web3
import hashlib
import time

RPC_URL = "http://127.0.0.1:8545"

CONTRACT_ADDRESS = Web3.to_checksum_address(
    "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
)

ABI = [
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


w3 = Web3(Web3.HTTPProvider(RPC_URL))

print("Connected:", w3.is_connected())
print("Chain ID:", w3.eth.chain_id)
print("Latest block:", w3.eth.block_number)
print("Contract:", CONTRACT_ADDRESS)

# Check contract code
code = w3.eth.get_code(CONTRACT_ADDRESS)

print("Contract bytecode length:", len(code))

if len(code) <= 2:
    raise RuntimeError(
        "NO CONTRACT CODE FOUND at this address."
    )

print("Contract code found!")

# Create contract instance
contract = w3.eth.contract(
    address=CONTRACT_ADDRESS,
    abi=ABI,
)

# Hardhat's first unlocked account
account = w3.eth.accounts[0]

print("Account:", account)

# Generate a unique evidence hash
payload = f"FaceVerify blockchain test {time.time_ns()}".encode()

evidence_hash = hashlib.sha256(payload).hexdigest()

evidence_bytes = bytes.fromhex(evidence_hash)

print("Evidence hash:", evidence_hash)

# Send transaction
print("\nSubmitting transaction...")

tx_hash = contract.functions.recordVerification(
    evidence_bytes
).transact({
    "from": account
})

print("Transaction hash:", tx_hash.hex())

# Wait for transaction
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print("Transaction status:", receipt.status)
print("Block number:", receipt.blockNumber)

if receipt.status != 1:
    raise RuntimeError("Blockchain transaction failed.")

# Read data back
print("\nReading verification from blockchain...")

result = contract.functions.getVerification(
    evidence_bytes
).call()

stored_hash = result[0].hex()
timestamp = result[1]
submitter = result[2]

print("Stored hash:", stored_hash)
print("Timestamp:", timestamp)
print("Submitter:", submitter)

print("\nHash matches:", stored_hash == evidence_hash)

if stored_hash != evidence_hash:
    raise RuntimeError("Stored hash does not match.")

print("\n================================")
print("BLOCKCHAIN TEST PASSED")
print("================================")