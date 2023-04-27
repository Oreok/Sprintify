import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
