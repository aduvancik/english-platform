import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const authToken = localStorage.getItem("authToken");

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
}
