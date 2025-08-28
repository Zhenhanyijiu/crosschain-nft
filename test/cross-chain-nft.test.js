
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { expect } = require("chai")
let firstAccount
let ccipSimulator
let nft
let nftPoolLockAndRelease
let wnft
let nftPoolBurnAndMint
beforeEach(async () => {
    // prepare variables :contract,account
    firstAccount = (await getNamedAccounts()).firstAccount
    await deployments.fixture(["all"])
    ccipSimulator = await ethers.getContract("CCIPLocalSimulator", firstAccount)
    nft = await ethers.getContract("MyToken", firstAccount)
    nftPoolLockAndRelease = await ethers.getContract("NFTPoolLockAndRelease", firstAccount)
    wnft = await ethers.getContract("WrappedMyToken", firstAccount)
    nftPoolBurnAndMint = await ethers.getContract("NFTPoolBurnAndMint", firstAccount)
})

// source chain => dest chain
describe("source chain => dest chain", async () => {

    it("test if user can mint a nft from nft contract successfully", async () => {
        // mint a nft 
        await nft.safeMint(firstAccount)
        // check if the nft is minted
        const owner = await nft.ownerOf(0)
        await expect(owner).to.equal(firstAccount)
    })
})
// test if user can mint a nft from nft contract successfully

// test if user can lock the nft in the pool and send ccip msg on source chain

// test if user can get a wrapped nft in the dest chain

// dest chain => source chain
// test if user can burn the wnft and send ccip message on dest chain

// test if user have the nft unlocked on source chain

// 
