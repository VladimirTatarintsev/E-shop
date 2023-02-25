import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setClearSearchInput() {
      return initialState;
    },
  },
});

export const { setSearchQuery, setClearSearchInput } = searchSlice.actions;

export default searchSlice.reducer;
