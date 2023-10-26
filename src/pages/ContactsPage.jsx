import Form from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from 'redux/selector';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { Container, Typography } from '@mui/material';

export default function ContactsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="small">
        <Typography variant="h1" color="textPrimary">
          Phonebook
        </Typography>
        {isLoading && !error && <b>Request in progress...</b>}
        <Form />
      </Container>
      <Container maxWidth="small">
        <Typography variant="h2" color="textPrimary">
          Contacts
        </Typography>
        <Filter />
        <ContactList />
      </Container>
    </>
  );
}
