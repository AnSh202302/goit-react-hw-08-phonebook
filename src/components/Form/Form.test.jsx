import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../api/client';
import Form from './Form';
import { authReducer } from 'store/auth/authSlice';
import { contactReducer } from 'store/contactSlice';

afterEach(() => {
  vi.restoreAllMocks();
});

const renderForm = (initialContacts = []) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      contacts: contactReducer,
      },
      preloadedState: {
      contacts: {
        items: initialContacts,
        isLoading: false,
        error: null,
        fetchRequestId: null,
        mutationRequests: {},
      },
    },
  });

  return render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

describe('contact form', () => {
  it('shows an error when the name contains a number', async () => {
    const user = userEvent.setup();
    renderForm();

await user.type(
  screen.getByRole('textbox', { name: /name/i }),
  'Alex2'
      );
await user.type(
  screen.getByRole('textbox', { name: /number/i }),
  '1234567'
);    await user.click(screen.getByRole('button', { name: 'Add contact' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Use letters, spaces, apostrophes or hyphens in the name.'
    );
  });
    it('shows an error when the phone number already exists', async () => {
  const user = userEvent.setup();

  renderForm([
    {
      id: 'contact-1',
      name: 'Existing Contact',
      number: '+39 (333) 123-4567',
    },
  ]);

  await user.type(
    screen.getByRole('textbox', { name: /name/i }),
    'Another Contact'
  );
  await user.type(
    screen.getByRole('textbox', { name: /number/i }),
    '+39 333 123 4567'
  );
  await user.click(screen.getByRole('button', { name: 'Add contact' }));

  expect(screen.getByRole('alert')).toHaveTextContent(
    'A contact with this phone number already exists.'
  );
    });
    it('submits normalized values and clears the fields after success', async () => {
  const user = userEvent.setup();
  const postSpy = vi.spyOn(api, 'post').mockResolvedValue({
    data: {
      id: 'contact-new',
      name: 'Alex Mercer',
      number: '+393331234567',
    },
  });

  renderForm();

  await user.type(
    screen.getByRole('textbox', { name: /name/i }),
    '  Alex   Mercer  '
  );
  await user.type(
    screen.getByRole('textbox', { name: /number/i }),
    '+39 333 123 4567'
  );
  await user.click(screen.getByRole('button', { name: 'Add contact' }));

  await waitFor(() => {
    expect(postSpy).toHaveBeenCalledWith('/contacts', {
      name: 'Alex Mercer',
      number: '+393331234567',
    });
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /number/i })).toHaveValue('');
  });
    });
    it('keeps the values and allows retry after a request error', async () => {
  const user = userEvent.setup();

  vi.spyOn(api, 'post').mockRejectedValue({
    status: null,
    message: 'Unable to connect to the server. Please try again.',
  });

  renderForm();

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const numberInput = screen.getByRole('textbox', { name: /number/i });
  const submitButton = screen.getByRole('button', { name: 'Add contact' });

  await user.type(nameInput, 'Alex Mercer');
  await user.type(numberInput, '1234567');
  await user.click(submitButton);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Unable to connect to the server. Please try again.'
  );
  expect(nameInput).toHaveValue('Alex Mercer');
  expect(numberInput).toHaveValue('1234567');
  expect(submitButton).toBeEnabled();
});
});