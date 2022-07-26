const MultiSigWallet = artifacts.require("MultiSigWallet");
const deployedMultiSig = (owners) => {
  return MultiSigWallet.new(owners);
};

contract("MultiSigWallet.sol", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await deployedMultiSig([accounts[0], accounts[1]]);
  });

  it("test for addTransaction", async () => {
    const response = await instance.addTransaction(accounts[2], 10);

    assert.ok(response);
    assert.equal(response.logs[0].args.transactionCount.words[0], 1);
  });
  it("test for confirmTransaction", async () => {
    const response = await instance.confirmTransaction();
    // 만들어진 트랜잭션을 허용할 것인지 승인
    // 트랜잭션 아이디로 구분
    // 지갑 오너만 사용할 수 있음
  });
  it("test for executeTransaction", async () => {
    const response = await instance.executeTransaction();
    // 트랜잭션 아이디로 구분
    // 실제로 트랜잭션(송금)을 실행한다
    // 지갑 오너만 사용할 수 있음
    // 지갑 주인이 모든 confirm해야만 실행할 수 있음
  });
});
