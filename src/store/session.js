import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

export const sessionEnded = createAction('auth/sessionEnded');

export const handleProtectedError = (error, thunkAPI) => {
  const state = thunkAPI.getState();
  const requestId = thunkAPI.requestId;

  const isCurrentRequest =
    state.auth.refreshRequestId === requestId ||
    state.contacts.fetchRequestId === requestId ||
    state.contacts.mutationRequests[requestId] === true;

  if (!isCurrentRequest) {
    return thunkAPI.rejectWithValue({
      stale: true,
    });
  }

  const status = error.response?.status ?? null;

  if (status === 401) {
    delete axios.defaults.headers.common.Authorization;
    thunkAPI.dispatch(sessionEnded());
  }

  return thunkAPI.rejectWithValue({
    status,
    message:
      status === null
        ? 'Unable to connect to the server. Please try again.'
        : 'The request failed. Please try again.',
  });
};
