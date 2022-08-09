const Web3 = require('web3');
const abi = require('../abi/MultiSigWalletABI');

const rpcURL = 'http://localhost:8545';
const web3 = new Web3(rpcURL);

const address = '0x4ec0089C5945Eb8e0faA42321417DDEfeD5a195A';

const NameContract = new web3.eth.Contract(abi, address, {
  from: '0x743db399564D53e3e1789D49c907A605D21A22BF',
});

exports.addTransaction = async (req, res) => {
  try {
    const result = await NameContract.methods
      .addTransaction(req.body.receipt, req.body.value)
      .send();
    if (result) {
      res.status(201).send('transaction created', { data: result });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
  }
};
