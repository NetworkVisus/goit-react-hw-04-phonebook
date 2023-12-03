import { useEffect, useState } from 'react';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import * as Styled from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    const alreadyExist = contacts.find(
      el =>
        el.name.toLowerCase().trim() === newContact.name.toLowerCase().trim()
    );

    if (alreadyExist) {
      alert(
        'This user is already in the list, try to delete it and add a new one'
      );
      return;
    }
    setContacts(prev => [...prev, newContact]);
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filteredNames = () => {
    let filterTmp = filter;
    const filteredContacts = contacts.filter(el =>
      el.name.toLowerCase().includes(filterTmp.toLowerCase().trim())
    );
    return filteredContacts;
  };

  const handleDelete = event => {
    setContacts(prev => [
      ...prev.filter(element => element.id !== event.target.id),
    ]);
  };

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) setContacts(JSON.parse(localData));
    else setContacts([]);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) localStorage.removeItem('contacts');

    if (!contacts.length) return;

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Styled.MainDiv>
      <h1>Phonebook</h1>
      <Form addContact={addContact}></Form>
      <h2>Contacts</h2>
      {contacts.length > 0 && <Filter handleFilter={handleFilter}></Filter>}
      <Contacts items={filteredNames()} handleDelete={handleDelete}></Contacts>
    </Styled.MainDiv>
  );
}
