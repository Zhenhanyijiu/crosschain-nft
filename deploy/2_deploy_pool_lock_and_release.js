// const { getNamedAccounts } = require("hardhat")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { firstAccount } = await getNamedAccounts();
    const { deploy, log } = deployments;
    log("Deploying NFTPoolLockAndRelease ...");


    //  address _router, address _link, address nftAddr
    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator");
    // 获取合约对象,就是 0 号部署脚本中部署的合约对象
    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address);
    // 获取配置,配置具体信息可以在 GitHub 源代码中查看
    /*
    function configuration()
        public
        view
        returns (
            uint64 chainSelector_,
            IRouterClient sourceRouter_,
            IRouterClient destinationRouter_,
            WETH9 wrappedNative_,
            LinkToken linkToken_,
            BurnMintERC677Helper ccipBnM_,
            BurnMintERC677Helper ccipLnM_
        )
    */
    const ccipConfig = await ccipSimulator.configuration();
    const sourcechainRouter = ccipConfig.sourceRouter_
    const LinkTokenAddress = ccipConfig.linkToken_

    const nftDeployment = await deployments.get("MyToken");
    const nftAddr = nftDeployment.address;
    await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",
        from: firstAccount,
        log: true,
        // 参数依赖于第三方服务
        args: [sourcechainRouter, LinkTokenAddress, nftAddr],
    })
    log(`NFTPoolLockAndRelease deployed successfully`);
}
module.exports.tags = ["sourcechain", "all"];