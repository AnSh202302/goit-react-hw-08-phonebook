import {
  Alert,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import ButtonAppBar from './components/AppBar';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from 'store/auth/auth-operations';
import Layout from 'components/Layout/Layout';
import HomePage from 'pages/HomePage';
import RegistrationsPage from 'pages/RegistrationsPage';
import ContactsPage from 'pages/ContactsPage';
import LoginPage from 'pages/LoginPage';
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';
import NotFound from 'components/NotFound';
import { useAuth } from 'hooks/useAuth';
import theme from 'styled/global';

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const refreshError = useSelector(state => state.auth.refreshError);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  if (refreshError) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                onClick={() => dispatch(fetchCurrentUser())}
              >
                Retry
              </Button>
            }
          >
            {refreshError}
          </Alert>
        </Container>
      </ThemeProvider>
    );
  }
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <CssBaseline>
          <ButtonAppBar />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<RegistrationsPage />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<ContactsPage />}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CssBaseline>
      </Container>
    </ThemeProvider>
  );
}
