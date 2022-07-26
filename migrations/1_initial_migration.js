const Migrations = artifacts.require("Migrations");
const MultiSigWallet = artifacts.require("MultiSigWallet");
const MultiSigWalletFactory = artifacts.require("MultiSigWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
