import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import tokens, { DEV_NETWORK_CHAINID } from "../constants/ethereum";

import OwnerContractInstance from "../ethereum/owner";

import { walletActions, providerActions } from "../store";
import { useDispatch } from "react-redux";
import store from "../store/index";
import { useSnackbar } from "notistack";

interface IConnect {
  isLoading: boolean;
  updateBalances: () => Promise<void>;
}

const Connect = (): IConnect => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const fetchTokenBalance = async (
    tokenAddress: string,
    decimals: number
  ): Promise<string> => {
    const { signer } = store.getState().provider;
    const transferTokenContract = OwnerContractInstance(signer);
    let tokenBalance = await transferTokenContract.getBalanceOf(tokenAddress);
    return (tokenBalance / Math.pow(10, decimals)).toString();
  };

  const updateBalances = useCallback(async (): Promise<void> => {
    const usdcBalance = await fetchTokenBalance(
      tokens.usdc.address,
      tokens.usdc.decimals
    );
    const daiBalance = await fetchTokenBalance(
      tokens.dai.address,
      tokens.dai.decimals
    );
    store.dispatch(walletActions.setTokensBalance({ daiBalance, usdcBalance }));
  }, []);

  const onLoad = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if ((await provider.getNetwork()).chainId !== +DEV_NETWORK_CHAINID) {
        // Wrong network
        if (!window.ethereum) {
          setIsLoading(false);
          enqueueSnackbar(
            "MetaMask is not installed. Please consider installing it: https://metamask.io/download/",
            { variant: "error" }
          );
          return;
        }
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: DEV_NETWORK_CHAINID }],
          });
          onLoad();
          setIsLoading(false);
        } catch (switchError: any) {
          if (switchError.code !== -32002) {
            enqueueSnackbar(
              "An error ocurred connecting to your wallet. Please check you have MetaMask installed.",
              { variant: "error" }
            );
          }
          return;
        }
      } else {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        dispatch(providerActions.setProviderAndSigner({ provider, signer }));
        const walletAddress = await signer.getAddress();
        dispatch(walletActions.setWalletAddress(walletAddress));

        await updateBalances();
      }
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download/",
        { variant: "error" }
      );
    }

    setIsLoading(false);
  }, [dispatch, enqueueSnackbar, updateBalances]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return { isLoading, updateBalances };
};

export default Connect;
