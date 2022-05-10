const fs = require('fs');
const { ethers } = require('hardhat');
const hre = require('hardhat');

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
  log(`Deployed contract at address: ${MyNFT.address}`);
  let filepath = "./img/img.svg";
  let file = fs.readFileSync(filepath, { encoding: "utf8" });
  const contract = await ethers.getContractFactory("MyNFT");
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const nft = new ethers.Contract(MyNFT.address, contract.interface);
}