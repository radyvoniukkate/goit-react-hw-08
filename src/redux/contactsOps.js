import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    console.log("Fetching contacts..."); // Лог до запиту
    try {
      const response = await axios.get(
        "https://66b628d6b5ae2d11eb661982.mockapi.io/contacts"
      );
      console.log("API Response Data:", response.data); // Лог даних з API
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
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://66b628d6b5ae2d11eb661982.mockapi.io/contacts",
        newContact,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(
        `https://66b628d6b5ae2d11eb661982.mockapi.io/contacts/${contactId}`
      );
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
