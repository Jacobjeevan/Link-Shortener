import React from "react";

export default function Header() {
  return (
    <div className="flex px-8 py-3 items-stretch bg-black w-full shadow-md border-b-4 border-green-400">
      <h1 className="flex-1 text-3xl text-white uppercase">Jeevan Link</h1>
      <div className="flex-1 flex items-center">
        {" "}
        <p className="flex-1 text-sm text-right text-white">
          A Url Shortening Service
        </p>
      </div>
    </div>
  );
}
