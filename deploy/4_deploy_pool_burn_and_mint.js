// const { getNamedAccounts } = require("hardhat")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { firstAccount } = await getNamedAccounts();
    const { deploy, log } = deployments;
    log("Deploying NFTPoolBurnAndMint ...");


    //  address _router, address _link, address wnftAddr
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
    const destchainRouter = ccipConfig.destinationRouter_
    const LinkTokenAddress = ccipConfig.linkToken_
    const wnftDeployment = await deployments.get("WrappedMyToken");
    const wnftAddr = wnftDeployment.address;

    await deploy("NFTPoolBurnAndMint", {
        contract: "NFTPoolBurnAndMint",
        from: firstAccount,
        log: true,
        // 参数依赖于第三方服务
        args: [destchainRouter, LinkTokenAddress, wnftAddr],
    })
    log(`NFTPoolBurnAndMint deployed successfully`);
}
module.exports.tags = ["destchain", "all"];