import * as React from "react";
import jwtDecode from "jwt-decode";
import { login } from "../actions/user";
import { useNavigate } from "react-router-dom";
import { useValue } from "../context/ContextProvider";

const authContext = React.createContext();

function useAuth() {
  const [auth, setAuth] = React.useState({
    authed: false,
    admin: false,
    productOwner: false,
  });

  const { dispatch } = useValue();

  const Navigate = useNavigate();

  if (auth.authed === false) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null) {
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.role === "Admin") {
        setAuth((testAuth) => ({
          ...testAuth,
          admin: true,
          productOwner: false,
        }));
      }
      if (decodedToken.role === "Product Owner") {
        setAuth((testAuth) => ({ ...testAuth, productOwner: true, admin: false }));
      }
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        setAuth((testAuth) => ({ ...testAuth, authed: true }));
      } else {
        localStorage.removeItem("currentUser");
        setAuth((testAuth) => ({ ...testAuth, authed: false, productOwner: false, admin: false }));
      }
    }
  }

  return {
    auth,
    loginCheck(user, dispatch) {
      return new Promise((res) => {
        const result = login(user, dispatch);
        result.then((result) => {
          try {
            if (result.token) {
              const decodedToken = jwtDecode(result.token);
              if (decodedToken.role === "Admin") {
                setAuth((testAuth) => ({
                  ...testAuth,
                  admin: true,
                  productOwner: false,
                }));
              }
              if (decodedToken.role === "Product Owner") {
                setAuth((testAuth) => ({ ...testAuth, productOwner: true, admin: false }));
              }
              setAuth((testAuth) => ({ ...testAuth, authed: true }));
              Navigate("/dashboard");
            } else {
              setAuth((testAuth) => ({
                ...testAuth,
                authed: false,
                productOwner: false,
                admin: false,
              }));
            }
          } catch (error) {
            setAuth((testAuth) => ({
              ...testAuth,
              authed: false,
              productOwner: false,
              admin: false,
            }));
          }
        });
        res();
      });
    },
    logoutCheck() {
      return new Promise((res) => {
        localStorage.removeItem("currentUser");
        setAuth((testAuth) => ({
          ...testAuth,
          authed: false,
          productOwner: false,
          admin: false,
        }));
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
