import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goodsApi";
import burgerMenuReducer from "./slices/burgerMenuSlice";

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    burgerMenu: burgerMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware),
});
