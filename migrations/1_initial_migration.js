const Migrations = artifacts.require('Migrations');
const MultiSigWallet = artifacts.require('MultiSigWallet');
const MultiSigWalletFactory = artifacts.require('MultiSigWalletFactory');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MultiSigWalletFactory);
  deployer.deploy(MultiSigWallet, [
    '0x87A3F25Ab7EaC1be96465cf4a6834dCf6Ad38d9e',
    '0xdaEc2E02052EBb52aC10D33F2e22b04Df3219102',
  ]);
};
