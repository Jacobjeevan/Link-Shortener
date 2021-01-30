import React, { Fragment } from "react";
import { StateWrapper } from "../components/main/AppContext";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/dist/next-server/lib/router/router";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <StateWrapper>
        <Component {...pageProps} />
      </StateWrapper>
    </Fragment>
  );
}
