import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "/src/redux/auth/selectors";
import PropTypes from "prop-types";

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/contacts" /> : <Component {...rest} />;
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};


export default RestrictedRoute;
