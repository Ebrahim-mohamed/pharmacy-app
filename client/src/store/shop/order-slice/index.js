import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// Create a new order without payment processing
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
      orderData
    );
    return response.data;
  }
);

// Confirm the order and update the status
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (orderId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/confirm`,
      { orderId }
    );
    return response.data;
  }
);

// Get all orders by user ID
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

// Get the details of a specific order
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearOrderList: (state) => {
      state.orderList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      .addCase(confirmOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // The order is now confirmed, and stock has been updated
        const confirmedOrder = action.payload.data;
        state.orderDetails = confirmedOrder;
      })
      .addCase(confirmOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { clearOrderList, resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
