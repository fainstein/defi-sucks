// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract Token is ERC20 {
    constructor() ERC20("Token", "TOK") {}
}
