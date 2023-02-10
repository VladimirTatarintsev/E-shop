import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  priceFrom: "0",
  priceTo: "999999",
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setSelectedFilters(state, { payload }) {
      state.brands = payload;
    },
    setFilterPriceFrom(state, { payload }) {
      if (payload === "") {
        return initialState;
      } else state.priceFrom = payload;
    },
    setFilterPriceTo(state, { payload }) {
      if (payload === "") {
        return initialState;
      } else state.priceTo = payload;
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
