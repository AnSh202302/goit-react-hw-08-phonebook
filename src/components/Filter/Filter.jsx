import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filterSearch } from 'store/filterSlise';
import { getFilter } from 'store/selector';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleSearch = e => dispatch(filterSearch(e.target.value));

  return (
    <TextField
      id="contact-search"
      placeholder="Search by name"
      variant="outlined"
      type="search"
      fullWidth
      value={filter}
      onChange={handleSearch}
      slotProps={{
        htmlInput: {
          'aria-label': 'Search contacts by name',
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  handleSearch: PropTypes.func,
};
