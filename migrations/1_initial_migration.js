const Migrations = artifacts.require("Migrations");
const MultiSigWallet = artifacts.require("MultiSigWallet");
const MultiSigWalletFactory = artifacts.require("MultiSigWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MultiSigWalletFactory);
  deployer.deploy(MultiSigWallet, [
    "0x743db399564D53e3e1789D49c907A605D21A22BF",
    "0xD00Cb7Da08Af67A54cA18a0C89916687A6733Df7",
  ]);
};
