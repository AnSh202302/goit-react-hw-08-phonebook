import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState.filter,
  reducers: {
    filterSearch: (_, action) => action.payload,
  },
});
export const filterReducer = filterSlice.reducer;
export const { filterSearch } = filterSlice.actions;
