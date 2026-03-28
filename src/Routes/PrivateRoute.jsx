import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import loadingGif from "../assets/running.gif";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // ✅ NEW

  // Show custom loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
      </div>
    );
  }

  // Redirect if not logged in (WITH LOCATION STATE)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show protected content
  return children;
};

export default PrivateRoute;
