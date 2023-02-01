import { createSlice } from "@reduxjs/toolkit";

const selectedSortSlice = createSlice({
  name: "selectedSort",
  initialState: {
    value: "price",
    name: "по цене",
  },
  reducers: {
    setSelectedSort(state, action) {
      state.value = action.payload.value;
      state.name = action.payload.name;
    },
  },
});

export const { setSelectedSort } = selectedSortSlice.actions;

export default selectedSortSlice.reducer;
