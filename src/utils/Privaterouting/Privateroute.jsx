import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../../hooks/context/firebase";

function Privateroute({ children }) {
  const { isUserLoggedIn } = useFirebaseAuth();

  return isUserLoggedIn ? children : <Navigate to="/login" /> ;
}

export default Privateroute;
