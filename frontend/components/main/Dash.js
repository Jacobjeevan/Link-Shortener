import Head from "next/head";
import { useAppContext } from "./AppContext";
import DashLinks from "./DashLinks";
import AuthLinks from "../auth/AuthLinks";

export default function Dash() {
  const { user } = useAppContext();
  return (
    <div>
      <Head>
        <title>Jeevan Link</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex px-8 py-3 items-stretch bg-black w-full shadow-md border-b-4 border-green-400">
        <h1 className="flex-1 text-3xl text-white uppercase">Jeevan Link</h1>
        <div className="flex-1 flex items-center">
          {" "}
          <p className="flex-1 text-sm text-right text-white">
            A Url Shortening Service
          </p>
        </div>
      </div>

      <div className="container mx-auto pt-10">
        <main className="flex flex-col">
          {user ? <DashLinks /> : <AuthLinks />}
        </main>
      </div>
      <footer>
        <a
          href="http://Jacobjeevan.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jacob Jeevan
        </a>
      </footer>
    </div>
  );
}
