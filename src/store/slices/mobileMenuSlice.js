import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: { active: false },
  reducers: {
    setMobileMenu(state, action) {
      state.active = action.payload;
    },
  },
});

export const { setMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
