const { addTransaction } = require("../controllers/transaction");

describe("transaction", () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  test("addTransaction", async () => {
    req = {
      body: {
        receipt: "0xaC73A771F44622915834056Ba85f529Ac91D0557",
        value: "10",
      },
    };
    await addTransaction(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});
