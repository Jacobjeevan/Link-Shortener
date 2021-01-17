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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="email" ref={register} placeholder="Email/Username" />
        <p>{errors.email?.message}</p>

        <input
          name="password"
          ref={register}
          placeholder="Password"
          type="password"
        />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </Fragment>
  );
}
