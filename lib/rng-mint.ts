export const RngMintAddress = "0x43A804f91DFa4c331FF226d2F6ECAcDf8d56a82c";

export const RngMintABI = [
    {
        "inputs": [],
        "name": "MintFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlySupraRouter",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RandomnessRequestFailed",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "requester",
                "type": "address"
            }
        ],
        "name": "MintRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Minted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "rng_list",
                "type": "uint256[]"
            }
        ],
        "name": "mintRandomAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "mintTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;