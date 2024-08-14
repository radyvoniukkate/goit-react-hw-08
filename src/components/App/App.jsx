import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchContacts } from "/src/redux/contacts/operations";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "/src/redux/contacts/selectors";
import Layout from "../Layout/Layout";
import PrivateRoute from "../Routs/PrivateRoute";
import RestrictedRoute from "../Routs/RestrictedRoute";
import HomePage from "/src/pages/HomePage/HomePage";
import LoginPage from "/src/pages/LoginPage/LoginPage";
import RegistrationPage from "/src/pages/RegistrationPage/RegistrationPage";
import ContactsPage from "/src/pages/ContactsPage/ContactsPage";
import { selectIsRefreshing } from "/src/redux/auth/selectors";
import { refreshUser } from "/src/redux/auth/operations";
import { loadToken } from "/src/redux/tokenPersist";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isRefreshing = useSelector(selectIsRefreshing);

useEffect(() => {
  loadToken();
  console.log("Loaded token:", axios.defaults.headers.common.Authorization);
  dispatch(refreshUser());
}, [dispatch]);


  useEffect(() => {
    if (!loading && contacts.length === 0 && !isRefreshing) {
      dispatch(fetchContacts());
    }
  }, [dispatch, loading, contacts.length, isRefreshing]);

  if (isRefreshing) {
    return <p>Refreshing user...</p>;
  }

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute component={RegistrationPage} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={LoginPage} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute component={ContactsPage} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
