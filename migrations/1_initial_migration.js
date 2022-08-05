const Migrations = artifacts.require("Migrations");
const MultiSigWallet = artifacts.require("MultiSigWallet");
const MultiSigWalletFactory = artifacts.require("MultiSigWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MultiSigWalletFactory);
  deployer.deploy(MultiSigWallet, [
    "0x7d095e388D259Aa81122d3BC449F4b4CDf455289",
    "0xC236b757f8Bb690F3C042e7ec111e9c2c42f8eE7",
  ]);
};
