import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { sessionEnded } from './session';
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './operations';

const handlePending = (state, action) => {
  state.mutationRequests[action.meta.requestId] = true;
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.isLoading = false;

  if (action.payload?.status === 401) {
    state.error = null;
    return;
  }

  state.error = action.payload?.message ?? 'Unable to complete the request.';
};
const finishMutation = (state, action) => {
  const requestId = action.meta.requestId;

  if (!state.mutationRequests[requestId]) {
    return false;
  }

  delete state.mutationRequests[requestId];

  state.isLoading =
    state.fetchRequestId !== null ||
    Object.keys(state.mutationRequests).length > 0;

  return true;
};

const handleMutationRejected = (state, action) => {
  if (!finishMutation(state, action)) {
    return;
  }

  state.error =
    action.payload?.status === 401
      ? null
      : (action.payload?.message ?? 'Unable to complete the request.');
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,

  extraReducers: builder => {
    builder
      .addCase(sessionEnded, () => ({
        ...initialState.contacts,
        items: [],
      }))

      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.fetchRequestId = action.meta.requestId;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (state.fetchRequestId !== action.meta.requestId) {
          return;
        }

        state.fetchRequestId = null;
        state.isLoading = Object.keys(state.mutationRequests).length > 0;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        if (state.fetchRequestId !== action.meta.requestId) {
          return;
        }

        state.fetchRequestId = null;
        handleRejected(state, action);
        state.isLoading = Object.keys(state.mutationRequests).length > 0;
      })

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        if (!finishMutation(state, action)) {
          return;
        }
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleMutationRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        if (!finishMutation(state, action)) {
          return;
        }
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleMutationRejected)

      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        if (!finishMutation(state, action)) {
          return;
        }
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(editContact.rejected, handleMutationRejected);
  },
});
export const contactReducer = contactSlice.reducer;
