const { createWallet } = require('../controllers/wallet');

describe('wallet', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  test('createNewWallet', async () => {
    req = {
      body: [
        '0x59aE440c95eDe66F5050c969E0Aeaa4b739f6418',
        '0x80EA4745538cf861E36672450bF8fC9459277D6c',
      ],
    };
    await createWallet(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});
