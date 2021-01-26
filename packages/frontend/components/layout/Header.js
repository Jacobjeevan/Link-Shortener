import React from "react";
import { logout } from "../auth/AuthApi";
import { useAppContext } from "../main/AppContext";

export default function Header() {
  const { user, setUser } = useAppContext();

  const LogoutUser = async () => {
    await logout();
    setUser(null);
  };
  return (
    <div className="flex px-8 py-3 items-stretch bg-black w-full shadow-md border-b-4 border-green-400">
      <h1 className="flex-1 ml-10 text-3xl text-white uppercase">
        Jeevan Link
      </h1>
      <div className="flex-1 mr-10 flex items-center">
        <p className="flex-1 text-sm text-right text-white">
          A Url Shortening Service
        </p>
        {user && (
          <button
            className="ml-5 shadow-md p-2 self-center bg-green-400 hover:bg-green-600 cursor-pointer"
            onClick={() => LogoutUser()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
