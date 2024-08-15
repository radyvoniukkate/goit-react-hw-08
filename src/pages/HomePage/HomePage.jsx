import styles from "./HomePage.module.css"
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.h1}>Welcome to Your App</h1>
      <p className={styles.text}>
        This is the homepage. Use the navigation to explore the app.
      </p>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/contacts" className={styles.link}>
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
