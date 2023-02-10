import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goodsApi";
import burgerMenuReducer from "./slices/burgerMenuSlice";
import sortReducer from "./slices/sortSlice";
import paginationReducer from "./slices/paginationSlice";
import productFiltersReducer from "./slices/productFilterSlice";

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    burgerMenu: burgerMenuReducer,
    sort: sortReducer,
    pagination: paginationReducer,
    productFilters: productFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware),
});
