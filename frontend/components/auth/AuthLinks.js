import React from "react";
import Link from "next/link";

export default function AuthLinks() {
  return (
    <div className="container flex space-x-20">
      <div className="inline-flex p-8 group hover:bg-green-200 shadow-md rounded-md">
        <Link href="/user/register">
          <a className="flex flex-col space-y-2 group-hover:text-gray-800">
            <h3 className="flex-1 text-xl">Register</h3>
            <p className="flex-1">If you are a new user.</p>
          </a>
        </Link>
      </div>

      <div className="inline-flex p-8 group hover:bg-green-200 shadow-md rounded-md">
        <Link href="/user/login">
          <a className="flex flex-col space-y-2 group-hover:text-gray-800">
            <h3 className="flex-1 text-xl">Login</h3>
            <p className="flex-1">If you are an existing user.</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
