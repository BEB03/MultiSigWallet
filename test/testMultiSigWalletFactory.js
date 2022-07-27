const MultiSigWalletFactory = artifacts.require("MultiSigWalletFactory");

contract("MultiSigWalletFactory.sol", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await MultiSigWalletFactory.new();
  });

  it("test for deploy by Factory", async () => {
    const response = await instance.createWallet([accounts[0], accounts[1]]);
    expect(typeof response).equal("object");
  });
});
