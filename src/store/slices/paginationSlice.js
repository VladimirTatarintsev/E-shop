import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1,
    limit: 20,
    totalPages: null,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = Number(action.payload);
    },
    setLimit(state, action) {
      state.limit = Number(action.payload);
    },
    setTotalPages(state, action) {
      state.totalPages = Number(action.payload);
    },
  },
});

export const { setCurrentPage, setLimit, setTotalPages } =
  paginationSlice.actions;

export default paginationSlice.reducer;
