import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "mng6sBPCqF09rSgLnBgmOok_ztofIpgq";

const GOERLI_PRIVATE_KEY =
  "2af70b0e307c33feef3039e9d7e5759cf07d55a52da50472597c49889fc4a8aa";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};

export default config;
