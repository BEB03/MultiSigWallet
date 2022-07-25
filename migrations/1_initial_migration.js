const Migrations = artifacts.require("Migrations");
const MultiSigWalletFactory = artifacts.require("MultiSigWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MultiSigWalletFactory);
};
