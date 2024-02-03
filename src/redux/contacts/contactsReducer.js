import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: JSON.parse(window.localStorage.getItem('contacts-list')) ?? [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContacts(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContacts(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContacts, deleteContacts, setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
