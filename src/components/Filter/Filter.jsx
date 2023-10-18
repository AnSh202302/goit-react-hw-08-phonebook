import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filterSearch } from 'redux/filterSlise';
import { getFilter } from 'redux/selector';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleSearch = e => dispatch(filterSearch(e.target.value));

  return (
    <label>
      Find contacts by name
      <TextField
        id="standard-basic"
        variant="standard"
        type="text"
        value={filter}
        onChange={handleSearch}
        required
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  handleSearch: PropTypes.func,
};
