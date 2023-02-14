import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  reducers: {},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
