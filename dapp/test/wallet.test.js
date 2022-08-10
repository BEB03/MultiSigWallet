const mongoose = require('mongoose');
const { createWallet } = require('../controllers/wallet');
const wallet = require('../controllers/transaction');
const connect = require('../schemas');

beforeAll(async () => {
  await connect();
});

describe('wallet', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  test('createNewWallet', async () => {
    const req = {
      body: {
        owners: [
          '0x59aE440c95eDe66F5050c969E0Aeaa4b739f6418',
          '0x80EA4745538cf861E36672450bF8fC9459277D6c',
        ],
      },
    };

    await createWallet(req, res);

    expect(res.status).toBeCalledWith(201);
  });
});

describe('transaction', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  test('addTransaction', async () => {
    const req = {
      body: {
        receipt: '0x443a8A0C6CD61Df41367f4a807aE4693f78aD1f2',
        value: '100',
      },
    };

    await wallet.addTransaction(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.send).toBeCalledWith('');
  });

  test('confirmTransaction', async () => {
    const req = {
      body: {
        count: 1,
        owner: '0x87A3F25Ab7EaC1be96465cf4a6834dCf6Ad38d9e',
      },
    };

    await wallet.confirmTransaction(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test('executeTransaction', async () => {
    const req0 = {
      body: {
        receipt: '0x443a8A0C6CD61Df41367f4a807aE4693f78aD1f2',
        value: '100',
      },
    };

    const req = {
      body: {
        count: 0,
        owner: '0x87A3F25Ab7EaC1be96465cf4a6834dCf6Ad38d9e',
      },
    };

    const req2 = {
      body: {
        count: 0, // 왜 0만 작동하나?
        owner: '0xdaEc2E02052EBb52aC10D33F2e22b04Df3219102',
      },
    };

    // 트랜잭션 먼저 생성
    await wallet.addTransaction(req0, res);

    // confirm 이 되는 것을 테스트로 작성해야 함.
    await wallet.confirmTransaction(req, res);
    await wallet.confirmTransaction(req2, res);

    await wallet.executeTransaction(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
