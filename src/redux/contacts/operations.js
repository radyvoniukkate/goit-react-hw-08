import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Створення інстансу axios з налаштованим базовим URL
const baseApi = axios.create({
  baseURL: "https://connections-api.goit.global",
  headers: {
    "Content-Type": "application/json",
  },
});

// Додавання інтерцептора для авторизації
baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch Contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await baseApi.get("/contacts");
      return response.data;
      
    } catch (error) {
      console.log("Error fetching contacts:", error.message); // Лог помилки
      return rejectWithValue(error.message);
    }
  }
);

// Add Contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await baseApi.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await baseApi.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
