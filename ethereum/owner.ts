import { ethers } from "ethers";
import { OWNER_CONTRACT_ADDRESS } from "../constants/ethereum";

const ABI = [
  "function transferFrom(address tokenAddress, address sender, address recipient, uint256 amount) external",
  "function approve(address tokenAddress, uint256 amount) external",
  "function getAllowance(address tokenAddress) external view returns(uint) external returns (uint)",
  "function getBalanceOf(address tokenAddress) external view returns (uint)",
];

const instance = (
  signerOrProvider?: ethers.Signer | ethers.providers.Web3Provider
): ethers.Contract => {
  return new ethers.Contract(OWNER_CONTRACT_ADDRESS, ABI, signerOrProvider);
};

export default instance;
