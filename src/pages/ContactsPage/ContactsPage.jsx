import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "/src/components/ContactForm/ContactForm";
import ContactList from "/src/components/ContactList/ContactList";
import SearchBox from "/src/components/SearchBox/SearchBox";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "/src/redux/contacts/selectors";
import { selectNameFilter } from "/src/redux/filters/selectors";
import { changeFilter } from "/src/redux/filters/slice";
import { fetchContacts } from "/src/redux/contacts/operations";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

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


  return (
    <div className="contacts-page">
      <h1>Contacts</h1>
      <ContactForm />
      <SearchBox searchTerm={filter} onSearchChange={handleSearchChange} />
      {loading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <ContactList contacts={filteredContacts} />}
    </div>
  );
};

export default ContactsPage;
