const Wallet = require("../schemas/wallet");

const Web3 = require("web3");
const rpcURL = "http://localhost:8545";
const web3 = new Web3(rpcURL);

const abi = require("../abi/MultiSigWalletFactoryABI");
const address = "0x9d369e03f1B12c222b88059ccE015f7872B531Dd";

const NameContract = new web3.eth.Contract(abi, address);

module.exports.create = async (req, res) => {
  try {
    const estimatedGas = await NameContract.methods
      .createWallet(req.body.owners)
      .estimateGas();

    const callresult = await NameContract.methods
      .createWallet(req.body.owners)
      .call();

    const result = await NameContract.methods
      .createWallet(req.body.owners)
      .send({
        from: "0x7d095e388D259Aa81122d3BC449F4b4CDf455289",
        gas: estimatedGas,
      });
    if (result) {
      const wallet = await Wallet.create({
        address: callresult,
        owners: req.body.owners, // 처음에 요청을 보낼 때 배열 형태로 집어넣어야 하는데... 이것을 프론트에서 해야 하나 백에서 해야 하나
      });
      res.status(201).send({
        message: "wallet create success",
        data: result,
        calldata: callresult,
      });
    } else {
      res.status(404).send("wallet create failure");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    // req : 지갑 주소
    // 할 일 : db 뒤져서 해당 지갑 주소가 가지고 있는 wallet list Return 해주기
  } catch (error) {
    console.error(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    // selfdestruct 사용하여 지갑 제거
  } catch (error) {
    console.error(error);
  }
};

// const abi2 = require("../abi/MultiSigWalletABI");
// const address2 = "0xC250bF373b4681feE45Ec24c29d94d590600e35e";

// .addTransaction("0xF9fe721e33650716225C1a5eaC553ecA544b7134", 10000)
// .send({
//   from: "0x7d095e388D259Aa81122d3BC449F4b4CDf455289",
//   gas: 3000000,
// });
