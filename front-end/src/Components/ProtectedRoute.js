import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import GlobalContext from "../Hooks/GlobalContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loggedIn } = useContext(GlobalContext);
  const location = useLocation();

  return loggedIn ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default ProtectedRoute;
