import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBrands: [],
  selectedPriceFrom: "0",
  selectedPriceTo: "999999",
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setSelectedFilters(state, { payload }) {
      state.selectedBrands = payload;
    },
    setFilterPriceFrom(state, { payload }) {
      if (payload === "") {
        return { ...state, selectedPriceFrom: "0" };
      } else state.selectedPriceFrom = payload;
    },
    setFilterPriceTo(state, { payload }) {
      if (payload === "") {
        return { ...state, selectedPriceTo: "999999" };
      } else state.selectedPriceTo = payload;
    },
    setClearAllFilters() {
      return initialState;
    },
  },
});

export const {
  setSelectedFilters,
  setFilterPriceFrom,
  setFilterPriceTo,
  setClearAllFilters,
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
