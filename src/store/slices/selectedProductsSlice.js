import { createSlice } from "@reduxjs/toolkit";
import { xor } from "utils/utils";

const initialState = {
  selectedProducts: [],
  isAllSelected: false,
};

const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    setSelectedProduct(state, { payload }) {
      state.selectedProducts = xor(state.selectedProducts, payload);
    },
    setSelectedAllproduct(state, action) {
      state.isAllSelected = action.payload;
    },
    setIsAllSelected(state, action) {
      if (state.isAllSelected) {
        state.selectedProducts = action.payload;
      } else state.selectedProducts = [];
    },
    setClearAllSelectedProduct() {
      return initialState;
    },
  },
});

export const {
  setSelectedProduct,
  setSelectedAllproduct,
  setIsAllSelected,
  setClearAllSelectedProduct,
} = selectedProductsSlice.actions;

export default selectedProductsSlice.reducer;
