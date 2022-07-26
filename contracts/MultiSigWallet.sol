// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MultiSigWallet {
    
    // storage
    address[2] owners;
    mapping (uint => Transaction) transactions;
    uint public transactionCount;

    // struct
    struct Transaction {
        address receipt;
        uint value;
        bool isExcuted;
    }

    // modifier

    // event
    event Add (uint indexed transactionCount);

    // enum 

    // constructor
    constructor(address[2] memory _owners){
        _owners = owners;
    }

    // function
    function addTransaction(address _receipt, uint _value) public {
        transactions[transactionCount] = Transaction({
            receipt: _receipt,
            value: _value,
            isExcuted: false
        });
        transactionCount++;
        emit Add(transactionCount);
    }

    function confirmTransaction() public {

    }

    function executeTransaction() public {

    }

}