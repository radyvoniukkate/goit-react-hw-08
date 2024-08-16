import { useDispatch, useSelector } from "react-redux";
import { logout } from "/src/redux/auth/operations";
import { selectUser } from "/src/redux/auth/selectors";
import styles from "./UserMenu.module.css"

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Отримуємо об'єкт користувача
  const userName = user?.name || "User"; // Отримуємо ім'я користувача або значення за замовчуванням
  
  return (
    <div className={styles.controlRow}>
      <p className={styles.text}>Welcome {userName}</p> 
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default UserMenu;
