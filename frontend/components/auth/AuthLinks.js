import React from "react";
import Link from "next/link";

export default function AuthLinks() {
  return (
    <div className="container space-x-20 space-y-20">
      <Link href="/user/register">
        <a className="inline-block">
          <h3>Register</h3>
          <p>If you are a new user.</p>
        </a>
      </Link>

      <Link href="/user/login">
        <a className="inline-block">
          <h3>Login</h3>
          <p>If you are an existing user.</p>
        </a>
      </Link>
    </div>
  );
}
