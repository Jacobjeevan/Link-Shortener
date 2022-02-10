import React, { Fragment } from "react";
import { useAppContext } from "../main/AppContext";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  errorClass,
  formClass,
  formHeaderClass,
  inputClass,
  linkToResetClass,
  loginResolver,
  submitBtnClass,
} from "./AuthHelpers";
import { login } from "./AuthApi";
import { IAuth } from "./types/auth";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Login(): JSX.Element {
  const { setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: loginResolver,
  });

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    login(data)
      .then((user) => setUser(user))
      .catch((error) => toast.error(error));
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
