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

        <input
          name="passwordConfirm"
          ref={register}
          placeholder="Confirm Password"
          type="password"
        />
        <p>{errors.passwordConfirm?.message}</p>

        <input type="submit" />
      </form>
    </Fragment>
  );
}
