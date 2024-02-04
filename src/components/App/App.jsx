import { useDispatch, useSelector } from 'react-redux';
import {
  addContacts,
  deleteContacts,
  setFilter,
} from '../../redux/contacts/contactsSlice';
import { Phonebook } from '../Phonebook/Phonebook';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';
import toast from 'react-hot-toast';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);

  const addContact = newContact => {
    const hasDuplicates = contacts.some(
      ({ name, number }) =>
        name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    );

    if (hasDuplicates) {
      return toast.error(`${newContact.name}: is already in contacts`);
    }

    const action = addContacts(newContact);
    dispatch(action);
  };
  const handleDelete = contactId => {
    const action = deleteContacts(contactId);
    dispatch(action);
  };

  const updateFilter = event => {
    const action = setFilter(event.target.value.toLowerCase());
    dispatch(action);
  };

  const filtredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Phonebook
        className={css.phonebook}
        onAddContact={addContact}
      ></Phonebook>
      <h2>Contacts</h2>
      <Filter className={css.filter} onFilter={updateFilter}></Filter>
      <Contacts
        className={css.contacts}
        contactsList={filtredContacts()}
        onDelete={handleDelete}
      ></Contacts>
    </div>
  );
};
