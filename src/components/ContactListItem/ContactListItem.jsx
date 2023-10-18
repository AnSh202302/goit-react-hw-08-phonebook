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

export default function ContactListItem({ contact: { name, phone, id } }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPhone, setEditPhone] = useState(phone);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditMode(prev => !prev);
  };
  useEffect(() => {
    if (!isEditMode && (name !== editName || phone !== editPhone)) {
      dispatch(
        editContact({
          id,
          name: editName,
          phone: editPhone,
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
    setEditPhone(target.value);
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
              value={editPhone}
            ></TextField>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="subtitle1"> {phone}</Typography>
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
            {' '}
            <DeleteForeverIcon />
          </Button>

          {/* <button type="button" onClick={handleEdit}>
            {isEditMode ? <SaveIcon /> : <EditIcon />}
          </button> */}
          {/* <button type="button" onClick={() => dispatch(deleteContact(id))}>
            <DeleteForeverIcon />
          </button> */}
        </CardActions>
      </Card>
    </Grid>
    // <li>
    //   {isEditMode ? (
    //     <>
    //       <input
    //         onChange={handleChange}
    //         type="text"
    //         name="editName"
    //         value={editName}
    //       ></input>
    //       <input
    //         onChange={handleChange}
    //         type="text"
    //         name="editPhone"
    //         value={editPhone}
    //       ></input>
    //     </>
    //   ) : (
    //     <>
    //       <span>{name}</span>:<span> {phone}</span>{' '}
    //     </>
    //   )}
    //   <button type="button" onClick={handleEdit}>
    //     {isEditMode ? <SaveIcon /> : <EditIcon />}
    //   </button>
    //   <button type="button" onClick={() => dispatch(deleteContact(id))}>
    //     <DeleteForeverIcon />
    //   </button>
    // </li>
  );
}
