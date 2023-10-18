import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selector';
import { Button, TextField } from '@mui/material';
export default function Form() {
  const [name, setName] = useState('');
  const [phone, setNamber] = useState('');
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleGhange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'phone':
        setNamber(e.target.value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.find(el => el.name === name)) {
      alert(name + ' is already in contacts.');
      return;
    }
    dispatch(
      addContact({
        name,
        phone,
      })
    );
    setName('');
    setNamber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        type="text"
        value={name}
        name="name"
        pattern="[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleGhange}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        label="Phone"
        type="tel"
        value={phone}
        name="phone"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleGhange}
      />

      <Button variant="contained" size="small" type="submit">
        Add contact
      </Button>
    </form>
  );
}
