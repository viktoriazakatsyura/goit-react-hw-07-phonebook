
import { Input } from '../ContactForm/ContactForm.styles';
import { Text } from './Filter.styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter, filterContacts, resetFilterContacts } from 'redux/phonebook/phonebook-slice';
import { getContacts } from '../../redux/phonebook/pnonebook-selector';

const Filter = () =>{
    const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
    
  const changeFilterInput= e => {
    dispatch(resetFilterContacts());
    const { value: filterContact } = e.target;
    dispatch(updateFilter(filterContact.toUpperCase()));
    dispatch(filterContacts(contacts));
  };

    return (
        <>
            <Text>Find contact by name</Text>
               <Input
                type='text'
                name='name'
                placeholder="Name to search"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                onChange={changeFilterInput}
                required>
                </Input>
        </>
    )
}

export default Filter;

