import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "/src/redux/auth/operations";
import styles from "./LoginForm.module.css"

// Валідаційна схема для полів форми
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values));
    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.formContainer}>
            <div className={styles.div}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <Field type="email" name="email" className={styles.input} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className={styles.div}>
              <label htmlFor="password" className={styles.label}>
                Password:
              </label>
              <Field type="password" name="password" className={styles.input} />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.button}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
