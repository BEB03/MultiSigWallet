// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MultiSigWallet {
    
    // storage
    uint transactionCount;
    address[2] owners;
    mapping (address => bool) isOwner;
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
        require(isOwner[msg.sender]);
        _;
    }

    // event
    event Add (uint indexed transactionCount, Transaction transaction);
    event Confirmation(bool isConfirm, address owner);
    event Execute(address receipt, uint value);

    // enum 

    // constructor
    constructor(address[2] memory _owners) payable {
        owners = _owners;
        for (uint i=0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
    }

    // function
    function addTransaction(address _receipt, uint _value) onlyOwners() public {

        transactionCount++;

        transactions[transactionCount] = Transaction({
            receipt: _receipt,
            value: _value,
            isExecuted: false
        });

        emit Add(transactionCount, transactions[transactionCount]);
    }

    function confirmTransaction(uint _transactionId) onlyOwners() public {

        confirmation[_transactionId][msg.sender] = true;

        emit Confirmation(confirmation[_transactionId][msg.sender], msg.sender);
    }

    function executeTransaction(uint _transactionId) onlyOwners() public {

        Transaction memory target = transactions[_transactionId];

        require(target.isExecuted == false, "already executed");
        require(checkConfirmation(_transactionId) ==  true);

        target.isExecuted = true;
        
        (bool success, ) = target.receipt.call{value: target.value}("");
        require(success);
        emit Execute(target.receipt, target.value);
    }

    function checkConfirmation (uint _transactionId) internal view returns (bool) {
        for (uint i=0; i<owners.length; i++) {
            if (!confirmation[_transactionId][owners[i]]) {
                return false;
            }
        }
        return true;
    }

    // function revokeTransaction(uint _transactionId) onlyOwners() public {
    //     require(confirmation[_transactionId][msg.sender] = true);
    //     confirmation[_transactionId][msg.sender] = false;
    // }
}

