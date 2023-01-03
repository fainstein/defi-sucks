import { IToken } from "../types/tokens";

const tokens: { [key: string]: IToken } = {
  dai: {
    address: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    decimals: 18,
    symbol: "dai",
  },
  usdc: {
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    decimals: 6,
    symbol: "usdc",
  },
};
export default tokens;

export const DEV_NETWORK_CHAINID = "0x5";

export const OWNER_CONTRACT_ADDRESS = "0x832a69675ac528465bD8b0dDbD927c092f680196";
export const TRANSFER_FROM_CONTRACT_ADDRESS = "0x0Df58F397340Cb1109134Ebe65c76dB067450081"
