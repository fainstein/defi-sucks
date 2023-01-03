import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./wallet";
import providerSlice from "./provider";

const store = configureStore({
  reducer: { wallet: walletSlice.reducer, provider: providerSlice.reducer },
  middleware: (gDM) => gDM({ serializableCheck: false }),
});
export default store;

export const walletActions = walletSlice.actions;
export const providerActions = providerSlice.actions;
