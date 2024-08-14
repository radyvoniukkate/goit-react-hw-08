
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import {
  selectLoading,
  selectError,
  selectFilteredContacts, 
} from "/src/redux/contacts/selectors.js";

const ContactList = () => {

  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(contacts)) {
    console.error(
      "Unexpected data format: contacts is not an array.",
      contacts
    );
    return <p>Unexpected data format: contacts is not an array.</p>;
  }

  if (contacts.length === 0) {
    return <p>No contacts available.</p>;
  }

  return (
    <ul className="list">
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;