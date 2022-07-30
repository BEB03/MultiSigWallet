const Web3 = require("web3");
const rpcURL = "http://localhost:8545";
const web3 = new Web3(rpcURL);

const abi = require("../abi/MultiSigWalletFactoryABI");
const address = "0x0e2a98CA25d8275b9e5591288D795f5035E6BF06";

const NameContract = new web3.eth.Contract(abi, address);

exports.createWallet = async (req, res) => {
  try {
    const result = await NameContract.methods.createWallet(req.body).call();
    if (result) {
      res.status(201).send("success createWallet", { data: result });
    } else {
      res.status(404).send("wrong");
    }
  } catch (error) {
    console.error(error);
  }
};
