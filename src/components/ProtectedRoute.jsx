import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const savedProfile = localStorage.getItem("profile");

  // Allow access if profile exists OR just allow for now
  if (!savedProfile) {
    return children; // ✅ Allow access instead of redirect
  }

  return children;
}

export default ProtectedRoute;