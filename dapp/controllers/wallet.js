const Web3 = require('web3');
const Wallet = require('../schemas/wallet');
const abi = require('../abi/MultiSigWalletFactoryABI');

const rpcURL = 'http://localhost:8545';
const web3 = new Web3(rpcURL);

const address = '0x25056CBEEB21FFC17EF438d581743D74e3733D6E';

const NameContract = new web3.eth.Contract(abi, address);

module.exports.createWallet = async (req, res, next) => {
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
        from: '0x87A3F25Ab7EaC1be96465cf4a6834dCf6Ad38d9e',
        gas: estimatedGas,
      });
    if (result) {
      await Wallet.create({
        address: callresult,
        owners: req.body.owners, // 처음에 요청을 보낼 때 배열 형태로 집어넣어야 하는데... 이것을 프론트에서 해야 하나 백에서 해야 하나
      });

      res.status(201).send({
        message: 'wallet create success',
        address: callresult,
        tx: result,
      });
    } else {
      res.status(404).send('wallet create failure');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// module.exports.get = async (req, res, next) => {
//   try {
//     // req : 지갑 주소
//     // 할 일 : db 뒤져서 해당 지갑 주소가 가지고 있는 wallet list Return 해주기
//   } catch (error) {}
// };

// module.exports.delete = async (req, res) => {
//   try {
//     // selfdestruct 사용하여 지갑 제거
//   } catch (error) {}
// };
