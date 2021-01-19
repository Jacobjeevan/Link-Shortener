import React, { useEffect } from "react";
import Login from "../../components/auth/Login";
import { useAppContext } from "../../components/main/AppContext";
import Router from "next/router";
import Main from "../../components/layout/Main";

export default function login() {
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);

  return <Main Body={Login} />;
}
