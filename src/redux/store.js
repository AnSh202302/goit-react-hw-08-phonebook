import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlise';
import { contactReducer } from './contactSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});
