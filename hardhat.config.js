require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    namedAccounts: {
        firstAccount: {
            default: 0
        }
    },
    gasReporter: {
        enabled: false,
        // currency: "USD",
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        // token: "ETH"
    }
}; 
