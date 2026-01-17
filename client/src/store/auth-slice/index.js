import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    authSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    authFail: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFail, logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;

/* ================== ASYNC ACTIONS ================== */

// REGISTER
export const registerUser = (formData) => async (dispatch) => {
  dispatch(authStart());

  try {
    const res = await axios.post(
      `http://localhost:5000/api/auth/register`,
      formData,
      { withCredentials: true },
    );

    dispatch(authFail(null)); // user not logged in after register
    return res.data; // 👈 VERY IMPORTANT
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    dispatch(authFail(message));
    return { success: false, message };
  }
};

// LOGIN
export const loginUser = (formData) => async (dispatch) => {
  dispatch(authStart());

  try {
    const res = await axios.post(
      `http://localhost:5000/api/auth/login`,
      formData,
      { withCredentials: true },
    );

    if (res.data.success) {
      dispatch(authSuccess(res.data.user));
    } else {
      dispatch(authFail(res.data.message));
    }

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    dispatch(authFail(message));
    return { success: false, message };
  }
};

// CHECK AUTH
export const checkAuth = () => async (dispatch) => {
  dispatch(authStart());

  try {
    const res = await axios.get(
      `http://localhost:5000/api/auth/check-auth`,
      { withCredentials: true },
    );

    if (res.data.success) {
      dispatch(authSuccess(res.data.user));
    } else {
      dispatch(authFail(null));
    }
  } catch {
    dispatch(authFail(null));
  }
};

// LOGOUT
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(
      `http://localhost:5000/api/auth/logout`,
      {},
      { withCredentials: true },
    );
  } finally {
    dispatch(logoutSuccess());
  }
};
