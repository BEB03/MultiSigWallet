// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./MultiSigWallet.sol";

contract MultiSigWalletFactory {
    function createWallet(address[2] memory _owners) public returns (address)
    {
        MultiSigWallet wallet = new MultiSigWallet(_owners);
        return address(wallet);
    }
}