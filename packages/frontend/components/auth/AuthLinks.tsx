import React from "react";
import Link from "next/link";

export default function AuthLinks(): JSX.Element {
  return (
    <div className="mx-6 flex md:flex-row sm:flex-col md:space-x-5 flex-wrap items-center">
      <Link href="/user/register">
        <a className="flex-auto inline-flex flex-wrap p-6 group hover:bg-green-200 shadow-md rounded-md">
          <div className="flex flex-col space-y-2 group-hover:text-gray-800">
            <h3 className="flex-1 text-3xl">Register</h3>
            <p className="flex-1">If you are a new user.</p>
          </div>
        </a>
      </Link>

      <Link href="/user/login">
        <a className="flex-auto inline-flex flex-wrap p-6 group hover:bg-green-200 shadow-md rounded-md">
          <div className="flex flex-col space-y-2 group-hover:text-gray-800">
            <h3 className="flex-1 text-3xl">Login</h3>
            <p className="flex-1">If you are an existing user.</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
