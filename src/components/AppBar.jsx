import { Toolbar, Box, AppBar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from 'redux/auth/auth-operations';
import { selectIsLoggedIn } from 'redux/auth/auth-selector';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color="inherit" onClick={() => navigation('/')}>
            Home
          </Button>
          {isLoggedIn && (
            <Button color="inherit" onClick={() => navigation('/contacts')}>
              Contacts
            </Button>
          )}

          {!isLoggedIn && (
            <Button color="inherit" onClick={() => navigation('/register')}>
              Registrations
            </Button>
          )}
          {!isLoggedIn ? (
            <Button color="inherit" onClick={() => navigation('/login')}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={() => dispatch(logOut())}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
