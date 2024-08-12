import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "/src/redux/contactsSlice.js";
import { selectNameFilter, changeFilter } from "/src/redux/filtersSlice.js";
import { fetchContacts } from "/src/redux/contactsOps";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);


 const loading = useSelector(selectLoading);
 const error = useSelector(selectError);

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Contacts:", contacts);
console.log("Contacts Type:", typeof contacts, Array.isArray(contacts));

 useEffect(() => {
   if (!loading && contacts.length === 0) {
     dispatch(fetchContacts());
   }
 }, [dispatch, loading, contacts.length]);

  const handleSearchChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

const getFilteredContacts = () => {
  if (!Array.isArray(contacts)) {
    console.error("Contacts is not an array:", contacts);
    return [];
  }

  const normalizedFilter = filter.toLowerCase();
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};


  const filteredContacts = getFilteredContacts();

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox searchTerm={filter} onSearchChange={handleSearchChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;
