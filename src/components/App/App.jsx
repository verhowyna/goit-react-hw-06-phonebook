import { useEffect } from 'react';

import { Phonebook } from '../Phonebook/Phonebook';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export const App = () => {
  // const [contacts, setContacts] = useState(
  //   () =>
  //     JSON.parse(window.localStorage.getItem('contacts-list')) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  // );

  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);

  // const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts-list', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const hasDuplicates = contacts.some(
      ({ name, number }) =>
        name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    );

    if (hasDuplicates) {
      return toast.error(`${newContact.name}: is already in contacts`);
    }

    const action = {
      type: 'contacts/addContacts',
      payload: newContact,
    };
    dispatch(action);
  };
  const handleDelete = contactId => {
    const action = {
      type: 'contacts/deleteContacts',
      payload: contactId,
    };
    dispatch(action);
  };

  const updateFilter = event => {
    const action = {
      type: 'contacts/setFilter',
      payload: event.currentTarget.value.toLowerCase(),
    };
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
