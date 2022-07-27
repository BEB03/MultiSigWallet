const MultiSigWallet = artifacts.require("MultiSigWallet");
const utilities = require("./utilities");

contract("MultiSigWallet.sol", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await MultiSigWallet.new([accounts[0], accounts[1]]);
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
    const response = await instance.confirmTransaction(0, {
      from: accounts[0],
    });

    assert.ok(response);
    assert.equal(utilities.getParamFromTx(response, "isConfirm"), true);
    assert.equal(utilities.getParamFromTx(response, "owner"), accounts[0]);
  });

  it("executeTransaction", async () => {
    const response = await instance.executeTransaction(accounts[2], 0, 0, {
      from: accounts[0],
    });
    const receiptBalance = await web3.eth.getBalance(accounts[2]);

    console.log(accounts[2]);
    assert.ok(response);
    assert.equal(web3.utils.fromWei(receiptBalance), 101);

    // 트랜잭션 아이디로 구분
    // 실제로 트랜잭션(송금)을 실행한다
    // 지갑 오너만 사용할 수 있음
    // 지갑 주인이 모든 confirm해야만 실행할 수 있음
  });
});

/*

메모장

  // 에러가 나는 경우의 테스트를 도대체 어떻게 해야 하나

  배열도 오브젝트다. 배열 확인은 array.isarray()로 하자.

  call, 저수준 등을 사용해서 작업하고 있었음. 왜일까? : send나 transfer 보다 call이 '추천'됨. 이유까지는 확인하지 못하였음

  보내기 작동 안되네 뭐지
*/
