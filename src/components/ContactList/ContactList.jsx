import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Contact from "../Contact/Contact";
import { fetchContacts } from "/src/redux/contacts/operations";
import {
  selectLoading,
  selectError,
  selectContacts,
} from "/src/redux/contacts/selectors";
import { selectNameFilter } from "/src/redux/filters/selectors";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectNameFilter);

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts.length]);

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

  if (filteredContacts.length === 0) {
    return <p>No contacts available.</p>;
  }

  return (
    <ul className="list">
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
