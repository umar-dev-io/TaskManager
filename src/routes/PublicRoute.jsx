import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/tokenStorage";

const PublicRoute = () => {
  const token = getToken();
  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;