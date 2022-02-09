import React from "react";
import Link from "next/link";

const cardContainerClass = "flex-auto inline-flex flex-wrap p-6 bg-gray-50 shadow group hover:shadow-md text-black";

const cardClass = "flex flex-col space-y-2 group-hover:text-gray-600";

export default function AuthLinks(): JSX.Element {
  return (
    <div className="mx-6 flex md:flex-row sm:flex-col md:space-x-5 flex-wrap items-center">
      <Link href="/user/register">
        <a className={cardContainerClass}>
          <div className={cardClass}>
            <h3 className="flex-1 text-3xl uppercase font-bold">Register</h3>
            <p className="flex-1">If you are a new user.</p>
          </div>
        </a>
      </Link>

      <Link href="/user/login">
        <a className={cardContainerClass}>
          <div className={cardClass}>
            <h3 className="flex-1 text-3xl uppercase font-bold">Login</h3>
            <p className="flex-1">If you are an existing user.</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
