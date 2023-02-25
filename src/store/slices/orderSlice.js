import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo: {
    id: null,
  },
  userContacts: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  delivery: {
    method: "",
    sum: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserContacts(state, action) {
      state.userContacts = {
        ...state.userContacts,
        [action.payload.name]: action.payload.value,
      };
    },
    setClearActiveInput(state, action) {
      state.userContacts = { ...state.userContacts, [action.payload.name]: "" };
    },
    setDelivery(state, action) {
      state.delivery.method = action.payload.value;
      state.delivery.sum = action.payload.price;
    },
    setOrderInfo(state, action) {
      state.orderInfo.id = action.payload;
    },
    setClearOrder(state) {
      return {
        orderInfo: { ...state.orderInfo },
        userContacts: { ...initialState.userContacts },
        delivery: { ...initialState.delivery },
      };
    },
  },
});

export const {
  setUserContacts,
  setClearActiveInput,
  setDelivery,
  setClearOrder,
  setOrderInfo,
} = orderSlice.actions;

export default orderSlice.reducer;
