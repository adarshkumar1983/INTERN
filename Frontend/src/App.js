import React, { useState, useEffect } from 'react';
import ContactForm from './Components/ContectForm';
import ContactTable from './Components/ContactList';


function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('http://localhost:5001/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data));
  };

  const handleAddContact = (newContact) => {
    fetch('http://localhost:5001/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts((prevContacts) => [...prevContacts, data]);
      });
  };

  const handleUpdateContact = (updatedContact) => {
    fetch(`http://localhost:5001/api/contacts/${updatedContact._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === updatedContact._id ? updatedContact : contact
          )
        );
        setEditingContact(null);
      });
  };

  const handleDeleteContact = (id) => {
    fetch(`http://localhost:5001/api/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
      });
  };

  return (
    <div>
      
      <ContactForm
        onAddContact={handleAddContact}
        editingContact={editingContact}
        onUpdateContact={handleUpdateContact}
      />

      {"  "}
      <ContactTable
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        onEditContact={setEditingContact}
      />
    </div>
  );
}

export default App;