import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../FrontendScreen/Auth/Context/UserAuthContext";

const ProtectedRoute = () => {
  const { authentication } = useUserAuth();
  return authentication ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
