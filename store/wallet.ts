import { createSlice } from "@reduxjs/toolkit";
import { IWalletStore } from "../types/store";

const walletInitialState: IWalletStore = {
  walletAddress: "",
  daiBalance: "",
  usdcBalance: "",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: walletInitialState,
  reducers: {
    setWalletAddress(state, action) {
      state.walletAddress = action.payload;
    },
    setTokensBalance(state, action) {
      state.daiBalance = action.payload.daiBalance;
      state.usdcBalance = action.payload.usdcBalance;
    },
  },
});

export default walletSlice;
