import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/operations';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material';

export default function ContactListItem({ contact: { name, number, id } }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editNumber, setEditNumber] = useState(number);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditMode(prev => !prev);
  };
  useEffect(() => {
    if (!isEditMode && (name !== editName || number !== editNumber)) {
      dispatch(
        editContact({
          id,
          name: editName,
          number: editNumber,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  const handleChange = ({ target }) => {
    if (target.name === 'editName') {
      setEditName(target.value);
      return;
    }
    setEditNumber(target.value);
  };
  return (
    <Grid item>
      <Card>
        {isEditMode ? (
          <CardContent>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              onChange={handleChange}
              type="text"
              name="editName"
              value={editName}
            ></TextField>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              onChange={handleChange}
              type="text"
              name="editPhone"
              value={editNumber}
            ></TextField>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle1"> {number}</Typography>
          </CardContent>
        )}
        <CardActions>
          <Button size="small" type="button" onClick={handleEdit}>
            {isEditMode ? <SaveIcon /> : <EditIcon />}
          </Button>
          <Button
            size="small"
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            <DeleteForeverIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
