import React from "react";

// Auth Imports
import SignIn from "views/auth/SignIn";
import ForgotPassword from "views/auth/ForgotPassword";
import ResetPassword from "views/auth/ResetPassword";
import Register from "views/auth/register"; // Ensure the correct import path
import Rep from "views/user/contact/rep"; 

const authRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    component: <ForgotPassword />,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset-password/:token",
    component: <ResetPassword />,
  },
  {
    name: "Register",
    layout: "/auth",
    path: "register/:token",
    component: <Register />,
  },
  {
      name: "rep",
      layout: "/user",
      path: "contact/rep/:id",
      component: <Rep/>,
    },
];

export default authRoutes;
