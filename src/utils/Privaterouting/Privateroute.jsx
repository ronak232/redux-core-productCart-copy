import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../../hooks/context/firebase";

function Privateroute({ children }) {
  const { user } = useFirebaseAuth();

  return user  ? children : <Navigate to="/dashboard" />;
}

export default Privateroute;
