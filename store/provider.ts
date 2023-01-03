import { createSlice } from "@reduxjs/toolkit";
import { IProvider } from "../types/store";

const providerInitiallState: IProvider = {};

const providerSlice = createSlice({
  name: "provider",
  initialState: providerInitiallState,
  reducers: {
    setProviderAndSigner(state, action) {
      state.provider = action.payload.provider;
      state.signer = action.payload.signer;
    },
  },
});

export default providerSlice;
