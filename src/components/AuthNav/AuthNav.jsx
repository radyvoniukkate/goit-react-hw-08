import { NavLink } from "react-router-dom";
import styles from "./Auth.module.css"

const AuthNav = () => (
  <nav className={styles.controlRow}>
    <NavLink
      to="/register"
      className={({ isActive }) => (isActive ? styles.active : styles.text)}
    >
      Register
    </NavLink>
    <NavLink
      to="/login"
      className={({ isActive }) => (isActive ? styles.active : styles.text)}
    >
      Login
    </NavLink>
  </nav>
);

export default AuthNav;
