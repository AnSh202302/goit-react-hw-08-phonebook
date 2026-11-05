import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { sessionEnded } from './session';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState.filter,

  reducers: {
    filterSearch: (_, action) => action.payload,
  },

  extraReducers: builder => {
    builder.addCase(sessionEnded, () => '');
  },
});

export const filterReducer = filterSlice.reducer;
export const { filterSearch } = filterSlice.actions;
