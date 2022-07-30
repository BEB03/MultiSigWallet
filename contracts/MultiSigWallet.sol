// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MultiSigWallet {
    
    // storage
    uint transactionCount;
    address[2] owners;
    mapping (uint => Transaction) transactions;
    mapping (uint => mapping (address => bool)) confirmation;

    // struct
    struct Transaction {
        address receipt;
        uint value;
        bool isExecuted;
    }

    // modifier
    modifier onlyOwners() {
        require(msg.sender == owners[0] || msg.sender == owners[1] );
        _;
    }

    // event
    event Add (uint indexed transactionCount, Transaction transaction);
    event Confirmation(bool isConfirm, address owner);
    event Execute(address receipt, uint value);

    // enum 

    // constructor
    constructor(address[2] memory _owners) payable{
        owners = _owners;
    }

    // function
    function addTransaction(address _receipt, uint _value) onlyOwners() public {

        uint transactionId = transactionCount;

        transactions[transactionId] = Transaction({
            receipt: _receipt,
            value: _value,
            isExecuted: false
        });

        transactionCount++;

        emit Add(transactionCount, transactions[transactionId]);
    }

    function confirmTransaction(uint _transactionId) onlyOwners() public {

        confirmation[_transactionId][msg.sender] = true;
        emit Confirmation(confirmation[_transactionId][msg.sender], msg.sender);
    }

    function executeTransaction(uint _transactionId) onlyOwners() public {

        Transaction memory target = transactions[_transactionId];

        require(target.isExecuted == false, "already executed");
        require(confirmation[_transactionId][owners[0]] == true && confirmation[_transactionId][owners[1]] == true);

        target.isExecuted = true;
        
        (bool success, ) = target.receipt.call{value: target.value}("");
        require(success);
        emit Execute(target.receipt, target.value);
    }

}
