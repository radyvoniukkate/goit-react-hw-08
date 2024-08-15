import LoginForm from "/src/components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css"

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
