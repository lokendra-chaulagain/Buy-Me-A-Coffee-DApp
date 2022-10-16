# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

<!-- Personal comments -->
mkdir contract
cd contract
npm init -y
npx hardhat init

Note; for older version we used this npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers

//nomicfoundation/hardhat-toolbox plugin bundles all the commonly used packages and Hardhat plugins
npm install --save-dev "hardhat@^2.11.2" "@nomicfoundation/hardhat-toolbox@^2.0.0"

//to run the script
npx hardhat run scripts/buyMeACoffee.js   ----local network
//from here our contract gets compiled and we gat our contract address as we consoled in the script
//0x5FbDB2315678afecb367f032d93F642f64180aa3 our contract address
