import { createSlice } from "@reduxjs/toolkit";

const burgerMenuSlice = createSlice({
  name: "burgerMenu",
  initialState: { active: false },
  reducers: {
    setBurgerMenu(state, action) {
      state.active = action.payload;
    },
  },
});

export const { setBurgerMenu } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
