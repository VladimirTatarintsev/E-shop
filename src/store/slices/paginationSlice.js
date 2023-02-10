import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1,
    limit: 20,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = Number(action.payload);
    },
    setLimit(state, action) {
      state.limit = Number(action.payload);
    },
  },
});

export const { setCurrentPage, setLimit } = paginationSlice.actions;

export default paginationSlice.reducer;
