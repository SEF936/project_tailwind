import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../contexts/userContext";

function ProtectedLayout() {
  const { user } = useContext(userContext);

  if (user.role_id === 1) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}

export default ProtectedLayout;
