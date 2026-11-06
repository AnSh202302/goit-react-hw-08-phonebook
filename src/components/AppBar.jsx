import {
  Toolbar,
  Paper,
  Button,
  Typography,
  Avatar,
  Stack,
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
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr) auto',
            md: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          },
          gridTemplateAreas: {
            xs: isLoggedIn
              ? '"brand account" "links links"'
              : '"brand brand" "account account"',
            md: '"brand links account"',
          },
          alignItems: 'center',
          gap: 2,
          py: 2,
        }}
      >
        <Typography
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            gridArea: 'brand',
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
        {isLoggedIn && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              gridArea: 'links',
              justifySelf: 'center',
            }}
          >
            <Button component={NavLink} to="/contacts" color="inherit">
              Contacts
            </Button>
          </Stack>
        )}

        <Stack
          direction="row"
          spacing={1}
          sx={{
            gridArea: 'account',
            justifySelf: 'end',
            flexWrap: 'wrap',
          }}
        >
          {isLoggedIn ? (
            <Button
              color="inherit"
              startIcon={<LogoutOutlinedIcon />}
              onClick={() => dispatch(logOut())}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button component={NavLink} to="/register" color="inherit">
                Registrations
              </Button>

              <Button component={NavLink} to="/login" color="inherit">
                Login
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </Paper>
  );
}
