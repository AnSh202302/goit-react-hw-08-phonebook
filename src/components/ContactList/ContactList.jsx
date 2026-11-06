import { Stack } from '@mui/material';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'store/selector';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getVisibleName = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };
  const contactsArr = getVisibleName();

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {contactsArr.map((contact, index) => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          avatarColor={
            index % 2 === 0 ? 'contactAvatar.teal' : 'contactAvatar.blue'
          }
        />
      ))}
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
