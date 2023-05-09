# Connecting Wallet Project

This project is used to design, develop and test Reack components related to wallet signatures and the interaction with NFT contracts.

## Contract to interact with

The contract is based on the ERC-721 standard, provides the mintNFT function, and supports owners to issue their own NFT tokens. The address and ABI of the contract are defined in src/config.js.

## React components

### SignerContext

Use Context to store signer and account for other components to call.

### ConnectWallet by Web

Use Web3Provider to connect to the user wallet to obtain signer and account.

### ConnectWallet by Mobile

Use Web3Provider to connect to the user wallet to obtain signer and account.

### MintToken

Create an instance of the contract and call the mintNFT method to issue NFT tokens.

## Test

### Contract requirement

Note that you should update the contract information in src/config.js. In the default contract, only the owner has the right to mint coins.

### Starting script
```
npm start
```

### Some available URL
```
QmSCUqLg5NDhigjzYHKnTUfuodk9UZpdw1vgRp1Md1fFE5
QmNnx5uDQZzMXH6ALny2cDAHivrgz7ZhWvyoj3vnnJB6TC
QmRLcqFmDyi3M1zEstjd1rCooT2amNSdk7QgnGBGEu7XKJ
```