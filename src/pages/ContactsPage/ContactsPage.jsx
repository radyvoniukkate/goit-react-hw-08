import ContactForm from "/src/components/ContactForm/ContactForm";
import ContactList from "/src/components/ContactList/ContactList";
import SearchBox from "/src/components/SearchBox/SearchBox";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  return (
    <div className={styles.contacts}>
      <h1 className={styles.text}>Contacts</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
