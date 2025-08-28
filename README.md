# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
#  跨链应用
目前有超过500条链，生态扩展需要，跨链操作越来越是必须的， [chainlist](https://chainlist.org/?locale=zh-CN)。

ERC721 是一个 NFT 标准，即非同质化通证。
| 特性     | ERC-721         | ERC-1155         |
| -------- | --------------- | ---------------- |
| 同质化   | 非同质化        | 同质化&非同质化  |
| 批次处理 | 每次处理1个通证 | 每次处理多个通证 |


## ERC-721 合约
1. 打开 [openzeppelin](https://www.openzeppelin.com/)，这里有很多合约标准。打开[合约标准库](https://www.openzeppelin.com/solidity-contracts)，可以创建自己得合约代码模板。
2. 将模板代码拷贝到自己的文件中
## 跨链项目初始化
1.  mkdir crosschain-nft
2.  npm init -y //-y 表示都是默认值
3.  npm install hardhat@^2.26.3 -D 
4.  npx hardhat init
5.  npm install -D @openzeppelin/contracts

## NFT 的 metadata
什么是合约的matedata，打开[opensea](https://opensea.io/)，可以注册去查看里面的 NFT。[Metadata 标准](https://docs.opensea.io/docs/metadata-standards)

## 去中心化存储
这里将数据存储在 [ipfs](https://ipfs.tech/) 上，一个p2p的内容传递网络。[filebase](https://filebase.com/)是一个提供将数据存储到ipfs上的服务，是免费的，需要注册。filebase 上存储自己的所需要的文件图片等，并提供url，供我们去访问。
1. 定义METADATA_URL
```
string constant METADATA_URL =
        "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/";
```
2. safeMint 函数中的 uri 参数去掉并替换为 METADATA_URL
3. 可以在先简单的使用 remix 环境去部署，以便有个大概的了解，可以在 [opensea testnet]() 上查看 我们自己部署的通证合约，注意部署的时候使用meta mask环境

## NFT 跨链
## ChainLink CCIP
## 通证跨链方式
### 通证跨链：burn & Mint
- 跨链过程
  - Token 在源链上被烧掉（burn），然后在目标链上被原生铸造（mint）。反过来，在目标链上被烧掉（burn），然后在源链上重新被铸造。
- 适用场景
  - Token 在多条链上都原生部署
  - 并且 CCIP 可以调用 Mint 和 Burn 函数。
  - 对于个人开发者而言，这种方式要求太高了

### 通证跨链：Lock & Mint
个人开发者更常用
- 跨链过程
  - 通证被锁在源链上的池子中，然后它的包装/合成/衍生资产在在目的链上被铸造（Mint）
  - 通证在目的链上被烧掉（burn），然后在源链上被解锁（unlock）。
- 使用案例
  - 只在一条链上发行的通证（比如LINK）
  - 带有编码约束的代币（supply/burn/mint）
因为目标上的资产是源链上的包装合成衍生资产，它基于源链部署的合约成立，由于目标链上的资产受源链控制，因此不需要lock，烧掉即可。

1. NFT 合约 通过 CCIP 到 Wrapped NFT 合约，实现跨链。
2. 新建文件 WappedMyToken.sol
3. 大部分只需要继承 MyToken 合约即可。
4. 
### NFT Pool
1. 创建 NFTPoolLockAndRelease.sol
2. 继承 [CCIP](https://docs.chain.link/ccip) 的合约
3. 找到 Send Arbitrary Data
4. 安装 npm install -D @chainlink/contracts-ccip
5. 创建 NFTPoolBurnAndMint.sol,这个文件的代码跟 NFTPoolLockAndRelease.sol 很像，直接复制，稍作修改即可。

### 多链部署脚本
1. 写部署脚本
2. 新建 deploy 文件夹
3. 新建文件 1_deploy_nft.js, 2_deploy_pool_lock_and_release.js, 3_deploy_wnft.js, 4_deploy_pool_burn_and_mint.js
4. 安装 hardhat-deploy 插件，打开官网，打开 hardhat-deploy 插件，点击installation章节，打开它的GitHub，直接复制命令到终端 npm install --save-dev @nomicfoundation/hardhat-ethers ethers hardhat-deploy hardhat-deploy-ethers，可以在 package.json 里面查看包是否安装成功。并在 hardhat.config.js 中引入这三个包。
5. 编写部署脚本，参考代码

### chainlink-local 
这里用到 ChainLink 的本地测试环境，需要 MOCK CCIP 合约
1. 安装chainlink-local, 可以在GitHub去搜索, npm install @chainlink/local -D
2. 新建合约 CCIPSimulator.sol, 并引入包
3. 编写 CCIPSimulator 合约的部署脚本，参考代码，新建 0_deploy_ccip_simulator.js
4. 编写  3_deploy_wnft.js 部署脚本
5. 编写  4_deploy_pool_burn_and_mint.js 部署脚本
6. 部署 npx hardhat deploy