import React from "react";
import Login from "../../components/auth/Login";
import { useAppContext } from "../../components/main/AppContext";
import RedirectToHome from "../../components/utils/redirect";

export default function login() {
  const { user } = useAppContext();
  RedirectToHome(user);
  if (!user) {
    return <Login />;
  }
  return null;
}
