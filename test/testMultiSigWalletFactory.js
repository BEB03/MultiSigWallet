const MultiSigWalletFactory = artifacts.require("MultiSigWalletFactory");

contract("MultiSigWalletFactory.sol", () => {
  it("test for deploy by Factory", async () => {
    const instance = await MultiSigWalletFactory.deployed();
    const response = await instance.createWallet([
      "0x4fD169B6a82542DaA2E18c6065CE3d28721472D6",
      "0x64C67968875e5bA4ba6F0AF7991fFd87779fb16c",
    ]);
    expect(typeof response).equal("object");
  });
});
