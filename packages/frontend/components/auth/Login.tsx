import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { useForm } from "react-hook-form";
import {
  errorClass,
  formClass,
  formHeaderClass,
  inputClass,
  linkToResetClass,
  loginResolver,
  submitBtnClass,
  submitForm,
} from "./AuthHelpers";
import { login } from "./AuthApi";
import { IAuth } from "./types/auth";
import Link from "next/link";

export default function Login(): JSX.Element {
  const { setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: loginResolver,
  });

  const onSubmit = async (data: IAuth) => {
    const user = await submitForm(login, data);
    if (user) {
      setUser(user);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
        <div className={formHeaderClass}>
          <h3 className="text-md">Login to shorten urls</h3>
        </div>
        <input {...register("email")} placeholder="Email/Username" className={inputClass} />
        <p className={errorClass}>{errors.email?.message}</p>

        <input {...register("password")} placeholder="Password" type="password" className={inputClass} />
        <p className={errorClass}>{errors.password?.message}</p>

        <p>
          Forgot your password? Click{" "}
          <Link href="/password/reset">
            <span className={linkToResetClass}>here</span>
          </Link>{" "}
          to request a reset.
        </p>

        <input type="submit" className={submitBtnClass} value="Login" />
      </form>
    </Fragment>
  );
}
