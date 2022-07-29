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
    const response = await instance.confirmTransaction(0, {
      from: accounts[0],
    });

    assert.ok(response);
    assert.equal(utilities.getParamFromTx(response, "isConfirm"), true);
    assert.equal(utilities.getParamFromTx(response, "owner"), accounts[0]);

    // owners만 호출 가능함
    await utilities.tryCatch(() =>
      instance.confirmTransaction(0, {
        from: accounts[2],
      })
    );

    // execute에서 확인해야 하므로 1도 승인해 둠
    await instance.confirmTransaction(0, { from: accounts[1] });
  });

  it("executeTransaction", async () => {
    const response = await instance.executeTransaction(0, {
      from: accounts[0],
    });

    const receiptBalance = await web3.eth.getBalance(accounts[2]);

    assert.ok(response);

    assert.equal(web3.utils.fromWei(receiptBalance), 101);

    // owners만 호출 가능함 : confirmTransaction에서 테스트 하였으므로 생략

    // 하나의 transaction 당 한 번만 호출 가능함
    const response2 = await instance.executeTransaction(0, {
      from: accounts[0],
    });

    console.log(response == response2);
    const receiptBalance2 = await web3.eth.getBalance(accounts[2]);
    assert.equal(web3.utils.fromWei(receiptBalance2), 102);

    // 지갑 주인이 모두 confirm해야만 실행할 수 있음
    await utilities.tryCatch(() =>
      instance.executeTransaction(1, {
        from: accounts[0],
      })
    );
  });
});

/*

메모장

  // 에러가 나는 경우의 테스트를 도대체 어떻게 해야 하나

  배열도 오브젝트다. 배열 확인은 array.isarray()로 하자.

  call, 저수준 등을 사용해서 작업하고 있었음. 왜일까? : send나 transfer 보다 call이 '추천'됨. 이유까지는 확인하지 못하였음 : 이스탄불 하드포크로 opcode 가스비가 증가해서 고정 가스 사용하는 send transfer는 사용하지 않음.

  보내기 작동 안되네 뭐지 : payable 로 받는 주소를 설정하자.

  beforeeach : 각 it이 실행되기 전에 한 번씩 실행됨
  before : 해당 테스트가 시작되기 전에 1번만 실행됨


*/
