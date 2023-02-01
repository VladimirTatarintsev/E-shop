import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goodsApi";
import burgerMenuReducer from "./slices/burgerMenuSlice";
import selectedSortReducer from "./slices/selectedSortSlice";

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    burgerMenu: burgerMenuReducer,
    selectedSort: selectedSortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware),
});
