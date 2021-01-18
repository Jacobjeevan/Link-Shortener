import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { useForm } from "react-hook-form";
import { registerResolver, submitForm } from "./AuthHelpers";
import { register as registerUser } from "./AuthApi";

export default function Register() {
  const { setUser } = useAppContext();
  const { register, handleSubmit, errors } = useForm({
    resolver: registerResolver,
  });

  const onSubmit = async (data) => {
    const user = await submitForm(registerUser, data);
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
          <h3 className="text-md">Register to shorten urls</h3>
        </div>
        <input
          name="email"
          ref={register}
          placeholder="Email/Username"
          className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="text-sm text-gray-400">{errors.email?.message}</p>

        <input
          name="password"
          ref={register}
          placeholder="Password"
          type="password"
          className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="text-sm text-gray-400">{errors.password?.message}</p>

        <input
          name="passwordConfirm"
          ref={register}
          placeholder="Confirm Password"
          type="password"
          className="shadow-md p-2 rounded-sm focus:ring-2 focus:ring-green-400"
        />
        <p className="text-sm text-gray-400">
          {errors.passwordConfirm?.message}
        </p>

        <input
          type="submit"
          className="shadow-md p-2 self-center bg-green-400 hover:bg-green-600 cursor-pointer"
          value="Register"
        />
      </form>
    </Fragment>
  );
}
