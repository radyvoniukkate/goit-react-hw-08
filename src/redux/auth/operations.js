import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { persistToken, clearToken } from "../tokenPersist";
import {
  loginSuccess,
  logout as logoutAction, // перейменовуємо екшен при імпорті
  refreshUserStart,
  refreshUserSuccess,
  refreshUserFailure,
} from "./slice";

// Налаштування базової URL для всіх запитів
axios.defaults.baseURL = "https://connections-api.goit.global";


// Операція реєстрації користувача
export const register = createAsyncThunk(
  "auth/register",
  async (userData, {dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", userData);
      persistToken(response.data.token);
      dispatch(loginSuccess(response.data)); // Автоматичне логінування після реєстрації
      return response.data;
    } catch (error) {
      console.error("API error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
 

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", userData);
      persistToken(response.data.token); // Зберігаємо токен
      dispatch(loginSuccess(response.data)); // Зберігаємо дані користувача в Redux
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);



// Операція виходу з додатка
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/users/logout");
      clearToken();
      dispatch(logoutAction()); // Вихід з облікового запису
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (token === null) {
      return rejectWithValue("No token found");
    }

    dispatch(refreshUserStart());

    try {
      const response = await axios.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(refreshUserSuccess(response.data));
    } catch (error) {
      clearToken();
      dispatch(refreshUserFailure());
      return rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
);

