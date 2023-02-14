import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    selectedValue: "price",
    selectedName: "по цене",
  },
  reducers: {
    setSelectedSort(state, action) {
      state.selectedValue = action.payload.value;
      state.selectedName = action.payload.name;
    },
  },
});

export const { setSelectedSort } = sortSlice.actions;

export default sortSlice.reducer;
