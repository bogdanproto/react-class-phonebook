import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import contacts from 'data/contacts.json';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { PhoneBook } from './App.styled';

export class App extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;
    const newName = data.name.toLowerCase();

    const isExistingContact = contacts.some(
      ({ name }) => name.toLowerCase() === newName
    );

    if (isExistingContact) {
      alert(`${data.name} is already in contacts`);
      return isExistingContact;
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      data.id = nanoid(5);
      return { contacts: [...contacts, data] };
    });
  };

  handleFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  toFilterElement = contacts => {
    const filter = this.state.filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  deleteContact = evt => {
    const deleteId = evt.currentTarget.id;
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(
        ({ id }) => id !== deleteId
      );
      return { contacts: newContacts };
    });
  };

  render() {
    const filteredElement = this.toFilterElement(this.state.contacts);

    return (
      <PhoneBook>
        <h2>Phonebook</h2>
        <ContactForm addContact={this.addContact} />
        <h3>Contacts</h3>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <ContactList
          contactsBook={filteredElement}
          deleteContact={this.deleteContact}
        />
      </PhoneBook>
    );
  }
}
