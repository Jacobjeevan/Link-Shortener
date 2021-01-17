import React from "react";
import Register from "../../components/auth/Register";
import { useAppContext } from "../../components/main/AppContext";
import RedirectToHome from "../../components/utils/redirect";

export default function register() {
  const { user } = useAppContext();
  RedirectToHome(user);
  if (!user) {
    return <Register />;
  }
  return null;
}
