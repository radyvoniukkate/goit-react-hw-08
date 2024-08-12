import PropTypes from "prop-types";
import {  useDispatch } from "react-redux";
import { deleteContact } from "/src/redux/contactsOps.js";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li className="contact-item">
      <div className="contact-info">
        <div className="item">
          <span role="img" aria-label="user">
            👤
          </span>
          <p>{contact.name}</p>
        </div>
        <div className="item">
          <span role="img" aria-label="phone">
            📞
          </span>
          <p>{contact.number}</p>
        </div>
      </div>
      <button
        className="delete-button"
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
