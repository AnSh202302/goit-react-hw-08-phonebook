import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { ContactList } from './ContactList';
import { contactReducer } from 'store/contactSlice';
import { filterReducer } from 'store/filterSlise';

const renderContactList = ({
  contacts = [],
  filter = '',
  isLoading = false,
  error = null,
} = {}) => {
  const store = configureStore({
    reducer: {
      contacts: contactReducer,
      filter: filterReducer,
    },
    preloadedState: {
      contacts: {
        items: contacts,
        isLoading,
        error,
        fetchRequestId: null,
        mutationRequests: {},
      },
      filter,
    },
  });

  return render(
    <Provider store={store}>
      <ContactList />
    </Provider>
  );
};

describe('contact list empty states', () => {
  it('shows a message when the phonebook is empty', () => {
    renderContactList();

    expect(screen.getByText('Your phonebook is empty.')).toBeInTheDocument();
  });

  it('shows a message when the search has no matches', () => {
    renderContactList({
      contacts: [
        { id: 'contact-1', name: 'Alex Mercer', number: '1234567' },
      ],
      filter: 'No match',
    });

    expect(
      screen.getByText('No contacts found for your search.')
    ).toBeInTheDocument();
  });
    it('shows a loading message while contacts are loading', () => {
  renderContactList({ isLoading: true });

  expect(screen.getByRole('status')).toHaveTextContent('Loading contacts…');
});

it('shows an error message when loading contacts fails', () => {
  renderContactList({ error: 'Unable to connect to the server.' });

  expect(screen.getByRole('alert')).toHaveTextContent(
    'Could not load contacts: Unable to connect to the server.'
  );
});
});