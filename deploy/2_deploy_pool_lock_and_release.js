module.exports = async function ({ getNamedAccounts, deployments }) {
    const firstAccount = await getNamedAccounts();
    const { deploy, log } = deployments;
    log("Deploying PoolLockAndRelease ...");
    const PoolLockAndRelease = await deploy("PoolLockAndRelease", {
        contract: "PoolLockAndRelease",
        from: firstAccount,
        log: true,
        args: [""],
    })
    log(`PoolLockAndRelease deployed at address: ${PoolLockAndRelease.address}`);
}
module.exports.tags = ["PoolLockAndRelease", "all"];