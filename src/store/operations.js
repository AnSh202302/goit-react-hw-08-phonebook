import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleProtectedError } from './session';
import { api } from '../api/client';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (e) {
      return handleProtectedError(e, thunkAPI);
    }
  }
);

export const addContact = createAsyncThunk(
  '/contacts/addContact',
  async (text, thunkAPI) => {
    try {
      const response = await api.post('/contacts', text);
      return response.data;
    } catch (e) {
      return handleProtectedError(e, thunkAPI);
    }
  }
);

export const deleteContact = createAsyncThunk(
  '/contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await api.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return handleProtectedError(e, thunkAPI);
    }
  }
);

export const editContact = createAsyncThunk(
  '/contacts/editContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await api.patch(`/contacts/${id}`, {
        name,
        number,
      });
      return response.data;
    } catch (e) {
      return handleProtectedError(e, thunkAPI);
    }
  }
);
