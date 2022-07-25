// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MultiSigWallet {
    // 상태 변수
    address[] public owners;
    
    // struct

    // modifier

    // event

    // enum 

    // constructor
    constructor(address[2] memory _owners) {
        owners = _owners;
    }

    // function
    function getAddress() public view returns (address) {
        return address(this);
    }
}