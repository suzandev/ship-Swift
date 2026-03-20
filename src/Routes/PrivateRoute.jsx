import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import loadingGif from "../assets/running.gif";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show custom loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Show protected content
  return children;
};

export default PrivateRoute;
