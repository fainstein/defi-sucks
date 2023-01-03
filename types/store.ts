import { ethers } from "ethers";

export interface IWalletStore {
  walletAddress: string;
  daiBalance: string;
  usdcBalance: string;
}

export interface IProvider {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
}

export interface IAppStore {
  wallet: IWalletStore;
  provider: IProvider;
}
