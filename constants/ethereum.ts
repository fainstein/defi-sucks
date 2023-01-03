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

export const OWNER_CONTRACT_ADDRESS =
  "0x43cAd48F8A7191E89057862FbaC4D3766313C7b5";
