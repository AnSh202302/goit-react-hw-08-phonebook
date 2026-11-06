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
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Alert,
  Avatar,
  Box,
  Stack,
} from '@mui/material';
import { getContacts } from 'store/selector';

export default function ContactListItem({
  contact: { name, number, id },
  avatarColor,
}) {
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

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => Array.from(part)[0])
    .join('')
    .toUpperCase();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: isEditMode ? 'column' : 'row',
        },
        alignItems: {
          xs: 'stretch',
          sm: isEditMode ? 'stretch' : 'center',
        },
      }}
    >
      {isEditMode ? (
        <CardContent sx={{ flex: 1, minWidth: 0 }}>
          <Stack spacing={3}>
            <TextField
              id={`edit-contact-name-${id}`}
              label="Name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              type="text"
              name="editName"
              value={editName}
              disabled={isSaving}
            />

            <TextField
              id={`edit-contact-number-${id}`}
              label="Number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              type="tel"
              name="editPhone"
              value={editNumber}
              disabled={isSaving}
            />

            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </CardContent>
      ) : (
        <CardContent sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar aria-hidden="true" sx={{ bgcolor: avatarColor }}>
              {initials}
            </Avatar>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'minmax(0, 1fr)',
                  lg: 'repeat(2, minmax(0, 1fr))',
                },
                alignItems: 'center',
                columnGap: 2,
                rowGap: 0.5,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}
              >
                {name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ overflowWrap: 'anywhere' }}
              >
                {number}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      )}
      <CardActions
        sx={{
          flexShrink: 0,
          justifyContent: 'flex-end',
          p: 2,
          gap: 1,
        }}
      >
        {isEditMode ? (
          <>
            <IconButton
              size="small"
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              aria-label={isSaving ? 'Saving contact' : 'Save contact'}
            >
              <SaveOutlined />
            </IconButton>

            <IconButton
              size="small"
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              aria-label="Cancel editing"
            >
              <ClearIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              size="small"
              type="button"
              onClick={handleEdit}
              aria-label="Edit contact"
            >
              <EditOutlined />
            </IconButton>

            <IconButton
              size="small"
              type="button"
              aria-label={`Delete contact ${name}`}
              onClick={() => dispatch(deleteContact(id))}
            >
              <DeleteOutlined />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
