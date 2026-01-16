import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/admin/addnewproduct",

  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/admin/fetchAllProducts",

  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`
    );

    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/admin/editProduct",

  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/admin/deleteProduct",

  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );

    return response?.data;
  }
);

const AdminProudctsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder
    .addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload?.data;
    })
    .addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    })
  }
});

export default AdminProudctsSlice.reducer