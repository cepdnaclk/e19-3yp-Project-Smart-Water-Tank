import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot_password/forgotpassword";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import UserHome from "./pages/user_dash/user_main_dash";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";
import Monitoring from "./pages/user_dash/monitoring";
import ControlPanel from "./pages/user_dash/control_panel";
import UserProfile from "./pages/user_dash/user_profile";
import Notification from "./pages/notification/notification";
import AllUser from "./pages/admin_pages/all_user";
import AdminProfile from "./pages/admin_pages/admin_profile";
import AllAdmins from "./pages/admin_pages/all_admins";
import AdminMainDash from "./pages/admin_pages/admin_main_dash";


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="text-center">
            <div class="spinner-border" role="status"></div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute>
              <Monitoring />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userHome"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminHome"
          element={
            <ProtectedRoute>
              <AdminMainDash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/controlPanel"
          element={
            <ProtectedRoute>
              <ControlPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/adminProfile"
          element={
            <ProtectedRoute>
              <AdminProfile/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/allUser"
          element={
            <ProtectedRoute>
              <AllUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/alladmins"
          element={
            <ProtectedRoute>
              <AllAdmins />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
