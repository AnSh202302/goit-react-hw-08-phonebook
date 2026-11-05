import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Alert,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react';

function AuthForm({ mode, onSubmit }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = values;

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setValues(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const data = mode === 'register' ? values : { email, password };

    try {
      await onSubmit(data);

      setValues({
        name: '',
        email: '',
        password: '',
      });
    } catch (submitError) {
      const isDuplicateEmail =
        submitError?.code === 11000 && submitError?.keyPattern?.email;

      setError(
        isDuplicateEmail
          ? 'This email is already registered. Please log in.'
          : 'Unable to submit the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 8,
        }}
      >
        {mode === 'register' && (
          <FormControl variant="standard">
            <InputLabel htmlFor="auth-name">Name</InputLabel>
            <Input
              required
              value={name}
              type="text"
              onChange={handleChange}
              name="name"
              id="auth-name"
              autoComplete="name"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
        )}
        <FormControl variant="standard">
          <InputLabel htmlFor="auth-email">Email</InputLabel>
          <Input
            required
            value={email}
            type="email"
            onChange={handleChange}
            name="email"
            id="auth-email"
            autoComplete="email"
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="auth-password">Password</InputLabel>
          <Input
            required
            value={password}
            type="password"
            onChange={handleChange}
            name="password"
            id="auth-password"
            autoComplete={
              mode === 'register' ? 'new-password' : 'current-password'
            }
            startAdornment={
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        {error && <Alert severity="error">{error}</Alert>}

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Submitting...'
            : mode === 'register'
              ? 'Sign up'
              : 'Log in'}
        </Button>
      </Box>
    </Container>
  );
}

export default AuthForm;
