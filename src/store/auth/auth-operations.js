import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionEnded, handleProtectedError } from '../session';
import { api, token } from '../../api/client';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
    await api.post('/users/logout', null, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
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

      const res = await api.get('/users/current');

      return res.data;
    } catch (err) {
      return handleProtectedError(err, thunkAPI);
    }
  }
);
