const Web3 = require('web3');
const abi = require('../abi/MultiSigWalletABI');

const rpcURL = 'http://localhost:8545';
const web3 = new Web3(rpcURL);

const address = '0xd1FC7E6A904b42Ad31722d4E849E1aCe0344a272';

const NameContract = new web3.eth.Contract(abi, address);

module.exports.addTransaction = async (req, res, next) => {
  try {
    const result = await NameContract.methods
      .addTransaction(req.body.receipt, req.body.value)
      .send({
        from: '0x87A3F25Ab7EaC1be96465cf4a6834dCf6Ad38d9e',
        gas: 3000000,
      });
    if (result) {
      res.status(201).send({
        message: 'addTransaction created',
        data: result,
      });
    } else {
      res.status(404).send('addTransaction failed');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports.confirmTransaction = async (req, res, next) => {
  try {
    const result = await NameContract.methods
      .confirmTransaction(req.body.count)
      .send({ from: req.body.owner });
    if (result) {
      res.status(200).send('confirmTransaction succeed');
    } else {
      res.status(404).send('confirmTransaction failed');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports.executeTransaction = async (req, res, next) => {
  try {
    const result = await NameContract.methods
      .executeTransaction(req.body.count)
      .send({ from: req.body.owner });
    if (result) {
      res.status(200).send('executeTransaction succeed');
    } else {
      res.status(404).send('executeTransaction failed');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
