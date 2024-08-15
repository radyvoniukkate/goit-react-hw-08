import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom"; // Видалено BrowserRouter
import { fetchContacts } from "/src/redux/contacts/operations";
import Layout from "../Layout/Layout";
import PrivateRoute from "../Routs/PrivateRoute";
import RestrictedRoute from "../Routs/RestrictedRoute";
import HomePage from "/src/pages/HomePage/HomePage";
import LoginPage from "/src/pages/LoginPage/LoginPage";
import RegistrationPage from "/src/pages/RegistrationPage/RegistrationPage";
import ContactsPage from "/src/pages/ContactsPage/ContactsPage";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "/src/redux/auth/selectors";
import { refreshUser } from "/src/redux/auth/operations";
import { loadToken } from "/src/redux/tokenPersist";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Завантажуємо токен та оновлюємо користувача, якщо він є
  useEffect(() => {
    const tokenAction = loadToken();
    if (tokenAction) {
      dispatch(tokenAction);
      dispatch(refreshUser());
    }
  }, [dispatch]);

  // Завантажуємо контакти, якщо користувач увійшов в систему
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <p>Оновлення користувача...</p>;
  }

  return (
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
  );
};

export default App;
