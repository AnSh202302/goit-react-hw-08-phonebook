import { describe, expect, it } from 'vitest';
import { contactReducer } from './contactSlice';
import { deleteContact, editContact } from './operations';

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
});