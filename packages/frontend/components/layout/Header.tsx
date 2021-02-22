import React from "react";
import { logout } from "../auth/AuthApi";
import { useAppContext } from "../main/AppContext";

export default function Header(): JSX.Element {
  const { user, setUser } = useAppContext();

  const LogoutUser = async () => {
    await logout();
    setUser(null);
  };
  return (
    <div className="flex px-8 py-3 w-full space-x-5 text-black">
      <div className="flex-1 ml-10 text-right">
        <h1 className="text-3xl uppercase font-bold">Jeevan Link</h1>
      </div>
      <div className="flex-1 mr-10 flex items-center">
        <p className="flex-1 text-sm text-left">A Url Shortening Service</p>
        {user && (
          <button
            className="ml-5 shadow-md p-2 self-center bg-yellow-400 hover:bg-yellow-600 cursor-pointer"
            onClick={() => LogoutUser()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
