import { createAction } from '@reduxjs/toolkit';
import { token } from '../api/client';

export const sessionEnded = createAction('auth/sessionEnded');

export const handleProtectedError = (error, thunkAPI) => {
  const state = thunkAPI.getState();
  const requestId = thunkAPI.requestId;

  const isCurrentRequest =
    state.auth.refreshRequestId === requestId ||
    state.contacts.fetchRequestId === requestId ||
    state.contacts.mutationRequests[requestId] === true;

  if (!isCurrentRequest) {
    return thunkAPI.rejectWithValue({ stale: true });
  }

  if (error.status === 401) {
    token.unset();
    thunkAPI.dispatch(sessionEnded());
  }

  return thunkAPI.rejectWithValue(error);
};
