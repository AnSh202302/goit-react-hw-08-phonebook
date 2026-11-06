import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, editContact } from 'store/operations';
import {
  normalizeName,
  normalizePhone,
  isValidName,
  isValidPhone,
  getPhoneKey,
} from '../../utils/contactUtils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { getContacts } from 'store/selector';

export default function ContactListItem({ contact: { name, number, id } }) {
  const contacts = useSelector(getContacts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editNumber, setEditNumber] = useState(number);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditName(name);
    setEditNumber(number);
    setIsEditMode(true);
    setError('');
  };

  const handleCancel = () => {
    setEditName(name);
    setEditNumber(number);
    setIsEditMode(false);
    setError('');
  };

  const handleChange = ({ target }) => {
    if (target.name === 'editName') {
      setEditName(target.value);
      return;
    }
    setEditNumber(target.value);
  };
  const handleSave = async () => {
    if (isSaving) return;

    setError('');
    const normalizedName = normalizeName(editName);
    const normalizedNumber = normalizePhone(editNumber);
    if (!normalizedName) {
      setError('Enter a name.');
      return;
    }
    if (!isValidName(normalizedName)) {
      setError('Use letters, spaces, apostrophes or hyphens in the name.');
      return;
    }
    if (!normalizedNumber) {
      setError('Enter a phone number.');
      return;
    }
    if (!isValidPhone(normalizedNumber)) {
      setError(
        'Use digits, parentheses, dots or hyphens, with an optional leading +.'
      );
      return;
    }
    if (
      contacts.some(
        contact =>
          contact.id !== id &&
          getPhoneKey(contact.number) === getPhoneKey(normalizedNumber)
      )
    ) {
      setError('A contact with this phone number already exists.');
      return;
    }
    setIsSaving(true);

    try {
      await dispatch(
        editContact({
          id,
          name: normalizedName,
          number: normalizedNumber,
        })
      ).unwrap();

      setIsEditMode(false);
    } catch (saveError) {
      if (saveError?.stale || saveError?.status === 401) return;

      setError(
        saveError?.message ?? 'Unable to save the contact. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Grid item>
      <Card>
        {isEditMode ? (
          <CardContent>
            <TextField
              id={`edit-contact-name-${id}`}
              label="Name"
              variant="standard"
              onChange={handleChange}
              type="text"
              name="editName"
              value={editName}
              disabled={isSaving}
            ></TextField>
            <TextField
              id={`edit-contact-number-${id}`}
              label="Number"
              variant="standard"
              onChange={handleChange}
              name="editPhone"
              value={editNumber}
              disabled={isSaving}
            ></TextField>
            {error && <Alert severity="error">{error}</Alert>}
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle1"> {number}</Typography>
          </CardContent>
        )}
        <CardActions>
          {isEditMode ? (
            <>
              <Button
                size="small"
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                aria-label={isSaving ? 'Saving contact' : 'Save contact'}
              >
                <SaveIcon />
              </Button>

              <Button
                size="small"
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                aria-label="Cancel editing"
              >
                <ClearIcon />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="small"
                type="button"
                onClick={handleEdit}
                aria-label="Edit contact"
              >
                <EditIcon />
              </Button>

              <Button
                size="small"
                type="button"
                aria-label={`Delete contact ${name}`}
                onClick={() => dispatch(deleteContact(id))}
              >
                <DeleteForeverIcon />
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
