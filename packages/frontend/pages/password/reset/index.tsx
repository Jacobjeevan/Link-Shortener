import React from "react";
import RequestPasswordReset from "../../../components/auth/RequestPasswordReset";
import Main from "../../../components/layout/Main";

export default function index(): JSX.Element {
  return <Main Body={RequestPasswordReset} />;
}
