import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../api/client';
import { authReducer } from 'store/auth/authSlice';
import { contactReducer } from 'store/contactSlice';
import ContactListItem from './ContactListItem';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('contact list item', () => {
  it('shows an error when deleting a contact fails', async () => {
    const user = userEvent.setup();

    vi.spyOn(api, 'delete').mockRejectedValue({
      status: 500,
      message: 'Unable to delete the contact. Please try again.',
    });

    const store = configureStore({
      reducer: {
        auth: authReducer,
        contacts: contactReducer,
      },
      preloadedState: {
        contacts: {
          items: [
            {
              id: 'contact-1',
              name: 'Alex Mercer',
              number: '1234567',
            },
          ],
          isLoading: false,
          error: null,
          fetchRequestId: null,
          mutationRequests: {},
        },
      },
    });

    render(
      <Provider store={store}>
        <ContactListItem
          contact={{
            id: 'contact-1',
            name: 'Alex Mercer',
            number: '1234567',
          }}
          avatarColor="teal"
        />
      </Provider>
    );

    await user.click(
      screen.getByRole('button', { name: 'Delete contact Alex Mercer' })
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to delete the contact. Please try again.'
    );
  });
});