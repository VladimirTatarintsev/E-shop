import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goodsApi";
import mobileMenuReducer from "./slices/mobileMenuSlice";
import sortReducer from "./slices/sortSlice";
import paginationReducer from "./slices/paginationSlice";
import productFiltersReducer from "./slices/productFilterSlice";
import orderReducer from "./slices/orderSlice";
import searchReducer from "./slices/searchSlice";
import selectedProductsReducer from "./slices/selectedProductsSlice";

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    mobileMenu: mobileMenuReducer,
    sort: sortReducer,
    pagination: paginationReducer,
    productFilters: productFiltersReducer,
    order: orderReducer,
    search: searchReducer,
    selectedProducts: selectedProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware),
});
