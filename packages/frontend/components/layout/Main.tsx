import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { IMainProps } from "./layout";

export default function Main(props: IMainProps): JSX.Element {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Jeevan Link</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {<props.Body />}
      <Footer />
    </div>
  );
}
