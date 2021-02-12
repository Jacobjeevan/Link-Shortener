import React from "react";
import { useAppContext } from "./AppContext";
import DashLinks from "../links/DashLinks";
import AuthLinks from "../auth/AuthLinks";

export default function Dash(): JSX.Element {
  const { user } = useAppContext();

  return (
    <div className="container mx-auto pt-10">
      <main className="flex flex-col">{user ? <DashLinks /> : <AuthLinks />}</main>
    </div>
  );
}
