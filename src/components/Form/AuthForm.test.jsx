import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  it('submits login credentials and clears the fields after success', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<AuthForm mode="login" onSubmit={onSubmit} />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'alex@example.com');
    await user.type(passwordInput, 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'alex@example.com',
        password: 'secret123',
      });
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  it('submits registration details and clears the fields after success', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<AuthForm mode="register" onSubmit={onSubmit} />);

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await user.type(nameInput, 'Alex Mercer');
    await user.type(emailInput, 'alex@example.com');
    await user.type(passwordInput, 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign up' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Alex Mercer',
        email: 'alex@example.com',
        password: 'secret123',
      });
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  it('shows a login error linked to the email and password fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue({ status: 401 });

    render(<AuthForm mode="login" onSubmit={onSubmit} />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'alex@example.com');
    await user.type(passwordInput, 'wrong-password');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Incorrect email or password.'
    );
    expect(emailInput).toHaveAttribute('aria-describedby', 'auth-error');
    expect(passwordInput).toHaveAttribute('aria-describedby', 'auth-error');
    expect(emailInput).toHaveValue('alex@example.com');
    expect(passwordInput).toHaveValue('wrong-password');
  });

  it('links a duplicate email error only to the email field', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue({ status: 409 });

    render(<AuthForm mode="register" onSubmit={onSubmit} />);

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await user.type(nameInput, 'Alex Mercer');
    await user.type(emailInput, 'alex@example.com');
    await user.type(passwordInput, 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'This email is already registered. Please log in.'
    );
    expect(emailInput).toHaveAttribute('aria-describedby', 'auth-error');
    expect(nameInput).not.toHaveAttribute('aria-describedby');
    expect(passwordInput).not.toHaveAttribute('aria-describedby');
  });

  it('shows a registration error linked to all registration fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue({ status: 422 });

    render(<AuthForm mode="register" onSubmit={onSubmit} />);

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await user.type(nameInput, 'Alex Mercer');
    await user.type(emailInput, 'alex@example.com');
    await user.type(passwordInput, 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Please check your name, email and password.'
    );
    expect(nameInput).toHaveAttribute('aria-describedby', 'auth-error');
    expect(emailInput).toHaveAttribute('aria-describedby', 'auth-error');
    expect(passwordInput).toHaveAttribute('aria-describedby', 'auth-error');
  });

  it('shows a connection error without marking fields as invalid', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue({ status: null });

    render(<AuthForm mode="login" onSubmit={onSubmit} />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'alex@example.com');
    await user.type(passwordInput, 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to connect to the server. Check your connection and try again.'
    );
    expect(emailInput).not.toHaveAttribute('aria-describedby');
    expect(passwordInput).not.toHaveAttribute('aria-describedby');
  });
});