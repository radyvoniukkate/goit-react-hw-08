import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "/src/redux/auth/operations";
import styles from "./RegisterForm.module.css"

// Валідаційна схема для полів форми
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const RegistrationPage = () => {
  const dispatch = useDispatch();
const handleSubmit = async (values, { setSubmitting }) => {
  try {
    await dispatch(register(values)).unwrap();
  } catch (error) {
    console.error("Registration error:", error.message, error.response?.data);
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="registration-page">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.formContainer}>
            <div className={styles.div}>
              <label htmlFor="name" className={styles.label}>
                Name:
              </label>
              <Field type="text" name="name" className={styles.input} />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
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
            <button type="submit" disabled={isSubmitting} className={styles.button}> 
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationPage;
