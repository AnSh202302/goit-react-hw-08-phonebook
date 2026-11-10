import { Stack, Typography } from '@mui/material';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContacts, getFilter, getIsLoading, getError } from 'store/selector';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const normalizedFilter = filter.trim().toLowerCase();
 
 const visibleContacts = contacts.filter(el =>
   el.name.toLowerCase().includes(normalizedFilter))
  
  let message = null;
  
  if (isLoading) {
    message = 'Loading contacts…';
  } else if (error) {
    message= `Could not load contacts: ${error}`;
  } else if (contacts.length === 0) {
     message = 'Your phonebook is empty.';
  }else if (visibleContacts.length === 0) {
  message = 'No contacts found for your search.';
}

  return (
    <Stack spacing={2} sx={{ mt: 3 }}
    >
      {message ? (
        <Typography
          role={isLoading ? 'status' : error ? 'alert' : undefined}
          color={error ? 'error' : 'text.secondary'}
        >
          {message}
        </Typography>
      ) : (
        visibleContacts.map((contact, index) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            avatarColor={
              index % 2 === 0 ? 'contactAvatar.teal' : 'contactAvatar.blue'
            }
          />
        ))
      )}
    </Stack>
  );
};

ContactList.propTypes = {
  contactsArr: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteUser: PropTypes.func,
};
