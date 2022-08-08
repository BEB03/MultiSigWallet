const MultiSigWallet = artifacts.require("MultiSigWallet");
const utilities = require("./utilities");

contract("MultiSigWallet.sol", (accounts) => {
  let instance;

  before(async () => {
    instance = await MultiSigWallet.new([accounts[0], accounts[1]], {
      value: web3.utils.toBN(10 ** 19),
    });
    web3;
  });

  it("addTransaction", async () => {
    const response = await instance.addTransaction(
      accounts[2],
      web3.utils.toBN(10 ** 18)
    );

    assert.ok(response);
    assert.equal(utilities.getParamFromTx(response, "transactionCount"), 1);
    assert.equal(
      utilities.getParamFromTx(response, "transaction", "receipt"),
      accounts[2]
    );
  });

  it("confirmTransaction", async () => {
    const response = await instance.confirmTransaction(1, {
      from: accounts[0],
    });

    assert.ok(response);
    assert.equal(utilities.getParamFromTx(response, "isConfirm"), true);
    assert.equal(utilities.getParamFromTx(response, "owner"), accounts[0]);

    // owners만 호출 가능함
    await utilities.tryCatch(() =>
      instance.confirmTransaction(1, {
        from: accounts[2],
      })
    );

    // execute에서 확인해야 하므로 1도 승인해 둠
    await instance.confirmTransaction(1, { from: accounts[1] });
  });

  it("executeTransaction", async () => {
    const response = await instance.executeTransaction(1, {
      from: accounts[0],
    });

    const receiptBalance = await web3.eth.getBalance(accounts[2]);

    assert.ok(response);

    assert.equal(web3.utils.fromWei(receiptBalance), 101);

    // 하나의 transaction 당 한 번만 호출 가능함

    // 지갑 주인이 모두 confirm해야만 실행할 수 있음
    await utilities.tryCatch(() =>
      instance.executeTransaction(1, {
        from: accounts[0],
      })
    );
  });
});
