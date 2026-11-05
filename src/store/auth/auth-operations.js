import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionEnded, handleProtectedError } from '../session';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete axios.defaults.headers.common.Authorization;
  },
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status ?? null,
        data: err.response?.data ?? null,
      });
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status ?? null,
        data: err.response?.data ?? null,
      });
    }
  }
);

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  const currentToken = thunkAPI.getState().auth.token;

  token.unset();
  thunkAPI.dispatch(sessionEnded());

  if (!currentToken) {
    return;
  }

  try {
    await axios.post('/users/logout', null, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: err.response?.status ?? null,
    });
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue({
        status: null,
      });
    }

    try {
      token.set(persistedToken);

      const res = await axios.get('/users/current');

      return res.data;
    } catch (err) {
      return handleProtectedError(err, thunkAPI);
    }
  }
);
