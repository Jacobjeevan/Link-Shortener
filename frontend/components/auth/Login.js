import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { useForm } from "react-hook-form";
import { loginResolver, submitForm } from "./AuthHelpers";
import { login } from "./AuthApi";

export default function Login() {
  const { setUser } = useAppContext();
  const { register, handleSubmit, errors } = useForm({
    resolver: loginResolver,
  });

  const onSubmit = async (data) => {
    const user = await submitForm(login, data);
    if (user) {
      setUser(user);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 items-center"
      >
        <div className="p-3 mb-3 rounded-sm shadow-md">
          <h3 className="text-md">Login to shorten urls</h3>
        </div>
        <input
          name="email"
          ref={register}
          placeholder="Email/Username"
          className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="p-2 text-sm text-gray-400">{errors.email?.message}</p>

        <input
          name="password"
          ref={register}
          placeholder="Password"
          type="password"
          className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="p-2 text-sm text-gray-400">{errors.password?.message}</p>

        <input
          type="submit"
          className="shadow-md p-2 self-center bg-green-400 hover:bg-green-600 cursor-pointer"
          value="Login"
        />
      </form>
    </Fragment>
  );
}
