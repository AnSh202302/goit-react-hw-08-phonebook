import {
  Toolbar,
  Paper,
  Button,
  Typography,
  Avatar,
  Stack,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { logOut } from 'store/auth/auth-operations';
import { selectIsLoggedIn } from 'store/auth/auth-selector';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Paper component="header" variant="glass" sx={{ mt: 3 }}>
      <Toolbar
        component="nav"
        aria-label="Main navigation"
         sx={{
    justifyContent: 'space-between',
  }}
      >
        <Typography
          component={RouterLink}
          to="/"
          sx={{
             display: 'flex',
            alignItems: 'center',
            justifySelf: 'start',
            fontSize: { xs: '1.125rem', sm: '1.5rem' },
            gap: { xs: 1, sm: 1.5 },
            fontWeight: 700,
            color: 'text.primary',
            textDecoration: 'none',

            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '4px',
              borderRadius: '4px',
            },
          }}
        >
          <Avatar
            variant="rounded"
            aria-hidden="true"
            sx={{
              bgcolor: 'primary.main',
              color: 'text.primary',
              borderRadius: '14px',
              width: { xs: 36, sm: 48 },
              height: { xs: 36, sm: 48 },
            }}
          >
            <PeopleAltOutlinedIcon />
          </Avatar>
          Phonebook
        </Typography>
        <Box sx={{display: "flex", gap:{xs:0, sm: 2 }}}>

        {isLoggedIn && (
        
            <Button component={NavLink} to="/contacts" color="inherit">
              Contacts
            </Button>
        )}

        <Stack
          direction="row"        
        >
          {isLoggedIn ? (
            <Button
              color="inherit"
               aria-label="Logout"
              startIcon={<LogoutOutlinedIcon />}
                onClick={() => dispatch(logOut())}
                sx={{
    justifyContent: { xs: 'flex-end', sm: 'flex-start' },
  }}
            >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
    Logout
  </Box>
            </Button>
          ) : (
            <>
              <Button component={NavLink} to="/register" color="inherit" size="small"
                >
                Sign up
              </Button>

              <Button component={NavLink} to="/login" color="inherit" size="small"
                >
                Sign in
              </Button>
            </>
          )}
        </Stack>
        </Box>
      </Toolbar>
    </Paper>
  );
}
