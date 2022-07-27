// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MultiSigWallet {
    
    // storage
    uint public transactionCount;
    address[2] owners;
    mapping (uint => Transaction) transactions;
    mapping (uint => mapping (address => bool)) confirmation;

    // struct
    struct Transaction {
        address payable receipt;
        uint value;
        bool isExcuted;
    }

    // modifier
    modifier onlyOwners() {
        if (msg.sender == owners[0]) {
            _;
        } 
    }

    // event
    event Add (uint indexed transactionCount, Transaction transaction);
    event Confirmation(bool isConfirm, address owner);

    // enum 

    // constructor
    constructor(address[2] memory _owners){
        owners = _owners;
    }

    // function
    function addTransaction(address payable _receipt, uint _value) public {
        uint transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            receipt: _receipt,
            value: _value,
            isExcuted: false
        });
        transactionCount++;
        emit Add(transactionCount, transactions[transactionId]);
    }

    function confirmTransaction(uint _transactionId) onlyOwners() public {
        confirmation[_transactionId][msg.sender] = true;
        emit Confirmation(confirmation[_transactionId][msg.sender], msg.sender);
    }

    function executeTransaction(address payable _to, uint _value, uint _transactionId) onlyOwners() public {
        Transaction storage targetTx = transactions[_transactionId];

        _to.transfer(_value);
    }

}