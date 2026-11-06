import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'store/operations';
import { getContacts } from 'store/selector';
import { Alert, Button, TextField } from '@mui/material';

const getPhoneKey = value => value.replace(/\D/gu, '');

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    const normalizedName = name.trim().replace(/\s+/gu, ' ');
    const normalizedNumber = number.replace(/\s+/gu, '');

    if (!normalizedName) {
      setError('Enter a name.');
      return;
    }

    if (!normalizedNumber) {
      setError('Enter a phone number.');
      return;
    }
    if (!/^\p{L}+(?:[ '’\-]\p{L}+)*$/u.test(normalizedName)) {
      setError('Use letters, spaces, apostrophes or hyphens in the name.');
      return;
    }

    if (
      !/^\+?[\d().-]+$/u.test(normalizedNumber) ||
      !/\d/u.test(normalizedNumber)
    ) {
      setError(
        'Use digits, parentheses, dots or hyphens, with an optional leading +.'
      );
      return;
    }
    if (
      contacts.some(
        contact => getPhoneKey(contact.number) === getPhoneKey(normalizedNumber)
      )
    ) {
      setError('A contact with this phone number already exists.');
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(
        addContact({
          name: normalizedName,
          number: normalizedNumber,
        })
      ).unwrap();

      setName('');
      setNumber('');
    } catch (submitError) {
      if (submitError?.stale || submitError?.status === 401) return;

      setError(
        submitError?.message ?? 'Unable to add the contact. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="add-contact-name"
        label="Name"
        variant="standard"
        type="text"
        value={name}
        name="name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <TextField
        id="add-contact-number"
        variant="standard"
        label="Number"
        type="tel"
        value={number}
        name="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        disabled={isSubmitting}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="contained"
        size="small"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add contact'}
      </Button>
    </form>
  );
}
