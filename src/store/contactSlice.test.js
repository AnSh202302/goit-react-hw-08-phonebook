import { describe, expect, it } from 'vitest';
import { contactReducer } from './contactSlice';
import { addContact, deleteContact, editContact } from './operations';

const existingContact = {
  id: 'contact-1',
  name: 'Alex Mercer',
  number: '1234567',
};

const initialContactsState = {
  items: [existingContact],
  isLoading: false,
  error: null,
  fetchRequestId: null,
  mutationRequests: {},
};

describe('contact reducer ignores mutation results for unknown contacts', () => {
  it('does not delete a contact when the response ID is not in the list', () => {
    const requestId = 'delete-request';
    const missingId = 'missing-contact';

    const pendingState = contactReducer(
      initialContactsState,
      deleteContact.pending(requestId, missingId)
    );

    const nextState = contactReducer(
      pendingState,
      deleteContact.fulfilled({ id: missingId }, requestId, missingId)
    );

    expect(nextState.items).toEqual([existingContact]);
  });

  it('does not replace a contact when the response ID is not in the list', () => {
    const requestId = 'edit-request';
    const editPayload = {
      id: 'missing-contact',
      name: 'New Name',
      number: '7654321',
    };

    const pendingState = contactReducer(
      initialContactsState,
      editContact.pending(requestId, editPayload)
    );

    const nextState = contactReducer(
      pendingState,
      editContact.fulfilled(editPayload, requestId, editPayload)
    );

    expect(nextState.items).toEqual([existingContact]);
  });

  it('does not change the loading state or fetch error when a delete fails', () => {
    const requestId = 'delete-request';
    const fetchError = 'Unable to load contacts.';

    const stateWithFetchError = {
      ...initialContactsState,
      error: fetchError,
    };

    const pendingState = contactReducer(
      stateWithFetchError,
      deleteContact.pending(requestId, existingContact.id)
    );

    const nextState = contactReducer(
      pendingState,
      deleteContact.rejected(
        { message: 'Request failed' },
        requestId,
        existingContact.id,
        {
          status: 500,
          message: 'Unable to delete the contact. Please try again.',
        }
      )
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(fetchError);
  });

  it('does not change the loading state or fetch error when adding fails', () => {
    const requestId = 'add-request';
    const fetchError = 'Unable to load contacts.';
    const newContact = {
      name: 'Jordan Lee',
      number: '7654321',
    };

    const stateWithFetchError = {
      ...initialContactsState,
      error: fetchError,
    };

    const pendingState = contactReducer(
      stateWithFetchError,
      addContact.pending(requestId, newContact)
    );

    const nextState = contactReducer(
      pendingState,
      addContact.rejected(
        { message: 'Request failed' },
        requestId,
        newContact,
        {
          status: 500,
          message: 'Unable to add the contact. Please try again.',
        }
      )
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(fetchError);
    expect(nextState.items).toEqual([existingContact]);
  });

  it('does not change the loading state or fetch error when editing fails', () => {
    const requestId = 'edit-request';
    const fetchError = 'Unable to load contacts.';
    const updatedContact = {
      ...existingContact,
      name: 'Alex Updated',
    };

    const stateWithFetchError = {
      ...initialContactsState,
      error: fetchError,
    };

    const pendingState = contactReducer(
      stateWithFetchError,
      editContact.pending(requestId, updatedContact)
    );

    const nextState = contactReducer(
      pendingState,
      editContact.rejected(
        { message: 'Request failed' },
        requestId,
        updatedContact,
        {
          status: 500,
          message: 'Unable to save the contact. Please try again.',
        }
      )
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(fetchError);
    expect(nextState.items).toEqual([existingContact]);
  });

  it('ignores a rejection from an untracked mutation request', () => {
    const fetchError = 'Unable to load contacts.';
    const stateWithFetchError = {
      ...initialContactsState,
      error: fetchError,
    };

    const nextState = contactReducer(
      stateWithFetchError,
      deleteContact.rejected(
        { message: 'Request failed' },
        'old-delete-request',
        existingContact.id,
        {
          status: 500,
          message: 'Late delete failure.',
        }
      )
    );

    expect(nextState).toEqual(stateWithFetchError);
  });
});