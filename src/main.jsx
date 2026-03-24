import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ ADD THIS
import "./index.css";
import { router } from "./router/router";
import AuthProvider from "./contexts/AuthContexts/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

      {/* ✅ Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>,
);
