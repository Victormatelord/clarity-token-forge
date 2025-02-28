# TokenForge
A platform for forging new token ecosystems on the Stacks blockchain.

## Features
- Create new fungible tokens with custom parameters
- Manage token lifecycle (mint, burn, transfer)
- Set token metadata (name, symbol, decimals)
- Configure token properties (mintable, burnable, transferable)
- Token owner management and permissions

## Setup and Installation
1. Clone the repository
2. Install Clarinet (if not already installed)
3. Run `clarinet check` to verify contracts
4. Run `clarinet test` to run test suite

## Usage Examples
```clarity
;; Create a new token
(contract-call? .token-forge create-token "MyToken" "MTK" u8 true true true)

;; Mint tokens
(contract-call? .token-forge mint u1000 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; Transfer tokens
(contract-call? .token-forge transfer u100 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG)
```

## Dependencies
- Clarity language
- Clarinet for testing and deployment
