import Form from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from 'store/selector';
import { useEffect } from 'react';
import { fetchContacts } from 'store/operations';
import { Box, Container, Paper, Typography } from '@mui/material';

export default function ContactsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography
        variant="h1"
        sx={{
          mb: 3,
          fontSize: { xs: '2.25rem', md: '3.5rem' },
        }}
      >
        Contacts
      </Typography>

      {isLoading && !error && (
        <Typography role="status" sx={{ mb: 2 }}>
          Request in progress...
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: '320px minmax(0, 1fr)',
          },
          gap: 3,
          alignItems: 'start',
        }}
      >
        <Paper variant="glass" sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 3 }}>
            Add contact
          </Typography>

          <Form />
        </Paper>

        <Paper
          variant="glass"
          sx={{
            p: { xs: 2, sm: 3 },
            minWidth: 0,
          }}
        >
          <Filter />
          <ContactList />
        </Paper>
      </Box>
    </Container>
  );
}
