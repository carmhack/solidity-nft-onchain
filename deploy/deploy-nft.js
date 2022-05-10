const fs = require('fs');
const { ethers } = require('hardhat');
const hre = require('hardhat');
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
  const MyNFT = await deploy('MyNFT', {
    from: deployer,
    log: true
  });
  log(`Deployed contract at address: ${MyNFT.address}\nDeployer: ${deployer}`);
  
  const contract = await ethers.getContractFactory("MyNFT");
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  const nft = new ethers.Contract(MyNFT.address, contract.interface, signer);
  const networkName = networkConfig[chainId]['name'];
  log(`Verify with: \nnpx hardhat verify --network ${networkName} ${nft.address}`);
  /*
  let filepath = "./img/img.svg";
  let file = fs.readFileSync(filepath, { encoding: "utf8" });

  let tx = await nft.create(file);
  let receipt = await tx.wait(1);
  log(`You made an NFT!`);
  log(`tokenURI: ${await nft.tokenURI(0)}`);
  */
}