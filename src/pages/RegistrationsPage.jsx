import * as React from 'react';
import Box from '@mui/material/Box';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';
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
import { register } from 'redux/auth/auth-operations';

export default function RegistrationsPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(register({ name, email, password }));
    setName('');
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
          <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
          <Input
            value={name}
            type="text"
            onChange={handleChange}
            name="name"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            value={email}
            type="email"
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
            type="password"
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
          REGISTRATION
        </Button>
      </Box>
    </Container>
  );
}
