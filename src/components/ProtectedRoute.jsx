import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const savedProfile = localStorage.getItem("profile");


  if (!savedProfile) {
    return children; 
  }

  return children;
}

export default ProtectedRoute;