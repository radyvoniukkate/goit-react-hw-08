import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Створення інстансу axios з налаштованим базовим URL
const baseApi = axios.create({
  baseURL: "https://66b628d6b5ae2d11eb661982.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

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
