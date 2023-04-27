import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "./context/ContextProvider";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ContextProvider>
);
