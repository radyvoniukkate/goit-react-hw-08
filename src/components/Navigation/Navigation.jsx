import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";


const Navigation = () => (
  <nav className={styles.headRow}>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? styles.active : styles.text)}
    >
      Home
    </NavLink>
    <NavLink
      to="/contacts"
      className={({ isActive }) => (isActive ? styles.active : styles.text)}
    >
      Contacts
    </NavLink>
  </nav>
);

export default Navigation;
