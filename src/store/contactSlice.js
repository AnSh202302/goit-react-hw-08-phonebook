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

  return true;
};

const handleMutationRejected = (state, action) => {
  if (!finishMutation(state, action)) {
    return;
  }
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
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        if (state.fetchRequestId !== action.meta.requestId) {
          return;
        }

        state.fetchRequestId = null;
        handleRejected(state, action);
        state.isLoading = false;
      })

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        if (!finishMutation(state, action)) {
          return;
        }
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleMutationRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        if (!finishMutation(state, action)) {
          return;
        }
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index === -1) return;
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleMutationRejected)

      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        if (!finishMutation(state, action)) {
          return;
        }
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
          );
          if (index === -1) return;
        state.items.splice(index, 1, action.payload);
      })
      .addCase(editContact.rejected, handleMutationRejected);
  },
});
export const contactReducer = contactSlice.reducer;
