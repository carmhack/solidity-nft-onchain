const fs = require('fs');
const { ethers } = require('hardhat');
const { networkConfig } = require('../helper-hardhat-config');

module.exports = async({
  getNamedAccounts,
  deployments,
  getChainId
}) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  log("-----------------");
  const FlaggyNFT = await deploy('FlaggyNFT', {
    from: deployer,
    log: true
  });
  log(`Deployed contract at address: ${FlaggyNFT.address}\nDeployer: ${deployer}`);
  
  const contract = await ethers.getContractFactory("FlaggyNFT");
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  const nft = new ethers.Contract(FlaggyNFT.address, contract.interface, signer);
  const networkName = networkConfig[chainId]['name'];
  log(`Verify with: \nnpx hardhat verify --network ${networkName} ${nft.address}`);

  let filepath = "./img/flag.svg";
  let file = fs.readFileSync(filepath, { encoding: "utf8" });

  let tx = await nft.create(file);
  await tx.wait(1);
  log(`You made an NFT!`);
  log(`tokenURI: ${await nft.tokenURI(0)}`);
}