import React, { useEffect } from "react";
import Register from "../../components/auth/Register";
import { useAppContext } from "../../components/main/AppContext";
import Router from "next/router";
import Main from "../../components/layout/Main";

export default function register() {
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);

  return <Main Body={Register} />;
}
