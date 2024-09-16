import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if(loading) {
    return <div>Loading ...</div>
  }

  if(!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />
  }

  if(!user) {
    <Navigate to="/login" />
  }

  return children
};

export default RoleBasedRoute;
