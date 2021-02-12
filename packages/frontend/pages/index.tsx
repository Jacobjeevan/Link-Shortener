import React from "react";
import Main from "../components/layout/Main";
import Dash from "../components/main/Dash";

export default function Home(): JSX.Element {
  return <Main Body={Dash} />;
}
