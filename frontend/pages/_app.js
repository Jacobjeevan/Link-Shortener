import React from "react";
import { StateWrapper } from "../components/main/AppContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateWrapper>
      <Component {...pageProps} />
    </StateWrapper>
  );
}
