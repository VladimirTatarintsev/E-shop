import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
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

export const { setSelectedSort } = sortSlice.actions;

export default sortSlice.reducer;
