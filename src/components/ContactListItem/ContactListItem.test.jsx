import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
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

const existingContact = {
  id: 'contact-1',
  name: 'Alex Mercer',
  number: '1234567',
};

const renderContact = (contact = existingContact, contacts = [contact]) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      contacts: contactReducer,
    },
    preloadedState: {
      contacts: {
        items: contacts,
        isLoading: false,
        error: null,
        fetchRequestId: null,
        mutationRequests: {},
      },
    },
  });

  return render(
    <Provider store={store}>
      <ContactListItem contact={contact} avatarColor="teal" />
    </Provider>
  );
};

describe('contact list item', () => {
  it('shows an error when deleting a contact fails', async () => {
    const user = userEvent.setup();

    vi.spyOn(api, 'delete').mockRejectedValue({
      status: 500,
      message: 'Unable to delete the contact. Please try again.',
    });

    renderContact();

    await user.click(
      screen.getByRole('button', { name: 'Delete contact Alex Mercer' })
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to delete the contact. Please try again.'
    );
  });

  it('saves normalized contact details and exits edit mode', async () => {
    const user = userEvent.setup();
    const patchSpy = vi.spyOn(api, 'patch').mockResolvedValue({
      data: {
        id: existingContact.id,
        name: 'Jordan Lee',
        number: '+393331234567',
      },
    });

    renderContact();

    await user.click(screen.getByRole('button', { name: 'Edit contact' }));

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const numberInput = screen.getByRole('textbox', { name: 'Number' });

    await user.clear(nameInput);
    await user.type(nameInput, '  Jordan   Lee  ');
    await user.clear(numberInput);
    await user.type(numberInput, '+39 (333) 123-4567');
    await user.click(screen.getByRole('button', { name: 'Save contact' }));

    await waitFor(() => {
      expect(patchSpy).toHaveBeenCalledWith(
        '/contacts/contact-1',
        {
            name: 'Jordan Lee',
            number: '+39(333)123-4567',
        }
      );
    });

    expect(
      await screen.findByRole('button', { name: 'Edit contact' })
    ).toBeInTheDocument();
  });

  it('keeps edit mode and shows an error when saving fails', async () => {
    const user = userEvent.setup();

    vi.spyOn(api, 'patch').mockRejectedValue({
      status: 500,
      message: 'Unable to save the contact. Please try again.',
    });

    renderContact();

    await user.click(screen.getByRole('button', { name: 'Edit contact' }));
    await user.click(screen.getByRole('button', { name: 'Save contact' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to save the contact. Please try again.'
    );
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('does not save a phone number that belongs to another contact', async () => {
    const user = userEvent.setup();
    const patchSpy = vi.spyOn(api, 'patch');

    const otherContact = {
        id: 'contact-2',
        name: 'Taylor Smith',
        number: '+39(333)123-4567',
    };

    renderContact(existingContact, [existingContact, otherContact]);

    await user.click(screen.getByRole('button', { name: 'Edit contact' }));

    const numberInput = screen.getByRole('textbox', { name: 'Number' });
    await user.clear(numberInput);
    await user.type(numberInput, '+39 333 123 4567');
    await user.click(screen.getByRole('button', { name: 'Save contact' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'A contact with this phone number already exists.'
    );
    expect(patchSpy).not.toHaveBeenCalled();
  });
});