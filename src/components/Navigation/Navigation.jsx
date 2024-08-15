import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Navigation.module.css";
import { selectIsLoggedIn } from "/src/redux/auth/selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.headRow}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : styles.text)}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? styles.active : styles.text)}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
