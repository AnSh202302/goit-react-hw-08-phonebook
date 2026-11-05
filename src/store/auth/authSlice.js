import { createSlice } from '@reduxjs/toolkit';
import { sessionEnded } from '../session';
import { register, logIn, fetchCurrentUser } from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  refreshError: null,
  refreshRequestId: null,
};

const authSlise = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(sessionEnded, () => ({
        ...initialState,
        user: { name: null, email: null },
      }))
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.isRefreshing = true;
        state.refreshError = null;
        state.refreshRequestId = action.meta.requestId;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (state.refreshRequestId !== action.meta.requestId) {
          return;
        }

        state.refreshRequestId = null;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.refreshError = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        if (state.refreshRequestId !== action.meta.requestId) {
          return;
        }

        state.refreshRequestId = null;
        state.isRefreshing = false;
        state.refreshError = null;

        if (state.token) {
          state.refreshError =
            action.payload?.status == null
              ? 'Unable to connect to the server. Please try again.'
              : 'Unable to restore your session. Please try again.';
        }
      });
  },
});
export const authReducer = authSlise.reducer;
