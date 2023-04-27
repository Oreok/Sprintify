import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireOr({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  return (auth?.admin === true || auth?.productOwner === true) ? children : <Navigate to="/dashboard" replace state={{ path: location.pathname }} />;
}
