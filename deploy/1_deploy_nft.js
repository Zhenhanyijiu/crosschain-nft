module.exports = async (getNamedAccount, deployments) => {
    const firstAccount = await getNamedAccount()
    const { deploy, log } = deployments
    log("Deploying NFT contract...")
    const nft = await deploy("MyToken", {
        contract: "MyToken",
        from: firstAccount,
        args: ["MyToken", "MT"],
        log: true,
    })
    log(`NFT contract deployed at ${nft.address}`)
}
module.exports.tags = ["sourcechain", "all"]