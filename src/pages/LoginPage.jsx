import * as React from 'react';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import {
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logIn } from 'redux/auth/auth-operations';

export default function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
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
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            value={email}
            onChange={handleChange}
            name="email"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            value={password}
            onChange={handleChange}
            name="password"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button variant="contained" type="submit">
          LOGIN
        </Button>
      </Box>
    </Container>
  );
}
