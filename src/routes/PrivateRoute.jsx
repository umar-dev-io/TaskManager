import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/tokenStorage";

const PrivateRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;