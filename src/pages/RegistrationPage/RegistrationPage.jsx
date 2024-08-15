import RegistrationForm from "/src/components/RegisterForm/RegisterForm";
import styles from "./RegistrationPage.module.css"

const RegistrationPage = () => {
  return (
    <div className={styles.registration}>
      <h2>Register</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
