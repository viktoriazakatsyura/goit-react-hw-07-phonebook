import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Label, Input, ButtonAdd, Span } from './ContactForm.styles'

import { useSelector, useDispatch } from "react-redux";
import { addContact } from '../../redux/phonebook/phonebook-operations';
import { getContacts } from "../../redux/phonebook/pnonebook-selector";


function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in the contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        <Span>Name</Span>
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          value={name}
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>

      <Label>
        <Span>Number</Span>
        <Input
          type="tel"
          name="number"
          placeholder="Enter number"
          onChange={handleChange}
          value={number}
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <ButtonAdd type="submit" disabled={!name || !number}>
        Add contact
      </ButtonAdd>
    </form>
  );
}

export default ContactForm;




     


