import { Contact, ContactItem, ButtonDelete, Text } from './ContactList.styles';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/phonebook/phonebook-operations';
import { getContacts, getСontactsFilter } from '../../redux/phonebook/pnonebook-selector';
import { resetFilterContacts } from 'redux/phonebook/phonebook-slice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterContactArray = useSelector(getСontactsFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (event) => {
    dispatch(resetFilterContacts());
    dispatch(deleteContact(event.target.dataset.id));
  };

  const resultArray = filterContactArray.length > 0 ? filterContactArray : contacts;

  return (
    <Contact>
      {resultArray.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <Text>{name}:{number}</Text>
          <ButtonDelete type="button" data-id={id} onClick={handleDeleteContact}>
            Delete
          </ButtonDelete>
        </ContactItem>
      ))}
    </Contact>
  );
};

export default ContactList;



